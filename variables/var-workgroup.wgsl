// Create zero-initialized workgroup shared data
const workgroup_len : u32 = 8;
var<workgroup> workgroup_data: array<u32, workgroup_len>;

@group(0) @binding(0) var<storage, read> input_data: array<u32>;
@group(0) @binding(1) var<storage, read_write> output_data: u32;

// Our workgroup will execute workgroup_len invocations of the shader
@compute @workgroup_size(workgroup_len, 1, 1)
fn computeMain(@builtin(local_invocation_id) local_id: vec3<u32>) {
  // Each invocation will populate the shared workgroup data from the input data
  workgroup_data[local_id.x] = input_data[local_id.x];

  // Wait for each invocation to populate their region of local data
  workgroupBarrier();

  // Get the sum of the elements in the array
  // Input Data:    [0,  1,  2,  3,   4,  5,  6,  7]
  // Loop Pass 1:   [1,  5,  9,  13,  4,  5,  6,  7]
  // Loop Pass 2:   [6,  22, 9,  13,  4,  5,  6,  7]
  for (var current_size = workgroup_len / 2; current_size >= 1; current_size /= 2) {
    var sum: u32 = 0;
    if (local_id.x < current_size) {
      // Read current values from workgroup_data
      sum = workgroup_data[local_id.x * 2] + workgroup_data[local_id.x * 2 + 1];
   	}
    // Wait until all invocations have finished reading from workgroup_data, and have calculated their respective sums
    workgroupBarrier();
    if (local_id.x < current_size) {
      workgroup_data[local_id.x] = sum;
    }
    // Wait for each invocation to finish one iteration of the loop, and to have finished writing to workgroup_data
    workgroupBarrier();
  }

  // Write the sum to the output
  if (local_id.x == 0) {
    output_data = workgroup_data[0];
  }
}

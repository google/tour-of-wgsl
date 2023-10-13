//Create zero-initialized workgroup shared data
var<workgroup> workgroup_data: array<u32, 8>;

@group(0) @binding(0) var<storage, read> input_data: array<u32>;
@group(0) @binding(1) var<storage, read_write> output_data: array<u32, 1>;

//Our workgroup will execute 64 invocations of the shader, one
@compute @workgroup_size(8, 1, 1)
fn computeMain(
  @builtin(global_invocation_id) global_id: vec3<u32>,
  @builtin(local_invocation_id) local_id: vec3<u32>,
) {
  //Each invocation will populate the shared workgroup data from the input data
  wokgroup_data[local_id.x] = input_data[local_id.x];
  workgroup_data[local_id.x] = input_data[local_id.x];
  
  //Wait for each invocation to finish their data population
  workgroupBarrier();

  //Get the sum of the elements in the array
  //  Input Data:  [0, 1, 2, 3, 4, 5, 6, 7]
  // Loop Pass 1:   [1, 5, 9, 13, 4, 5, 6, 7]
  // Loop Pass 2:   [6, 22, 9, 13, 4, 5, 6, 7]
  for (var currentSize = 4u; currentSize >= 1u; currentSize = currentSize / 2u) {
    if (local_id.x < currentSize) {
      workgroup_data[local_id.x] = workgroup_data[local_id.x * 2] + workgroup_data[local_id.x * 2 + 1]
    }
    //Wait for each invocation to attempt one iteration of the loop
    workgroupBarrier();
  }

  //Write the sum to the output
  if (local_id.x == 0) {
    output_data[0] = workgroup_data[0];
  }

}
// The whole storage buffer is a runtime-sized array.
@group(0) @binding(0) var<storage> weights: array<f32>;

// The runtime-sized array is the last member of
// a struct describing the whole storage buffer.
struct PointLight { position: vec3f, color: vec3f, }
struct LightData {
  meanIntensity: f32,
  point: array<PointLight>,
}
@group(0) @binding(1) var<storage> lights: LightData;

fn number_of_lights() -> u32 {
  return arrayLength(&lights.point);
}

fn get_ith_point_light(i: i32) -> PointLight {
  return lights.point[i];
}

fn cannot_copy_whole_array() {
  // var all_point_lights = lights.point; // Error
}

struct Particle {
   momentum: vec3f,
   pos: vec3f,
   velocity: vec3f,
}
@group(0) @binding(0)
var<storage,read_write> particles: array<Particle>;

fn sequentially_update_momenta() {
  let particles_ptr = &particles;  // Here is a pointer
  for (var i: u32; i < arrayLength(particles_ptr); i++) {
    // Use & to get a pointer as a short name for something inside a big variable.
    let a_particle = &particles[i];

    // We could have spelled out the pointer type in full.
    // let a_particle: ptr<storage,Particle,read_write> = &particles[i];

    // Now use 'a_particle' as a short name.
    let its_pos = (*a_particle).pos;  // Parentheses are required.
    let its_velocity = (*a_particle).velocity;
    (*a_particle).momentum = its_pos * its_velocity;
  }
}

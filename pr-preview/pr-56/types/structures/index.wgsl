struct Vehicle {
  num_wheels: u32,
  mass_kg: f32, // The last comma is optional
}  // Semicolon is optional

// Constructing a structure value by providing values for all members.
const a_bicycle = Vehicle(2, 10.5);
//const bad_vehicle = Vehicle(1.5, 20); // Error: num_wheels must be u32

// Get a member from a structure with '.' and then the member name.
const bike_num_wheels = a_bicycle.num_wheels;

fn add_cargo(v: Vehicle, cargo_mass: f32) -> Vehicle {
  var result = v;
  // Use dot-member notation to update a single member.
  // The other members are unchanged.
  result.mass_kg += cargo_mass;
  return result;
}

const all_zeros_vehicle = Vehicle();

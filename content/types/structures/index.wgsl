struct Person {
  age_years: u32,
  height_m: f32,
  mass_kg: f32, // The last comma is optional
}

// Constructing a structure value by providing values for all members.
const an_average_infant = Person(0, .5, 3.5);
const toddler = 1.5;
//const a_toddler = Person(toddler, .5, 3.5); // Error: age must be u32

// Get a member from a structure with '.' and then the member name.
const average_infant_height = an_average_infant.height_m;

fn happy_birthday(p: Person) -> Person {
  var result = p;
  // Use dot-member notation to update a single member.
  // The other members are unchanged.
  result.age_years += 1;
  return result;
}

const all_zeros_person = Person();

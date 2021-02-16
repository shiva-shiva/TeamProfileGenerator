const Intern = require("../lib/Intern");

test("should set school", () => {
  const Value = "ALA";
  const e = new Intern("shiva", 22, "test@test.com", Value);
  expect(e.school).toBe(Value);
});

test("getRole() should return Intern", () => {
  const Value = "Intern";
  const e = new Intern("shiva", 22, "test@test.com", "ALA");
  expect(e.getRole()).toBe(Value);
});

test("getSchool() should return school", () => {
  const Value = "ALA";
  const e = new Intern("shiva", 22, "test@test.com", Value);
  expect(e.getSchool()).toBe(Value);
});

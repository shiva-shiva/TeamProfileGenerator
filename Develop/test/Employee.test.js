const Employee = require("../lib/Employee");

test("should instantiate Employee instance", () => {
  const e = new Employee();
  expect(typeof(e)).toBe("object");
});

test("Can set name via constructor arguments", () => {
  const name = "shiva";
  const e = new Employee(name);
  expect(e.name).toBe(name);
});

test("Can set id via constructor argument", () => {
  const testValue = 100;
  const e = new Employee("shiva", testValue);
  expect(e.id).toBe(testValue);
});

test("Can set email via constructor argument", () => {
  const Value = "test@test.com";
  const e = new Employee("shiva", 22, Value);
  expect(e.email).toBe(Value);
});

test("Can get name via getName()", () => {
  const Value = "shiva";
  const e = new Employee(Value);
  expect(e.getName()).toBe(Value);
});

test("Can get id via getId()", () => {
  const Value = 10;
  const e = new Employee("shiva", Value);
  expect(e.getId()).toBe(Value);
});

test("Can get email via getEmail()", () => {
  const Value = "test@test.com";
  const e = new Employee("shiva", 22, Value);
  expect(e.getEmail()).toBe(Value);
});

test("getRole() should return \"Employee\"", () => {
  const Value = "Employee";
  const e = new Employee("shiva", 22, "test@test.com");
  expect(e.getRole()).toBe(Value);
});

const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");

test("should set office number", () => {
  const Value = 10;
  const e = new Manager("shiva", 22, "test@test.com", Value);
  expect(e.officeNumber).toBe(Value);
});

test('getRole() should return "Manager"', () => {
  const Value = "Manager";
  const e = new Manager("shiva", 22, "test@test.com", 100);
  expect(e.getRole()).toBe(Value);
});

test("getOffice() should return office number", () => {
  const Value = 10;
  const e = new Manager("shiva", 22, "test@test.com", Value);
  expect(e.getOfficeNumber()).toBe(Value);
});

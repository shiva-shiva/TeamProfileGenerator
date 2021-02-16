const Engineer = require("../lib/Engineer");

test("Can set GitHUb account via constructor", () => {
  const testValue = "GitHubUser";
  const e = new Engineer("Foo", 1, "test@test.com", testValue);
  expect(e.github).toBe(testValue);
});

test("getRole() should return \"Engineer\"", () => {
  const Value = "Engineer";
  const e = new Engineer("shiva", 22, "test@test.com", "GitHubUser");
  expect(e.getRole()).toBe(Value);
});

test("Can get GitHub username via getGithub()", () => {
  const Value = "GitHubUser";
  const e = new Engineer("shiva", 22, "test@test.com", Value);
  expect(e.getGithub()).toBe(Value);
});

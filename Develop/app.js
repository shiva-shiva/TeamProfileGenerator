const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = {
    type: ()=>{ 
      return {
      message: "Which type of team member would you like to add?",
      type: "list",
      name: "member",
      choices: ["Engineer", "Intern", "I don't want to add anymore team members"]
  }},
    item:(member, variable, item = variable, validate)=> {
      return {
          message: `What is your ${member.toLowerCase()}'s ${item}?`,
          type: "input",
          name: variable,
          validate: validate
      }
  }

};
let employees = [];

async function addRole(member){
  let { name } = await inquirer.prompt(questions.item(member, "name", "full name", validate.name));
  let {id} = await inquirer.prompt(questions.item(member, "id", "IDnumber" , validate.id ));
  let { email } = await inquirer.prompt(questions.item(member, "email", "email address", validate.email));
  switch(member){
   case 'Manager':
     await inquirer.prompt(questions.item(member, "officeNumber", "office phone number", validate.required));
     employees.push(new Manager(new Manager(name, id, email, officeNumber)));
     break;

    case 'Engineer':
      await inquirer.prompt(questions.item(member,"Github","Github username", validate.required));
      employees.push(new Engineer(name, id , email, Github));
      break;

    case 'Intern':
      await inquirer.prompt(questions.item(member,"school","school", validate.required));
      employees.push(new Engineer(name, id , email, school));
      break;
  }

}

















// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

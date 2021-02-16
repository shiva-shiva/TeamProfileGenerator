
  
// Node modules
const inquirer = require("inquirer");
const fs = require("fs");
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Lib modules
const timestamp = require("./lib/timestamp");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const validate = {
    required: input => input !== '' ? true : "This field is required.",
    name: input => input !== '' ? true : "Please enter a name.",
    id: input => Number.isInteger(Number(input)) && Number(input) > 0 ? true : "Please enter a positive whole number.",
    email: input => input.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+\@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi) ? true : "Please enter a valid email address."
}

const questions = {
    type: function() {
        return {
            message: "Which type of team member would you like to add?",
            type: "list",
            name: "member",
            choices: ["Engineer", "Intern", "I don't want to add anymore team members"]
        }
    },
    item: function(member, variable, item = variable, validate) {
        return {
            message: `What is your ${member.toLowerCase()}'s ${item}?`,
            type: "input",
            name: variable,
            validate: validate
        }
    }
};

let employees = [];

async function addRole(member) {
    let { name } = await inquirer.prompt(questions.item(member, "name", "full name", validate.name));
    let { id } = await inquirer.prompt(questions.item(member, "id", "ID number", validate.id));
    let { email } = await inquirer.prompt(questions.item(member, "email", "email address", validate.email));
    switch (member) {
        case "Manager":
            let { officeNumber } = await inquirer.prompt(questions.item(member, "officeNumber", "office phone number", validate.required));
            employees.push(new Manager(name, id, email, officeNumber));
            break;
        case "Engineer":
            let { github } = await inquirer.prompt(questions.item(member, "github", "GitHub username", validate.required));
            employees.push(new Engineer(name, id, email, github));
            break;
        case "Intern":
            let { school } = await inquirer.prompt(questions.item(member, "school", "school", validate.required));
            employees.push(new Intern(name, id, email, school));
            break;
    }
}

function getHTMLModule(file) {
    return readFile(file, "utf8");
}

async function generateHTML() {
    let Template = {
        Main: await getHTMLModule("./templates/main.html"),
        Manager: await getHTMLModule("./templates/manager.html"),
        Engineer: await getHTMLModule("./templates/engineer.html"),
        Intern: await getHTMLModule("./templates/intern.html")
    }

    let employeesHTML = "";

    for (let employee of employees) {
         let html = Template[employee.constructor.name]
        .replace(/{{ role }}/gi, employee.getRole())
        .replace(/{{ name }}/gi, employee.name)
        .replace(/{{ id }}/gi, employee.id)
        .replace(/{{ email }}/gi, employee.email);
        switch (employee.constructor.name) {
            case "Manager":
                html = html.replace(/{{ officeNumber }}/gi, employee.officeNumber);
                break;
            case "Engineer":
                html = html.replace(/{{ github }}/gi, employee.github);
                break;
            case "Intern":
                html = html.replace(/ {{ school }}/gi, employee.school);
                break;
        }
        employeesHTML += html;
    }
    let completeHTML = Template["Main"].replace(/{{ team }}/gi, employeesHTML);

    createHTML(completeHTML);
}

async function createHTML(html) {
    console.log("Creating HTML...");
    let file = `team.html`;
    let dir = "./output";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    await writeFile(`${dir}/${file}`, html);
    console.log(`HTML has been created to "${dir}/${file}".`);
    return;
}

async function init() {
    console.log("Please build your team");
    await addRole("Manager");
    let member = "";
    let exit = "I don't want to add anymore team members";
    while (member != exit) {
        let { member } = await inquirer.prompt(questions.type());
        if (member === exit) {
            return generateHTML();
        }
        await addRole(member);
    }
}

init();
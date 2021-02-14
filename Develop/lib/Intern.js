// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
let Employee = require('./Employee');

module.export = class Intern extends Employee{
    counstrauctor(school, name , id, email){
        this.school =school;
        super(name , id, email);
    }
    getSchool(){
        return this.school
    }
    setRole() {
        return this.getRole()='Intern' ;
    }
}
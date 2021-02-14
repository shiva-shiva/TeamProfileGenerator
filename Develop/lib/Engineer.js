// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
let Employee = require('./Employee');

module.export = class Engineer extends Employee{
    counstrauctor(GitHub, name , id, email){
        this.GitHub =GitHub;
        super(name , id, email);
    }
    getGithub(){
        return this.GitHub
    }
    setRole() {
        return this.getRole()='Engineer' ;
    }
}
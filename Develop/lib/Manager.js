// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
let Employee = require('./Employee.js');

module.export = class Manager extends Employee{

 constructor(officeNumber, name , id, email){
   this.officeNumber = officeNumber;
   super(name , id, email);
 }

 setRole() {
    return this.getRole()='Manager' ;
}
}
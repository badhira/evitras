// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';


// import { EmployeeService } from '../shared/employee.service';
// import {Employee} from '../shared/employee.model'

// declare var M:any;

// @Component({
//   selector: 'app-employee',
//   templateUrl: './employee.component.html',
//   styleUrls: ['./employee.component.css'],
//   providers:[EmployeeService]
// })
// export class EmployeeComponent implements OnInit {

//   constructor(public employeeService:EmployeeService) { }
// data={
//   name:'',
// role:'',
// place:'',
// age:''

// }

//   ngOnInit(): void {
//     this.resetForm();
//     this.refreshEmployeeList();
//   }
//   refreshEmployeeList() {
//     throw new Error('Method not implemented.');
//   }
//   resetForm(form?: NgForm) {
//     if (form)
//       form.reset();
//     this.employeeService.selectedEmployee = {
//       _id: "",
//       name: "",
//       role: "",
//       place: "",
//       age: 0
//     }
//   }
// onSubmit(form:NgForm){
//   if(form.value._id==""){
//     this.employeeService.postEmployee(form.value).subscribe((res)=>{
//     this.resetForm(form);
//     M.toast({html:'Saved successfully',classes:'rounded'})
//     });
// }
// else{
//     this.employeeService.putEmployee(form.value).subscribe((res)=>{
//     this.resetForm(form);
//     M.toast({html:'Updated  successfully',classes:'rounded'})
//     });
// }
// }
//   refreshEmployeeList(){
//   employeeService.getEmployeeList().subscribe((res=>{
//   employeeService.employees=res as Employee[];
//   }))
// }
// onEdit(emp:Employee){
//   this.employeeService.selectedEmployee=emp;
// }
// }



import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      role: "",
      place: "",
      age: 0
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentsService } from '../../Services/students.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-student-component',
  templateUrl: './add-student-component.component.html',
  styleUrls: ['./add-student-component.component.css']
})
export class AddStudentComponentComponent  {
  registrationForm: FormGroup;
  msg=''
  constructor(private fb: FormBuilder,
    private studentService:StudentsService,
    public activeModal: NgbActiveModal) {
    this.registrationForm = this.fb.group({
      Fname: ['', Validators.required],
      Lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      country: [,Validators.required],
      dateOfBirth: ['',Validators.required],
    });
  }
  countries = [
    "United States",
    "Canada",
    "Germany",
    "France",
    "United Kingdom",
    "Japan",
    "Australia",
    "Brazil",
    "Italy",
    "Spain",
    "India",
    "China",
    "Mexico",
    "Russia",
    "South Korea"
  ];
  onSubmit(): void {
    if (this.registrationForm.valid) {
if(this.registrationForm.value){
  const jsDate = new Date(this.registrationForm.get('dateOfBirth')?.value.year, this.registrationForm.get('dateOfBirth')?.value.month - 1, this.registrationForm.get('dateOfBirth')?.value.day);
      const Fname=this.registrationForm.get('Fname')?.value
      const Lname=this.registrationForm.get('Lname')?.value
      const email=this.registrationForm.get('email')?.value
      const gender=this.registrationForm.get('gender')?.value
      const dateOfBirth=jsDate.toISOString()
      const country=this.registrationForm.get('country')?.value
      const newStudent={Fname,Lname,email,gender,dateOfBirth,country}
      this.studentService.AddNewStudent(newStudent).subscribe(
        (data)=>{
          console.log(data);
          this.activeModal.close();
        },
        (err)=>{
           console.log(err);
           if(err.error.message.includes('dateOfBirth')){
            this.msg="students age must be >= 5 years old"
           }else{
           this.msg=err.error.message}

        }
      )
}
    }}


}

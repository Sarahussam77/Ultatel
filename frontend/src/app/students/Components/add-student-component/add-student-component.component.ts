import { Component, } from '@angular/core';
import { FormGroup,  Validators, FormControl } from '@angular/forms';
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
  constructor(
    private studentService:StudentsService,
    public activeModal: NgbActiveModal) {
    this.registrationForm = new FormGroup({
      Fname: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      Lname: new FormControl ('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      email: new FormControl ('', [Validators.required, Validators.email,Validators.pattern(/^[\w\.-]+@\w+\.\w+(\.\w+)?$/i)]),
      gender: new FormControl ('', Validators.required),
      country: new FormControl ( null,Validators.required),
      dateOfBirth: new FormControl (null,Validators.required),
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
    closeModel(){
      this.activeModal.close();
    }

}

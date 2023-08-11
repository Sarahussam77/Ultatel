import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from '../../Services/students.service';

@Component({
  selector: 'app-edit-student-component',
  templateUrl: './edit-student-component.component.html',
  styleUrls: ['./edit-student-component.component.css']
})
export class EditStudentComponentComponent {
  @Input() id: string='';
  Student:any
  registrationForm: FormGroup;
   selectedFile:any

  constructor(
    private studentService:StudentsService,
    public activeModal: NgbActiveModal) {
      this.registrationForm = new FormGroup({
        Fname:new FormControl (),
        Lname: new FormControl (),
        country: new FormControl (),

      });
  }
  ngOnInit(): void {

    this.studentService.GetStudentByID(this.id).subscribe(
      {
        next:(data:any)=>{
          this.Student = data;
          this.registrationForm.patchValue({
            Fname: this.Student.Fname,
            Lname: this.Student.Lname,
            country: this.Student.country,

          });

        },
        error:(err)=>{console.log(err)}
      }
    )
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
      const formData = new FormData();
if(this.registrationForm.value){
  const Fname=this.registrationForm.get('Fname')?.value
  const Lname=this.registrationForm.get('Lname')?.value
  const country=this.registrationForm.get('country')?.value

  const updatedStudent={Fname,Lname,country}
      this.studentService.UpdateStudent(this.id,updatedStudent).subscribe(
        (data)=>{
          console.log(data);
          this.activeModal.close();
        },
        (err)=>{
           console.log(err);

        }
      )
}
    }}



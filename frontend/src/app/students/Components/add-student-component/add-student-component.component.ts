import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentsService } from '../../Services/students.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-student-component',
  templateUrl: './add-student-component.component.html',
  styleUrls: ['./add-student-component.component.css']
})
export class AddStudentComponentComponent {
  registrationForm: FormGroup; // Declare the form group
   selectedFile:any

  constructor(private fb: FormBuilder,
    private studentService:StudentsService,
    public activeModal: NgbActiveModal) {
    this.registrationForm = this.fb.group({
      Fname: ['', Validators.required],
      Lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      country: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      image:['', Validators.required]
    });
  }
  options = [
     'option1'  ,
     'option2' ,
     'option3',
      'option2' ,
      'option3',
      'option1',
      'option2' ,
      'option3',
  ];
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  selectFile() {
    this.fileInput.nativeElement.click();
  }

  handleFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
       this.selectedFile = inputElement.files[0];

    }

  }
  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = new FormData();
if(this.registrationForm.value){
  const jsDate = new Date(this.registrationForm.get('dateOfBirth')?.value.year, this.registrationForm.get('dateOfBirth')?.value.month - 1, this.registrationForm.get('dateOfBirth')?.value.day);
      formData.append('Fname', this.registrationForm.get('Fname')?.value);
      formData.append('Lname', this.registrationForm.get('Lname')?.value);
      formData.append('email', this.registrationForm.get('email')?.value);
      formData.append('image',this.selectedFile);
      formData.append('gender', this.registrationForm.get('gender')?.value);
      formData.append('dateOfBirth', jsDate.toISOString());
      formData.append('country', this.registrationForm.get('country')?.value);
      this.studentService.AddNewStudent(formData).subscribe(
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

}

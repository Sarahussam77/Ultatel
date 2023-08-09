import { Component, Input } from '@angular/core';
import { StudentsService } from '../Services/students.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-student-component',
  templateUrl: './delete-student-component.component.html',
  styleUrls: ['./delete-student-component.component.css']
})
export class DeleteStudentComponentComponent {
  @Input() id:string=''
constructor(private studentService:StudentsService
  ,
  public activeModal: NgbActiveModal){}
deleteStudent() {
    this.studentService.deleteStudent(this.id).subscribe(
      () =>  this.activeModal.close('confirmed')
      ,
      (err) => console.log(err)
    );
    this.activeModal.close('confirmed');
}
closeModel(){
  this.activeModal.close();
}
}

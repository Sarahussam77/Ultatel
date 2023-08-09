import { Component, OnInit } from '@angular/core';
import { AddStudentComponentComponent } from '../add-student-component/add-student-component.component';
import { EditStudentComponentComponent } from '../edit-student-component/edit-student-component.component';
import { DeleteStudentComponentComponent } from '../delete-student-component/delete-student-component.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from '../../Services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  Students:any;
  constructor(private modalService: NgbModal,
    private studentService:StudentsService) {}
  ngOnInit(): void {

    this.studentService.GetAllStudents().subscribe(
      {
        next:(data:any)=>{
          this.Students = data;

          console.log(this.Students)
        },
        error:(err)=>{console.log(err)}
      }
    )
  }
  addNewStudent() {
    const addedStudent=this.modalService.open(AddStudentComponentComponent
      , {
        centered: true,
      });
      addedStudent.result.then(() => {
          this.ngOnInit();
        })
  }
  editStudent(id:string) {
    const editStudentmodal = this.modalService.open(EditStudentComponentComponent
      , {
        centered: true,
      });
    editStudentmodal.componentInstance.id = id;
  }
  deleteStudent(id:string){
    const delededStudentmodal = this.modalService.open(DeleteStudentComponentComponent
      , {
        centered: true,
      });
    delededStudentmodal.componentInstance.id = id;
    delededStudentmodal.result.then(() => {
      this.ngOnInit();
    })
  }


}

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
  currentPage: number = 1;
  studentsPerPage: number=10;
  Page=[5,10];
  searchText=''
  Students:any;
  searchInput: string = '';
searchResults: any[] = [];
  constructor(private modalService: NgbModal,
    private studentService:StudentsService) {}
  ngOnInit(): void {

    this.studentService.GetAllStudents().subscribe(
      {
        next:(data:any)=>{
          this.Students = data;

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
        }).catch(error => {
          console.error("An error occurred:", error);
        });
  }
  editStudent(id:string) {
    const editStudentmodal = this.modalService.open(EditStudentComponentComponent
      , {
        centered: true,
      });
    editStudentmodal.componentInstance.id = id;
    editStudentmodal.result.then(() => {
      this.ngOnInit();
    }).catch(error => {
      console.error("An error occurred:", error);
    });
  }
  deleteStudent(id:string){
    const delededStudentmodal = this.modalService.open(DeleteStudentComponentComponent
      , {
        centered: true,
      });
    delededStudentmodal.componentInstance.id = id;
    if(delededStudentmodal.result){
    delededStudentmodal.result.then(() => {
      this.ngOnInit();
    }).catch(error => {
      console.error("An error occurred:", error);
    });
  }
}

 // search function
performSearch(key:HTMLInputElement) {
   this.searchText = key.value.toLowerCase();
  if (this.searchText === '') {
    this.searchResults = [];
  } else {
    this.searchResults = this.Students.filter((student: { [key: string]: any }) => {
      return Object.keys(student).some(key => {
        if (key !== '_id') {
          const value = student[key];
          return String(value).toLowerCase().includes(this.searchText);
        }
        return false;
      });
    });

    console.log(this.searchResults);
  }
}
reset(key:HTMLInputElement){
  this.searchText='';
  this.searchResults = [];
  this.currentPage=1
  key.value=''

}

onPageChange(pageNumber: number) {
  this.currentPage = pageNumber;

}
}

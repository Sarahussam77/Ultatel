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
  studentsPerPage: number = 10;
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
          this.updateSearchResults();
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
    editStudentmodal.result.then(() => {
      this.ngOnInit();
    })
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

 // search function
performSearch(key:HTMLInputElement) {
   this.searchText = key.value.toLowerCase();
   this.updateSearchResults();
  if (this.searchText === '') {
    this.searchResults = [];
  } else {
    this.searchResults = this.Students.filter((student: { [key: string]: any }) => {
      return Object.values(student).some(value => {
        return String(value).toLowerCase().includes(this.searchText);
      });
    });
  }
}
reset(key:HTMLInputElement){
  this.searchText='';
  this.searchResults = [];
  this.currentPage=1
  key.value=''

}
updateSearchResults() {
  if (this.searchText === '') {
    this.searchResults = this.Students.slice(
      (this.currentPage - 1) * this.studentsPerPage,
      this.currentPage * this.studentsPerPage
    );
  } else {
    this.searchResults = this.Students.filter((student: { [key: string]: any }) => {
      return Object.values(student).some((value) => {
        return String(value).toLowerCase().includes(this.searchText);
      });
    });
  }
}
onPageChange(pageNumber: number) {
  this.currentPage = pageNumber;
  this.updateSearchResults();
}
}

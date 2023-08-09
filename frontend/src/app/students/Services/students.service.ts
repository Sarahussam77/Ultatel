import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/config.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private readonly Base_URL: string;

  constructor(
    private readonly HTTP: HttpClient,
    private readonly configService: ConfigService
  ) {
    this.Base_URL = this.configService.getBaseUrl('students');
  }
  GetAllStudents(){
    return this.HTTP.get(this.Base_URL);
  }
  GetStudentByID(id:any){
    return this.HTTP.get(this.Base_URL+"/"+id);
  }
  AddNewStudent(newStudent:any){
    return this.HTTP.post(this.Base_URL, newStudent);
  }
  UpdateStudent(id:any,updatedStudent:any){
    return this.HTTP.put(this.Base_URL + "/" + id, updatedStudent);
  }
  deleteStudent(id: any) {
    return this.HTTP.delete(this.Base_URL + "/" + id);
  }
}

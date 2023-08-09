import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { StudentsComponent } from './students/students.component';
import { AddStudentComponentComponent } from './students/add-student-component/add-student-component.component';
import { EditStudentComponentComponent } from './students/edit-student-component/edit-student-component.component';
import { ConfigService } from './config.service';
import { CommonModule } from '@angular/common';
import { DeleteStudentComponentComponent } from './students/delete-student-component/delete-student-component.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    AddStudentComponentComponent,
    EditStudentComponentComponent,
    DeleteStudentComponentComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [ ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }

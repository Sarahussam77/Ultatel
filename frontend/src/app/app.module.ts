import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddStudentComponentComponent } from './students/Components/add-student-component/add-student-component.component';
import { EditStudentComponentComponent } from './students/Components/edit-student-component/edit-student-component.component';
import { ConfigService } from './config.service';
import { CommonModule } from '@angular/common';
import { DeleteStudentComponentComponent } from './students/Components/delete-student-component/delete-student-component.component';
import { StudentsComponent } from './students/Components/student/students.component';
import { AgePipe } from './students/Pipes/age.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    AddStudentComponentComponent,
    EditStudentComponentComponent,
    DeleteStudentComponentComponent,
    AgePipe
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }

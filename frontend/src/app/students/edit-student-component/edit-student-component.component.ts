import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-edit-student-component',
  templateUrl: './edit-student-component.component.html',
  styleUrls: ['./edit-student-component.component.css']
})
export class EditStudentComponentComponent {
  @Input() id: string='';

}

import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  // Ou pode declarar assim (sem usar o constructor) -> courses: Course[{_id: '1', name: 'Angular', category: 'front-end'}];
  courses: Course[];

  // Mostra a lista das colunas da tabela name e categoria num array de string
  displayedColumns = ['name', 'category'];

  constructor() { 
    this.courses = [{_id: '1', name: 'Angular', category: 'front-end'}];
   }

  ngOnInit(): void {
  }

}


import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';


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

  // Declarando o service
  //coursesService: CoursesService;

  constructor(private coursesService: CoursesService) { 
    //this.coursesService = new CoursesService();

    // Nosso service vai listar o nosso curso
    this.courses = this.coursesService.list();
   }

  ngOnInit(): void {
  }

}
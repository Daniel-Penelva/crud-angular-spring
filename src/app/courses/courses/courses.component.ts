
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  // O caractere $ é frequentemente usado como uma convenção para indicar que a variável é um Observable
  courses$: Observable <Course[]>;

  // Mostra a lista das colunas da tabela name e categoria num array de string
  displayedColumns = ['name', 'category'];

  constructor(private coursesService: CoursesService) { 

    // Nosso service vai listar o nosso curso
    this.courses$ = this.coursesService.list();
   }

  ngOnInit(): void { /* TODO document why this method 'ngOnInit' is empty */ }

}
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Course } from '../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {

  // Vamos utilizar o simbolo @Input para utilizar a variável courses no layout html do courses.component.html, ou seja, vamos passar os cursos para a tela (data-binding).
 @Input() courses: Course[] = [];

 // Para os eventos que irão sair
 @Output() add = new EventEmitter(false);
 @Output() edit = new EventEmitter(false);

  // Mostra a lista das colunas da tabela name e categoria num array de string
  // readonly deixa como se fosse um objeto final (imutável)
  readonly displayedColumns = ['_id','name', 'category', 'actions'];

  constructor() {}

  ngOnInit(): void {}

  onAdd(){
    this.add.emit(true);
  }

  onEdit(course: Course){
    this.edit.emit(course);
  }
}

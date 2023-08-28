import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {

  // Vamos utilizar o simbolo @Input para utilizar a variável courses no layout html do courses.component.html, ou seja, vamos passar os cursos para a tela (data-binding).
 @Input() courses: Course[] = [];

  // Mostra a lista das colunas da tabela name e categoria num array de string
  // readonly deixa como se fosse um objeto final (imutável)
  readonly displayedColumns = ['_id','name', 'category', 'actions'];

  constructor(public router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onAdd(){
    //console.log('onAdd');

    this.router.navigate(["new"], {relativeTo: this.route});
  }
}

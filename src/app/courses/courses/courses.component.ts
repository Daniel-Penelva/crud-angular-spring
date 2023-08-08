import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  // O caractere $ é frequentemente usado como uma convenção para indicar que a variável é um Observable
  courses$: Observable<Course[]>;

  // Mostra a lista das colunas da tabela name e categoria num array de string
  displayedColumns = ['name', 'category'];

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog
  ) {
    // Nosso service vai listar o nosso curso
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos');
        return of([]);
      })
    );
  }

  // Método de tratamento e erro para ser gerado ao usuário
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }
}

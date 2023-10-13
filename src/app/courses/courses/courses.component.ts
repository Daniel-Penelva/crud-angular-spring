import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { error } from 'console';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  // O caractere $ é frequentemente usado como uma convenção para indicar que a variável é um Observable
  courses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
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

  onAdd(){
    //console.log('onAdd');
    
    this.router.navigate(["new"], {relativeTo: this.route});
  }

  onEdit(course: Course){
    // Define a rota a ser chamada junto com id do curso
    this.router.navigate(["edit", course._id], {relativeTo: this.route});
  }

  onRemove(course: Course){
    this.refresh();
    this.coursesService.remove(course._id).subscribe(() => {
      this.snackBar.open('Curso removido com sucesso!', 'X', { duration: 5000, 
        verticalPosition: 'top', horizontalPosition: 'center' });
    }, () => this.onError('Erro ao tentar remover curso'));
  }

  // Atualizar os dados removidos na tela 
  refresh(){
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos');
        return of([]);
      })
    );
  }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Injectable({
  providedIn: 'root',
})
export class CourseResolver implements Resolve<Course> {
  constructor(private service: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    // Verifica se a rota possui parâmetros
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }

    // Esse return vai ser chamado quando não tem parâmetro, no caso, vai ser chamado quando se cria um curso.
    // Logo vai ser criado um objeto do tipo curso sendo inicializado com vazio
    // Lembrando que esse of retorna um Observable
    return of({ _id: '', name: '', category: '' });
  }
}

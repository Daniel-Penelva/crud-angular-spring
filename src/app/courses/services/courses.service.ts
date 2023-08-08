
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/assets/courses.json';

  constructor(private httpClient: HttpClient) { }

  // Método para acessar a lista de cursos
  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      delay(15000),
      tap(courses => console.log(courses))
      );
  }
}

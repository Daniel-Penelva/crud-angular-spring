import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  // Endereço de acesso da API
  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  // Método para acessar a lista de cursos
  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      //delay(5000),
      tap((courses) => console.log(courses))
    );
  }

  // Método para salvar curso no formulario - vai passar o método post e os dados nome e categoria pela variável record (body = corpo)
  // Lembrando que retorna um Observable porque ele trabalha com HttpClient -> por exemplo, save(record: Course): Observable<any>{...}
  // Partial<Course> é usado para indicar que o objeto passado como parâmetro contém apenas um subconjunto das propriedades da classe Course. 
  //Isso é útil quando você quer permitir que apenas algumas propriedades do objeto sejam definidas
  save(record: Partial<Course>){
    //console.log(record);

    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }
}

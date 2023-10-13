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
      //tap((courses) => console.log(courses))
    );
  }

  save(record: Partial<Course>){
    //console.log(record);

    // Verifica se existe id, e se existir apenas atualiza, caso não exista curso ele cria.
    if(record._id){
      //console.log('update');
      return this.update(record);
    }
    //console.log('create');
    return this.create(record);
  }

  // Método para buscar por id
  loadById(id: string){
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  // Método para criar curso no formulario - vai passar o método post e os dados nome e categoria pela variável record (body = corpo)
  // Lembrando que retorna um Observable porque ele trabalha com HttpClient -> por exemplo, save(record: Course): Observable<any>{...}
  // Partial<Course> é usado para indicar que o objeto passado como parâmetro contém apenas um subconjunto das propriedades da classe Course. 
  //Isso é útil quando você quer permitir que apenas algumas propriedades do objeto sejam definidas
  private create(record: Partial<Course>){
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>){
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }


  remove(id: string){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

}

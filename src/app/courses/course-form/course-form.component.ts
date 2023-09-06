import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  // Grupo de campos
  form = this.formBuilder.group({
    _id:[''],
    name: [''],
    category: [''],
  });

  constructor(private formBuilder: NonNullableFormBuilder, private service: CoursesService,
     private snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) {
    //this.form 
  }

  ngOnInit(): void {
    //Obtendo a rota do courseResolver (Esse 'course' é do route CourseResolver - courses-routing.module.ts) - snapshot (cópia da rota)
    const course: Course = this.route.snapshot.data['course'];
    
    //
    this.form.setValue({_id: course._id, name: course.name, category: course.category});
  }

  onSubmit() {
    //console.log(this.form.value);

    this.service.save(this.form.value).subscribe(
      (result) => this.onSucess(),
      (error) => this.onError()
    );
  }

  // Método que renderiza para a página anterior (principal)
  onCancel() {
    this.location.back();
  }

  // Método que gera a mensagem de sucesso de cadastro do curso ao usuário e também renderiza para a página anterior
  onSucess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso', '', { duration: 5000 });
  }
}

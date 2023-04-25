import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { DTOStudent, Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  public formUpdate= new FormGroup({});
  private id: string|null = '';

  public student: DTOStudent = {
      nombre: '',
      apellido: '',
      curso: '',
      grado: ''
    }

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private _activeRouter: ActivatedRoute,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.formUpdate= this.formBuilder.group({
      nombre: ['',[Validators.required]],
      apellido: ['',[Validators.required]],
      grado: ['', [Validators.required]],
      curso: ['', [Validators.required]],
    });

    if(this._activeRouter.snapshot.paramMap.get('id') != null){
      this.id = this._activeRouter.snapshot.paramMap.get('id') ;
      this.studentService.getStudentById(this.id)
      .subscribe(data => {
        console.log(data)
        this.student = data;
        this.loadForm();
      })
    }
  }

  onSubmit(): any {
    this.student = this.formUpdate.value
    console.log(this.student)
    this.studentService.updateStudent(this.id, this.student)
    .subscribe(data => {
      console.log(data)
      alert('Estudiante actualizado')
      this.location.back();
    })
  }

  loadForm(){
    this.formUpdate.patchValue(this.student)
  }

  back(){
    this.location.back();
  }

}

import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { StudentService } from './student.service';
import { DTOStudent, Student } from '../models/student.model';
import { generateManyStudents, generateOneStudent } from '../models/student.mock';
import { TokenService } from './token.service';

describe('StudentService', () => {
  let service: StudentService;
  let httpController: HttpTestingController;
  let token: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        StudentService
      ]
    });
    service = TestBed.inject(StudentService);
    httpController = TestBed.inject(HttpTestingController);
    token = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getAllStudents', () => {
    it('should return a student list', (doneFn) =>
    {
      const mockData: Student[] = generateManyStudents();
      token.saveIdSchool('627b38b5156866e132d3ce10');

      service.getAllStudentBySchool()
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });

      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/estudiantes');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for getStudents}', () => {
    it('should return a student', (doneFn) =>
    {
      token.saveIdSchool('627b38b5156866e132d3ce10');
      const mockData: Student = generateOneStudent();
      token.saveIdStudent('627c8dcba93b4d1b1efa447e');

      service.getStudentById('627c8dcba93b4d1b1efa447e')
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });

      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/estudiantes/627c8dcba93b4d1b1efa447e');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for getProfileStudents}', () => {
    it('should return a profile student', (doneFn) =>
    {
      token.saveIdSchool('627b38b5156866e132d3ce10');
      const mockData: Student = generateOneStudent();
      token.saveIdStudent('627c8dcba93b4d1b1efa447e');

      service.getProfileStudent('627c8dcba93b4d1b1efa447e')
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });

      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/estudiantes/627c8dcba93b4d1b1efa447e/perfil');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for createStudent', () => {
    it('should return a new Student', (doneFn) =>
    {
      const mockData = generateOneStudent();
      const dto: DTOStudent = {
        nombre: 'Nombre de prueba',
        apellido: 'Apellido de prueba',
        grado: 'Grado de prueba',
        curso: 'Curso de prueba',
        username: 'test',
        password: 'test'
      }
      service.createStudent(dto)
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/estudiantes');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for deleteStudent', () => {
    it('should return a string', (doneFn) =>
    {
      const mockData = 'Estudiante eliminada';
      const idSchool: string = '6278783454aa6cd3cdf0a5f3'

      service.deleteStudent('627c8dcba93b4d1b1efa447e')
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/estudiantes/627c8dcba93b4d1b1efa447e');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for updateStudent', () => {
    it('should return a Student', (doneFn) =>
    {
      const mockData = generateOneStudent();
      const idSchool: string = '6278783454aa6cd3cdf0a5f3'
      const dto: DTOStudent = {
        nombre: 'Nombre de prueba',
        apellido: 'Apellido de prueba',
        grado: 'Grado de prueba',
        curso: 'Curso de prueba',
        username: 'test',
        password: 'test'
      }
      service.updateStudent('627c8dcba93b4d1b1efa447e',dto)
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/estudiantes/627c8dcba93b4d1b1efa447e');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(dto);
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for updateProfileStudent', () => {
    it('should return a Student', (doneFn) =>
    {
      const mockData = generateOneStudent();
      const dto: DTOStudent = {
        nombre: 'Nombre de prueba',
        apellido: 'Apellido de prueba',
        grado: 'Grado de prueba',
        curso: 'Curso de prueba',
        username: 'test',
        password: 'test'
      }
      service.updateProfileStudent('627c8dcba93b4d1b1efa447e',dto)
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/estudiantes/627c8dcba93b4d1b1efa447e/perfil_contexto');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(dto);
      req.flush(mockData);
      httpController.verify();
    })
  });

});

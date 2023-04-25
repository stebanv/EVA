import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { generateManySchools } from '../models/school.mock';
import { generateOneSchool } from '../models/school.mock';
import { SchoolService } from './school.service';
import { DTOCreateSchool, DTOSchool, School } from '../models/school.model';

describe('SchoolService', () => {
  let schoolService: SchoolService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        SchoolService
      ]
    });
    schoolService = TestBed.inject(SchoolService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(schoolService).toBeTruthy();
  });

  describe('tests for getAllSchool', () => {
    it('should return a school list', (doneFn) =>
    {
      const mockData: School[] = generateManySchools();

      schoolService.getAllSchool()
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });

      const req = httpController.expectOne('http://localhost:8003/instituciones');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for getSchool', () => {
    it('should return a school', (doneFn) =>
    {
      const mockData: School = generateOneSchool();
      const idSchool: string = '6278783454aa6cd3cdf0a5f3'

      schoolService.getSchoolById(idSchool)
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });

      const req = httpController.expectOne('http://localhost:8003/instituciones/6278783454aa6cd3cdf0a5f3');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for getStateTest', () => {
    it('should return a boolean', (doneFn) =>
    {
      const mockData: boolean = true;
      const idSchool: string = '6278783454aa6cd3cdf0a5f3'

      schoolService.getStateTest(idSchool)
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });

      const req = httpController.expectOne('http://localhost:8003/instituciones/6278783454aa6cd3cdf0a5f3/estado_test');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for createSchool', () => {
    it('should return a new school', (doneFn) =>
    {
      const mockData = generateOneSchool();
      const idSchool: string = '6278783454aa6cd3cdf0a5f3'
      const dto: DTOCreateSchool = {
        nombre: 'Escuela de prueba',
        ubicacion: 'Calle falsa 123',
        username: 'test',
        password: 'test'
      }
      schoolService.createSchool(dto)
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for deleteSchool', () => {
    it('should return a string', (doneFn) =>
    {
      const mockData = 'Institucion eliminada';
      const idSchool: string = '6278783454aa6cd3cdf0a5f3'

      schoolService.deleteSchool('6278783454aa6cd3cdf0a5f3')
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones/6278783454aa6cd3cdf0a5f3');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for updateSchool', () => {
    it('should return a school', (doneFn) =>
    {
      const mockData = generateOneSchool();
      const idSchool: string = '6278783454aa6cd3cdf0a5f3'
      const dto: DTOSchool = {
        nombre: 'Escuela de prueba',
        ubicacion: 'Calle falsa 123',
      }
      schoolService.updateSchool(idSchool,dto)
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones/6278783454aa6cd3cdf0a5f3');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(dto);
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for updateProfileSchool', () => {
    it('should return a school', (doneFn) =>
    {
      const mockData = generateOneSchool();
      const idSchool: string = '6278783454aa6cd3cdf0a5f3'
      const dto: DTOSchool = {
        nombre: 'Escuela de prueba',
        ubicacion: 'Calle falsa 123',
      }
      schoolService.updateProfileSchool(idSchool,dto)
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones/6278783454aa6cd3cdf0a5f3/perfil_contexto');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(dto);
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for updateStateTest', () => {
    it('should return a boolean', (doneFn) =>
    {
      const mockData = true;
      const idSchool: string = '6278783454aa6cd3cdf0a5f3'

      schoolService.updateStateTest(idSchool)
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones/6278783454aa6cd3cdf0a5f3/estado_test');
      expect(req.request.method).toBe('PUT');
      req.flush(mockData);
      httpController.verify();
    })
  });

});

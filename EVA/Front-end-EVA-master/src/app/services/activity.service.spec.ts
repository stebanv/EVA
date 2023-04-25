import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Activity, DTOActivity } from '../models/activity.model';
import { generateManyActivitys, generateOneActivity } from '../models/activity.mock';
import { ActivityService } from './activity.service';
import { TokenService } from './token.service';

describe('ActivityService', () => {
  let service: ActivityService;
  let httpController: HttpTestingController;
  let token: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        ActivityService
      ]
    });
    service = TestBed.inject(ActivityService);
    httpController = TestBed.inject(HttpTestingController);
    token = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getAllActivities', () => {
    it('should return a activity list', (doneFn) =>
    {
      const mockData: Activity[] = generateManyActivitys();
      token.saveIdSchool('627b38b5156866e132d3ce10');

      service.getAllActivity()
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });

      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/actividades_extracurriculares');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for getActivity', () => {
    it('should return a activity', (doneFn) =>
    {
      const mockData: Activity = generateOneActivity();
      token.saveIdSchool('627b38b5156866e132d3ce10');

      service.getActivityById('627b3c482cd035f87780097d')
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });

      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/actividades_extracurriculares/627b3c482cd035f87780097d');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for getActivitysRecomendation', () => {
    it('should return a activity', (doneFn) =>
    {
      const mockData: Activity[] = generateManyActivitys();
      token.saveIdSchool('627b38b5156866e132d3ce10');
      token.saveIdStudent('627c8dcba93b4d1b1efa447e');

      service.getAcitvityRecomendation()
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });

      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/estudiantes/627c8dcba93b4d1b1efa447e/recomendacion_actividades');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for createActivity', () => {
    it('should return a new Activity', (doneFn) =>
    {
      const mockData = generateOneActivity();
      const dto: DTOActivity = {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripcion de prueba',
        horario: 'Lunes a Viernes de 9:00 a 13:00',
        area: 'Deportes',
        subarea: 'Futbol',
        cupos: 10,
        recursos: 'recursos'
      }
      service.createActivity(dto)
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/actividades_extracurriculares');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for deleteActivity', () => {
    it('should return a string', (doneFn) =>
    {
      const mockData = 'Actividad eliminada';
      const idSchool: string = '6278783454aa6cd3cdf0a5f3'

      service.deleteActivity('627b3c482cd035f87780097d')
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/actividades_extracurriculares/627b3c482cd035f87780097d');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for updateActivity', () => {
    it('should return a Activity', (doneFn) =>
    {
      const mockData = generateOneActivity();
      const dto: DTOActivity = {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripcion de prueba',
        horario: 'Lunes a Viernes de 9:00 a 13:00',
        area: 'Deportes',
        subarea: 'Futbol',
        cupos: 10,
        recursos: 'recursos'
      }
      service.updateActivity('627b3c482cd035f87780097d',dto)
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/actividades_extracurriculares/627b3c482cd035f87780097d');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(dto);
      req.flush(mockData);
      httpController.verify();
    })
  });

});

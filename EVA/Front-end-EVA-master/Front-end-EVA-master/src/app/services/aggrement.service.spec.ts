import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';
import { generateManyAggrements, generateOneAggrement } from '../models/aggrement.mock';
import { AggrementService } from './aggrement.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Aggrement, DTOAggrenment, DTOCreateAggrenment } from '../models/aggrement.model';

fdescribe('AggrementService', () => {
  let service: AggrementService;
  let httpController: HttpTestingController;
  let token: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      providers: [
        AggrementService
      ]
    });
    service = TestBed.inject(AggrementService);
    httpController = TestBed.inject(HttpTestingController);
    token = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getAllAggremebt', () => {
    it('should return a aggrement list', (doneFn) =>
    {
      const mockData: Aggrement[] = generateManyAggrements();
      token.saveIdSchool('627b38b5156866e132d3ce10');

      service.getAllAggrementBySchoolID()
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });

      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/convenios');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for getAggrement', () => {
    it('should return a Aggrement', (doneFn) =>
    {
      const mockData: Aggrement = generateOneAggrement();
      token.saveIdSchool('627b38b5156866e132d3ce10');

      service.getAggrementById('627bcfccf199ba4b57552839')
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });

      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/convenios/627bcfccf199ba4b57552839');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for getAggrementsRecomendation', () => {
    it('should return a Aggrement', (doneFn) =>
    {
      const mockData: Aggrement[] = generateManyAggrements();
      token.saveIdSchool('627b38b5156866e132d3ce10');

      service.getAggrementsRecomendation()
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });

      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/estudiantes/627c8dcba93b4d1b1efa447e/recomendacion_convenios');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for createAggrement', () => {
    it('should return a new Aggrement', (doneFn) =>
    {
      const mockData = generateOneAggrement();
      const dto: DTOCreateAggrenment = {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripcion de prueba',
        horario: 'Lunes a Viernes de 9:00 a 13:00',
        area: 'Deportes',
        subarea: 'Futbol',
        costo: 10,
        recursos: 'recursos',
        ubicacion: 'ubicacion',
        frecuencia: 'Semanal',
        temporada: 'Temporada',
      }
      service.createAggrement(dto)
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/convenios');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for deleteAggrement', () => {
    it('should return a string', (doneFn) =>
    {
      const mockData = 'Convenios eliminada';
      const idSchool: string = '6278783454aa6cd3cdf0a5f3'

      service.deleteAggrement('627b3c482cd035f87780097d')
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/convenios/627b3c482cd035f87780097d');
      req.flush(mockData);
      httpController.verify();
    })
  });

  describe('tests for updateAggrement', () => {
    it('should return a Aggrement', (doneFn) =>
    {
      const mockData = generateOneAggrement();
      const dto: DTOCreateAggrenment = {
        nombre: 'Nombre de prueba',
        descripcion: 'Descripcion de prueba',
        horario: 'Lunes a Viernes de 9:00 a 13:00',
        area: 'Deportes',
        subarea: 'Futbol',
        costo: 10,
        recursos: 'recursos',
        ubicacion: 'ubicacion',
        frecuencia: 'Semanal',
        temporada: 'Temporada',
      }
      service.updateAggrement('627b3c482cd035f87780097d',dto)
      .subscribe( (data) => {
        expect(data).toEqual(mockData)
        doneFn();
      });
      const req = httpController.expectOne('http://localhost:8003/instituciones/627b38b5156866e132d3ce10/convenios/627b3c482cd035f87780097d');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(dto);
      req.flush(mockData);
      httpController.verify();
    })
  });

  // 627bcfccf199ba4b57552839
});

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DTOAggrenment } from 'src/app/models/aggrement.model';
import { School } from 'src/app/models/school.model';
import { AggrementService } from 'src/app/services/aggrement.service';
import { SchoolService } from 'src/app/services/school.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-aggre',
  templateUrl: './aggre.component.html',
  styleUrls: ['./aggre.component.css']
})
export class AggreComponent implements OnInit {

  public page: number =0;
  modalSwitch: boolean = false;

  public tipo_usuario: string | null = '';

  public select = false;
  public idSelect: string = '';
  public schools: School[] = [];
  public word: string = "";
  public DTOAggrements : DTOAggrenment[] = [];
  public AllDTOAggrements : DTOAggrenment[] = []

  constructor(
    private location: Location,
    private aggreService: AggrementService,
    private tokenService: TokenService,
    private schoolService: SchoolService
  ) { }

  ngOnInit(): void {
    this.tipo_usuario = this.tokenService.getTipoUsuario();
    this.schoolService.getAllSchool()
    .subscribe(data => {
      this.schools = data;
    })
  }

  delete(id: string){
    var r = confirm("¿Seguro que desea eliminar este convenio?");
    if (r == true) {
        this.aggreService.deleteAggrement(id)
        .subscribe( data =>
          {
            console.log(data)
            alert("Convenio eliminado correctamente");
            window.location.reload();
          })
        //llamar al http
    }
  }

  search(){
    this.DTOAggrements = this.AllDTOAggrements.filter(aggrement => aggrement.nombre.toLowerCase().includes(this.word.toLowerCase()));
    console.log(this.DTOAggrements)
  }

  selectId(){
    this.select = true;
    this.tokenService.saveIdSchool(this.idSelect);
    console.log(this.tokenService.getIdSchool())
    this.aggreService.getAllAggrementBySchoolID()
    .subscribe(data => {
      this.AllDTOAggrements = data
      this.DTOAggrements = this.AllDTOAggrements
      console.log(data)
    })
  }

}

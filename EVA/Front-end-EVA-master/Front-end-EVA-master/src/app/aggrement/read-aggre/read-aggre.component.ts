import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { DTOAggrenment } from 'src/app/models/aggrement.model';
import { AggrementService } from 'src/app/services/aggrement.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-read-aggre',
  templateUrl: './read-aggre.component.html',
  styleUrls: ['./read-aggre.component.css']
})
export class ReadAggreComponent implements OnInit {

  public page: number =0;
  modalSwitch: boolean = false;

  public tipo_usuario: string | null = '';
  public word: string = "";

  public DTOAggrements : DTOAggrenment[] = []
  public AllDTOAggrements : DTOAggrenment[] = []

  constructor(
    private location: Location,
    private aggreService: AggrementService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.tipo_usuario = this.tokenService.getTipoUsuario();
    this.aggreService.getAllAggrementBySchoolID()
    .subscribe(data => {
      this.AllDTOAggrements = data;
      this.DTOAggrements= this.AllDTOAggrements;
      console.log(data)
    });
  }

  search(){
    this.DTOAggrements = this.AllDTOAggrements.filter(aggrement => aggrement.nombre.toLowerCase().includes(this.word.toLowerCase()));
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
}

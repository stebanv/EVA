import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'src/app/services/school.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, ChartOptions} from 'chart.js';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit {

  public clusterSelected: string='';

  private colors: string [] = [
    '#d6d52b',
    '#ffd468',
    '#89ab32',
    '#1a6f9e',
    '#0a5c1a',
    '#084476'
  ]

  //grupo 1
  public barChartOptions1: ChartOptions = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max:10
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
  }};
  public barChartType1: ChartType = 'bar';
  public barChartData1: ChartData<'bar'> = {
    labels: [ ],
    datasets: [],
  };

  //grupo 2
  public barChartOptions2: ChartOptions = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max:10
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
  }};
  public barChartType2: ChartType = 'bar';
  public barChartData2: ChartData<'bar'> = {
    labels: [ ],
    datasets: [],
  };

  //Grupo 3
  public barChartOptions3: ChartOptions = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max:10
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
  }};
  public barChartType3: ChartType = 'bar';
  public barChartData3: ChartData<'bar'> = {
    labels: [ ],
    datasets: [],
  };

//grupo 4
  public barChartOptions4: ChartOptions = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max:10
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
  }};
  public barChartType4: ChartType = 'bar';
  public barChartData4: ChartData<'bar'> = {
    labels: [ ],
    datasets: [],
  };

  //grupo 5
  public barChartOptions5: ChartOptions = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max:10
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
  }};
  public barChartType5: ChartType = 'bar';
  public barChartData5: ChartData<'bar'> = {
    labels: [ ],
    datasets: [],
  };

  public barChartOptions6: ChartOptions = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max:10
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
  }};
  public barChartType6: ChartType = 'bar';
  public barChartData6: ChartData<'bar'> = {
    labels: [ ],
    datasets: [],
  };


  constructor(
    private schoolService: SchoolService
  ) { }

  ngOnInit(): void {
    this.viewCluster();
  }

  public viewCluster(){
    let cluster1:any;
    let cluster2:any;
    let cluster3:any;
    let cluster4:any;
    let cluster5:any;
    let cluster6:any;
    let datos1: {labels: string[], valores: number[]} = {labels: [], valores:[]};
    let datos2: {labels: string[], valores: number[]} = {labels: [], valores:[]};
    let datos3: {labels: string[], valores: number[]} = {labels: [], valores:[]};
    let datos4: {labels: string[], valores: number[]} = {labels: [], valores:[]};
    let datos5: {labels: string[], valores: number[]} = {labels: [], valores:[]};
    let datos6: {labels: string[], valores: number[]} = {labels: [], valores:[]};
    this.schoolService.getClusters()
    .subscribe( data =>{
      console.log(data)
        for (let key of Object.keys(data)){
            if(key==='0'){
              cluster1 = data[key];
              for(let cluster of Object.keys(cluster1)){
                datos1.labels.push(cluster);
                datos1.valores.push(cluster1[cluster])
                console.log(datos1)
              }
            }else if(key === '1'){
              cluster2 = data[key];
              for(let cluster of Object.keys(cluster2)){
                datos2.labels.push(cluster);
                datos2.valores.push(cluster2[cluster])
                console.log(datos2)
              }
            }else if(key==='2'){
              cluster3 = data[key];
              for(let cluster of Object.keys(cluster3)){
                datos3.labels.push(cluster);
                datos3.valores.push(cluster3[cluster])
                console.log(datos3)
              }
            }else if(key==='3'){
              cluster4 = data[key];
              for(let cluster of Object.keys(cluster4)){
                datos4.labels.push(cluster);
                datos4.valores.push(cluster4[cluster])
                console.log(datos4)
              }
            }else if(key==='4'){
              cluster5 = data[key];
              for(let cluster of Object.keys(cluster5)){
                datos5.labels.push(cluster);
                datos5.valores.push(cluster5[cluster])
                console.log(datos5)
              }
            } else if(key==='5'){
              cluster6 = data[key];
              for(let cluster of Object.keys(cluster6)){
                datos6.labels.push(cluster);
                datos6.valores.push(cluster6[cluster])
                console.log(datos6)
              }
            }
        }

    //primera grafica
    this.barChartData1 = {
      labels: datos1.labels,
      datasets: [
        { data: datos1.valores,
          label: 'Subáreas', backgroundColor: '#89ab32' }
      ]};

    //segunda grafica
    this.barChartData2 = {
      labels: datos2.labels,
      datasets: [
        { data: datos2.valores,
          label: 'Subáreas', backgroundColor: '#89ab32' }
      ]};

      //tercera grafica
    this.barChartData3 = {
      labels: datos3.labels,
      datasets: [
        { data: datos3.valores,
          label: 'Subáreas', backgroundColor: '#89ab32' }
      ]};

      //cuarta grafica
    this.barChartData4 = {
      labels: datos4.labels,
      datasets: [
        { data: datos4.valores,
          label: 'Subáreas', backgroundColor: '#89ab32' }
      ]};

      //quinta grafica
    this.barChartData5 = {
      labels: datos5.labels,
      datasets: [
        { data: datos5.valores,
          label: 'Subáreas', backgroundColor: '#89ab32' }
      ]};

      //sexta grafica
    this.barChartData6 = {
      labels: datos6.labels,
      datasets: [
        { data: datos6  .valores,
          label: 'Subáreas', backgroundColor: '#89ab32' }
      ]};

    })
  }

  public updateCluster(){
    this.viewCluster();
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }
}

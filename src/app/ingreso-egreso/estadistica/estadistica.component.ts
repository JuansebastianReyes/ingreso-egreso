import { IngresoEgreso } from './../../models/ingreso-egreso.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }]
  };


  public doughnutChartType: ChartType = 'doughnut';


  ingresos:number = 0;
  egresos:number = 0;

  totalIngresos:number = 0;
  totalEgresos:number = 0;


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('ingresoEgreso').subscribe( ({ items })=>{
      this.generarEstadistica(items)
    })
  }

  generarEstadistica( items: IngresoEgreso[]){
    for (const item of items) {
      if(item.tipo === 'ingreso'){
        this.totalIngresos += item.monto
        this.ingresos++
      }else{
        this.totalEgresos += item.monto
        this.egresos++
      }
    }

    this.doughnutChartData.datasets = [ {data: [this.totalIngresos, this.totalEgresos]}]
    this.chart?.chart?.update()
  }

}

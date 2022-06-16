import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartGeneratorService {

  constructor() { }

  public getOccupationChart(occupationPercentage: number) {
    const occupationChart = new Chart('occupation', {
      type: 'doughnut',
      data: {
        labels: ['Ocupado', 'Libre'],
        datasets: [{
          data: [occupationPercentage, 100 - occupationPercentage],
          backgroundColor: ['#0154a0', '#4a9eed'],
          hoverBackgroundColor: ['#01396e', '#027ced']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
            }
          }
        }
      }
    });
    return occupationChart;
  }

  public getReservationsChart(id, reservationsCount: any[]) {
    const splittedArray = this.reservationsToIntArray(reservationsCount);
    const reservationsChart = new Chart(id, {
      type: 'bar',
      data: {
        labels: splittedArray[0],
        datasets: [{
          label: "Reservaciones",
          data: splittedArray[1],
          backgroundColor: '#0154a0',
          hoverBackgroundColor: '#01396e'
        },
        {
          label: "Palmadas",
          data: splittedArray[2],
          backgroundColor: '#4a9eed',
          hoverBackgroundColor: '#027ced'
        }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: true,
      }
    });
    return reservationsChart;
  }

  private reservationsToIntArray(reservationsCount: any[]) {
    const weeks = [];
    const reservations = [];
    const palmadas = [];
    for (let week of reservationsCount) {
      weeks.push('Semana ' + week.semana);
      reservations.push(week.reservaciones);
      palmadas.push(week.palmadas);
    }
    return [weeks, reservations, palmadas];
  }
}

import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { AfterViewInit } from '@angular/core';

import Chart from 'chart.js/auto';

@Component({
  selector: 'pb-hoomepage',
  templateUrl: './hoomepage.component.html',
  styleUrls: ['./hoomepage.component.css']
})
export class HomepageComponent implements AfterViewInit {

  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#fd6b90',
                '#36aeb8',
                '#36ae78',
                '#36ae18',
            ],
        }
    ],
    data: [],
    labels: []
  };
  constructor(public http: HttpClient) {   }

  ngAfterViewInit(): void {
    this.http.get<any>('http://localhost:3000/budget')
      .subscribe((res: any) => {
        for (let i = 0; i < res.myBudget.length; i++) {
          this.dataSource.data.push(res.myBudget[i].budget);
          this.dataSource.labels.push(res.myBudget[i].title);
        }
        this.createChart();
      });
  }
  

  // createChart() {
  //   //const ctx = document.getElementById('myChart') as HTMLCanvasElement; // Correct the type
  //   var canvas = document.getElementById('myChart') as HTMLCanvasElement;
  //   var ctx = canvas.getContext('2d');    
  //   var myPieChart = new Chart(ctx, {
  //     type: 'pie',
  //     data: this.dataSource // Use this.dataSource to access the class property
  //   });
  // }

  createChart() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: this.dataSource.data,
          backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            '#fd6b90',
            '#36aeb8',
            '#36ae78',
            '#36ae18',
          ],
        }],
        labels: this.dataSource.labels,
      },
    });
  }
  
}

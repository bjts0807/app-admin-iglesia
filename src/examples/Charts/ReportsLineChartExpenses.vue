<template>
  <div class="chart">
    <canvas id="graphExpensesmonth" class="chart-canvas" height="170"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js/auto";

export default {
  name: "ReportsLineChart",
  props: ['dataExpensesMonth'],
  methods: {
    showGraph(){
      this.$nextTick(() => this.graph());
    },
    graph() {
      var ctx = document.getElementById('graphExpensesmonth').getContext("2d");

      let label=[];
      let data_dataset=[];       
      let total_general=0;

      this.dataExpensesMonth.forEach((e,i) => {
        label[i]=e.date;
        data_dataset[i]=e.total;
        total_general=total_general+e.total;
      });

      new Chart(ctx, {
        type: "line",
        data: {
          labels: label,
          datasets: [
            {
              label: "Salida",
              tension: 0,
              borderWidth: 0,
              pointRadius: 5,
              pointBackgroundColor: "rgba(255, 255, 255, .8)",
              pointBorderColor: "transparent",
              borderColor: "rgba(255, 255, 255, .8)",
              // eslint-disable-next-line no-dupe-keys
              borderColor: "rgba(255, 255, 255, .8)",
              // eslint-disable-next-line no-dupe-keys
              borderWidth: 4,
              backgroundColor: "transparent",
              fill: true,
              data: data_dataset,
              maxBarThickness: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
                color: "rgba(255, 255, 255, .2)",
              },
              ticks: {
                display: true,
                color: "#f8f9fa",
                padding: 10,
                font: {
                  size: 14,
                  weight: 300,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                color: "#f8f9fa",
                padding: 10,
                font: {
                  size: 14,
                  weight: 300,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
          },
        },
      });
    },
  },
  watch: {
    dataExpensesMonth:function(){
      this.showGraph();
    }
  }
  
};
</script>

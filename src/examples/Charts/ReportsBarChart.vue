<template>
  <div class="chart">
    <canvas id="graphIncomesAndExpenses" class="chart-canvas" height="170"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js/auto";

export default {
  name: "ReportsBarChart",
  props: ['dataIncomesAndExpenses'],
  methods: {
    showGraph(){
      this.$nextTick(() => this.graph());
    },
    graph() {
      var ctx = document.getElementById('graphIncomesAndExpenses').getContext("2d");

      let label=[];
      let data_dataset=[];  

      this.dataIncomesAndExpenses.forEach((e,i) => {
        label[i]=e.type;
        data_dataset[i]=e.total;
      });

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: label,
          datasets: [
            {
              label: "Entradas",
              tension: 0.4,
              borderWidth: 0,
              borderRadius: 4,
              borderSkipped: false,
              backgroundColor: "rgba(255, 255, 255, .8)",
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
                suggestedMin: 0,
                suggestedMax: 500,
                beginAtZero: true,
                padding: 10,
                font: {
                  size: 14,
                  weight: 300,
                  family: "Roboto",
                  style: "normal",
                  lineHeight: 2,
                },
                color: "#fff",
              },
            },
            x: {
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
          },
        },
      });
    },
  },
  watch: {
    dataIncomesAndExpenses:function(){
      this.showGraph();
    }
  }
};
</script>

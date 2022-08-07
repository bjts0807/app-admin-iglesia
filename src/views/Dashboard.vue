<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <mini-statistics-card
              :title="{ text: 'Miembros ', value:dashboard_count.total_members }"
              :detail="`${dashboard_count.total_members_active} miembros activos`"
              :icon="{
                name: 'group',
                color: 'text-white',
                background: 'info',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Entradas', value:$filters.cop_currency_no_decimals(dashboard_count.total_incomes) }"
              :detail="`${$filters.cop_currency_no_decimals(dashboard_count.total_incomes_day) } en entradas del Dia`"
              :icon="{
                name: 'payments',
                color: 'text-white',
                background: 'success',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Salidas', value:$filters.cop_currency_no_decimals(dashboard_count.total_expenses) }"
              :detail="`${$filters.cop_currency_no_decimals(dashboard_count.total_expenses_day) } en salidas del Dia`"
              :icon="{
                name: 'price_check',
                color: 'text-white',
                background: 'primary',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Caja', value:$filters.cop_currency_no_decimals(dashboard_count.total_cash) }"
              detail="Valor en caja a la fecha"
              :icon="{
                name: 'point_of_sale',
                color: 'text-white',
                background: 'warning',
              }"
            />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-4 col-md-6 mt-4">
            <chart-holder-card
              title="Entradas y salidas del mes"
              subtitle="Aquí se muestran el total general de las entradas y las salidas del mes actual"
              color='success'
            >
              <reports-bar-chart
                :dataIncomesAndExpenses="dataIncomesAndExpenses"
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-4 col-md-6 mt-4">
            <chart-holder-card
               title="Entradas del mes"
              subtitle="Aquí se muestran todas las entradas del mes actual"
              
              color="info"
            >
              <div v-show="!Object.keys(dataIncomesMonth).length" class="text-white text-center">
                No hay datos 
              </div>
              <reports-line-chart-incomes
                :dataIncomesMonth="dataIncomesMonth"
              />
            </chart-holder-card>
          </div>
          <div class="col-lg-4 col-md-6 mt-4">
            <chart-holder-card
               title="Salidas del mes"
              subtitle="Aquí se muestran todas las salidas del mes actual"
             
              color="danger"
            >
              <div v-show="!Object.keys(dataExpensesMonth).length" class="text-white text-center">
                No hay datos 
              </div>
              <div >
                <reports-line-chart-expenses 
                :dataExpensesMonth="dataExpensesMonth"
              />
              </div>
              
            </chart-holder-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartHolderCard from "./components/ChartHolderCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import ReportsLineChartIncomes from "@/examples/Charts/ReportsLineChartIncomes.vue";
import ReportsLineChartExpenses from "@/examples/Charts/ReportsLineChartExpenses.vue";
import MiniStatisticsCard from "./components/MiniStatisticsCard.vue";
import Swal from "sweetalert2";
import dashboardService from '../services/dashboardService';
export default {
  name: "dashboard-default",
  data() {
    return {
      dashboard_count:{},
      dataIncomesMonth:[],
      dataExpensesMonth:[],
      dataIncomesAndExpenses:[]
    };
  },
  components: {
    ChartHolderCard,
    ReportsBarChart,
    ReportsLineChartIncomes,
    ReportsLineChartExpenses,
    MiniStatisticsCard,
  },
  async created(){
    try {
      this.LoaderSpinnerShow();
      const response = await dashboardService.dashboardCount();
      this.dashboard_count=response.data;
      this.dataIncomesMonth=response.data.total_incomes_month;
      this.dataExpensesMonth=response.data.total_expenses_month;
      this.dataIncomesAndExpenses=response.data.total_expenses_and_incomes;
      this.LoaderSpinnerHide();
    } catch (error) {
      console.error(error);
      this.LoaderSpinnerHide();
      Swal.fire("Ups!", "ha ocurrido un error al procesar la solicitud", "error");
    }
  }
};
</script>

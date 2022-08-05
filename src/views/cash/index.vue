<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-6 col-md-6 mb-md-0 mb-4">
        <div class="card">
            <img src="@/assets/img/img-general/cash.png" width="128" class="card-img-top" >
            <div class="card-body">
                <h2>Total en caja: {{$filters.cop_currency_no_decimals(cash.total_cash)}}</h2>
                <h4 class="text-muted">Total entradas: {{$filters.cop_currency_no_decimals(cash.total_incomes)}}</h4>
                <h4 class="text-muted">Total salidas: {{$filters.cop_currency_no_decimals(cash.total_expenses_cash)}}</h4>
            </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-md-0 mb-4">
        <div class="card">
            <img src="@/assets/img/img-general/income.png"  class="card-img-top" >
            <div class="card-body bg-transparent">
                <timeline-list
                    class="h-100"
                    title="Entradas del Dia"
                    description="<i class='fa fa-arrow-up text-success' aria-hidden='true'></i>
                    <span class='font-weight-bold'>Todas las entradas del día</span>"
                    >
                    <timeline-item
                        :icon="{
                        component: 'payments',
                        class: 'text-success',
                        }"
                        :title="`${$filters.cop_currency_no_decimals(cash.total_tithes)}`"
                        date-time="Total en Diezmos"
                    />
                    <TimelineItem
                        :icon="{
                        component: 'paid',
                        class: 'text-danger',
                        }"
                        :title="`${$filters.cop_currency_no_decimals(cash.total_offerings)}` "
                        date-time="Total en Ofrendas"
                    />
                </timeline-list>
            </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 mb-md-0 mb-4">
        <div class="card">
            <img src="@/assets/img/img-general/expenses.png"  class="card-img-top" >
            <div class="card-body bg-transparent">
                <timeline-list
                class="h-100"
                title="Salidas del Dia"
                description="<i class='fa fa-arrow-down text-danger' aria-hidden='true'></i>
                <span class='font-weight-bold'>Todas las salidas del día</span>"
                >
                <timeline-item
                    :icon="{
                    component: 'payments',
                    class: 'text-success',
                    }"
                    :title="`${$filters.cop_currency_no_decimals(cash.total_expenses)}`"
                    date-time="Total en Gastos"
                />
                </timeline-list>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import TimelineList from "@/examples/Cards/TimelineList.vue";
import TimelineItem from "@/examples/Cards/TimelineItem.vue";
import cashService from "../../services/cashService";
import Swal from 'sweetalert2';

export default {
  name: "cash",
  data() {
    return {
      cash:{}
    };
  },
  components: {
    TimelineList,
    TimelineItem,
  },
  methods: {
    async getCash(){
        try {
            this.LoaderSpinnerShow();
            const response = await cashService.getCash();
            this.cash=response.data;
            this.LoaderSpinnerHide();
        } catch (error) {
            console.log(error);
            this.LoaderSpinnerHide();
            Swal.fire("Ups!", "ha ocurrido un error al procesar la solicitud", "error");
        }
    }
  },
  created() {
    this.getCash();
  }
};
</script>

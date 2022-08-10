<template>
    <main>
        <div class="py-4 container-fluid">
            <div class="row mb-4">
                <div class="col-lg-12 position-relative ">
                    <div class="card">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-6 text-primary">
                                    Salidas
                                </div>
                                <div class="col-6 d-flex justify-content-end">
                                     <i class="material-icons-round text-dark fs-2">price_check</i>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                          <data-grid :data="pagination"
                              @changePage="changePage($event)"
                              @perPageChange="perPageChange($event)"
                              @search="search($event)">
                                <template #grid>
                                  <grid-table>
                                    <template #head>
                                        <grid-cell-header class="bg-light"  v-for="(h,i) in headers" :key="`h_${i}`">{{h}}</grid-cell-header>
                                    </template>
                                    <template #body>
                                        <grid-row v-for="(item, i) in pagination.data" :key="`d_${i}`">
                                            <grid-cell class="text-center small">
                                                {{item.date}}
                                            </grid-cell>
                                            <grid-cell class="text-center small">
                                                {{$filters.cop_currency_no_decimals(item.value)}} 
                                            </grid-cell>
                                            <grid-cell class="text-center small">
                                                {{item.concept}}
                                            </grid-cell>
                                            <grid-cell class="text-center   ">
                                                <div class=" ">
                                                <button @click="openModalEdit(item.id);" class="btn btn-outline-info mx-2  btn-sm" title="Editar" >
                                                    <i class="fa fa-edit fa-3x"></i>
                                                </button>
                                            </div>
                                            </grid-cell>
                                        </grid-row>
                                    </template>
                                  </grid-table>
                              </template>
                              <template #action-button>
                                <button  class="btn btn-info btn-sm shadow-sm mb-2" type="button" data-toggle="modal" @click="openModal()">
                                    Nuevo &nbsp;<i class="fas fa-plus"></i>
                                </button>
                              </template>
                          </data-grid>
                           <modal-expense ref="modalExpense" v-on:get-expense="getExpense"></modal-expense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import DataGrid from "../../components/utilities/DataGrid/DataGrid";
import GridTable from "../../components/utilities/DataGrid/GridTable";
import GridCellHeader from "../../components/utilities/DataGrid/GridCellHeader";
import GridRow from "../../components/utilities/DataGrid/GridRow";
import GridCell from "../../components/utilities/DataGrid/GridCell";
import expenseService from "../../services/expenseService";
import modalExpense from "./modalExpense";
import Swal from "sweetalert2";
export default {
  components:{
     GridCell, GridRow, GridCellHeader, GridTable, DataGrid,modalExpense
  },
  data(){
    return {
        headers : [
            'Fecha',
            'Valor',
            'Concepto',
            'Opciones'
        ],
        pagination : {
            data : [],
            current_page : 1,
            page : 1,
            per_page : 5,
            search : '',
            total: '',
        }
    }
  },
  methods:{
    async getExpense(){
        try {
            this.LoaderSpinnerShow();
            const response = (await expenseService.index(this.pagination.search, this.pagination))?.data;
            this.pagination.data = response.data;
            this.pagination.current_page  = response.current_page;
            this.pagination.total = response.total;
            this.LoaderSpinnerHide(); 
        }catch (e) {
            console.error(e);
            this.LoaderSpinnerHide(); 
            Swal.fire("Oops!", "ha ocurrido un error al procesar la solicitud", "error");
        }
    },
    changePage(page) {
      this.pagination.page = page;
      this.getExpense();
    },
    perPageChange(per_page) {
      this.pagination.per_page = per_page;
      this.pagination.page = 1;
      this.getExpense();
    },
    search(query){
      this.pagination.search = query;
      this.pagination.page = 1;
      this.getExpense();
    },
    openModal(){
      this.$refs.modalExpense.openModal();
      this.$refs.modalExpense.getValueCash();
    },
    openModalEdit(id){
        this.$refs.modalExpense.edit(id);
    },
  },
  async created(){
    await this.getExpense();
  }
}
</script>
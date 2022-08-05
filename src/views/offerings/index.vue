<template>
    <main>
        <div class="py-4 container-fluid">
            <div class="row mb-4">
                <div class="col-lg-12 position-relative ">
                    <div class="card">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-6 text-primary">
                                    Ofrendas
                                </div>
                                <div class="col-6 d-flex justify-content-end">
                                    <img src="@/assets/img/img-general/members.png" alt="" width="96">
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
                                                {{item.description}}
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
                           <modal-offering ref="modalOffering" v-on:get-offering="getOffering"></modal-offering>
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
import offeringService from "../../services/offeringService";
import modalOffering from "./modalOffering";
import Swal from "sweetalert2";
export default {
  components:{
     GridCell, GridRow, GridCellHeader, GridTable, DataGrid,modalOffering
  },
  data(){
    return {
        headers : [
            'Fecha',
            'Valor',
            'Descripción',
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
    async getOffering(){
        try {
            this.LoaderSpinnerShow();
            const response = (await offeringService.index(this.pagination.search, this.pagination))?.data;
            this.pagination.data = response.data;
            this.pagination.current_page  = response.current_page;
            this.pagination.total = response.total;
            this.LoaderSpinnerHide(); 
        }catch (e) {
            console.error(e);
            this.LoaderSpinnerHide(); 
            Swal.fire("Ups!", "ha ocurrido un error al procesar la solicitud", "error");
        }
    },
    changePage(page) {
      this.pagination.page = page;
      this.getOffering();
    },
    perPageChange(per_page) {
      this.pagination.per_page = per_page;
      this.pagination.page = 1;
      this.getOffering();
    },
    search(query){
      this.pagination.search = query;
      this.pagination.page = 1;
      this.getOffering();
    },
    openModal(){
      this.$refs.modalOffering.openModal();
    },
    openModalEdit(id){
        this.$refs.modalOffering.edit(id);
    },
  },
  async created(){
    await this.getOffering();
  }
}
</script>
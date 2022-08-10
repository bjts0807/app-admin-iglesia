<template>
    <main>
        <div class="py-4 container-fluid">
            <div class="row mb-4">
                <div class="col-lg-12 position-relative ">
                    <div class="card">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-6 text-primary">
                                    Diezmos
                                </div>
                                <div class="col-6 d-flex justify-content-end">
                                    <i class="material-icons-round text-dark fs-2">payments</i>
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
                                                {{item.member.first_name}} {{item.member.second_name}} {{item.member.first_surname}} {{item.member.second_surname}}
                                            </grid-cell>
                                            <grid-cell class="text-center ">
                                                {{$filters.cop_currency_no_decimals(item.value)}}
                                            </grid-cell>
                                            <grid-cell class="text-center   ">
                                                <div class=" ">
                                                <button @click="openModalEdit(item.id);" class="btn btn-outline-info mx-2  btn-sm" title="Editar" >
                                                    <i class="fa fa-edit fa-3x"></i>
                                                </button>
                                                <!-- <button @click="deleteMember(item.id);" class="btn btn-outline-danger  btn-sm" title="Eliminar">
                                                    <i class="fa fa-trash-alt"></i>
                                                </button> -->
                                            </div>
                                            </grid-cell>
                                        </grid-row>
                                    </template>
                                  </grid-table>
                              </template>
                              <template #action-button>
                                <router-link  class="btn btn-info btn-sm shadow-sm mb-2" type="button"  :to="{name:'tithes.create'}">
                                    Nuevo <i class="fas fa-plus fa-fw"></i>
                                </router-link>
                              </template>
                          </data-grid>
                           <modal-tithe-edit ref="modalTitheEdit" v-on:get-tithes="getTithes"></modal-tithe-edit>
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
import tithesService from "../../services/tithesService";;
import Swal from "sweetalert2";
import modalTitheEdit from "./modalTitheEdit";
export default {
  components:{
     GridCell, GridRow, GridCellHeader, GridTable, DataGrid,modalTitheEdit
  },
  data(){
    return {
        headers : [
            'Fecha',
            'Miembro',
            'Valor',
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
    async getTithes(){
        try {
            this.LoaderSpinnerShow();
            const response = (await tithesService.index(this.pagination.search, this.pagination))?.data;
            console.log(response.data);
            this.pagination.data = response.data;
            this.pagination.current_page  = response.current_page;
            this.pagination.total = response.total;
            this.LoaderSpinnerHide(); 
        }catch (e) {
            console.error(e);
            this.LoaderSpinnerHide(); 
            Swal.fire("Oops!", "ha ocurrido un error al procesar la solicitud", "error");
            /* Toast.fire({
                icon: 'error',
                title: 'Ocurrio un error al procesar la solicitud'
            }); */
        }
    },
    changePage(page) {
      this.pagination.page = page;
      this.getTithes();
    },
    perPageChange(per_page) {
      this.pagination.per_page = per_page;
      this.pagination.page = 1;
      this.getTithes();
    },
    search(query){
      this.pagination.search = query;
      this.pagination.page = 1;
      this.getTithes();
    },
    openModalEdit(id){
        this.$refs.modalTitheEdit.edit(id);
    },
  },
  async created(){
    await this.getTithes();
  }
}
</script>
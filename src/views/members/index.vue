<template>
    <main>
        <div class="py-4 container-fluid">
            <div class="row mb-4">
                <div class="col-lg-12 position-relative ">
                    <div class="card">
                        <div class="card-header">
                            Miembros
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
                                                {{item.first_name}} {{item.second_name}} {{item.first_surname}} {{item.second_surname}}
                                            </grid-cell>
                                            <grid-cell class="text-center small">
                                                {{item.document_type}} {{item.document_number}}
                                            </grid-cell>
                                            <grid-cell class="text-center ">
                                                {{item.phone}}
                                            </grid-cell>
                                             <grid-cell class="text-center ">
                                                {{item.address}}
                                            </grid-cell>
                                             <grid-cell class="text-center ">
                                                {{item.email}}
                                            </grid-cell>
                                             <grid-cell class="text-center ">
                                                27
                                            </grid-cell>
                                            <grid-cell class="text-center   ">
                                                <div class=" ">
                                                <button @click="ver(item.id);" class="btn btn-outline-success mx-2  btn-sm" title="ver nota" >
                                                    <i class="fa fa-eye fa-2x"></i>
                                                </button>
                                                <button @click="eliminarNota(item.id);" class="btn btn-outline-danger  btn-sm" title="eliminar">
                                                    <i class="fa fa-trash-alt"></i>
                                                </button>
                                                <button @click="imprimir(item.id);" class="btn btn-outline-info mx-2  btn-sm" title="imprimir">
                                                    <i class="fa fa-print fa-fw"></i>
                                                </button>
                                            </div>
                                            </grid-cell>
                                        </grid-row>
                                    </template>
                                  </grid-table>
                              </template>
                              <template #action-button>
                                <button  class="btn btn-info btn-sm shadow-sm mb-2" type="button" data-toggle="modal" @click="abrirModal()">
                                    Nuevo &nbsp;<i class="fas fa-plus"></i>
                                </button>
                              </template>
                          </data-grid>
                           <modal-member ref="modalMembers"></modal-member>
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
import membersService from "../../services/membersService";
import modalMember from "./modalMembers";

export default {
  components:{
     GridCell, GridRow, GridCellHeader, GridTable, DataGrid,modalMember
  },
  data(){
    return {
        headers : [
            'Nombre',
            'Documento',
            'Teléfono',
            'Dirección',
            'Email',
            'Edad',
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
    async getMembers(){
      try {
          const response = (await membersService.index(this.pagination.search, this.pagination))?.data;
          console.log(response.data);
          this.pagination.data = response.data;
          this.pagination.current_page  = response.current_page;
          this.pagination.total = response.total;

          
      }catch (e) {
          console.error(e);
          /* Toast.fire({
              icon: 'error',
              title: 'Ocurrio un error al procesar la solicitud'
          }); */
      }
    },
    changePage(page) {
      this.pagination.page = page;
      this.getMembers();
    },
    perPageChange(per_page) {
      this.pagination.per_page = per_page;
      this.pagination.page = 1;
      this.getMembers();
    },
    search(query){
      this.pagination.search = query;
      this.pagination.page = 1;
      this.getMembers();
    },
    abrirModal(){
      this.$refs.modalMembers.abrirModal();
    }
  },
  async created(){
    await this.getMembers();
  }
}
</script>
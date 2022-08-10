<template>
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
                        <div>
                            <div class="card-header bg-light">
                                <i class="fa fa-calculator fa-fw text-info"></i> Detalle de Diezmos
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="form-group mb-3 ">
                                            <label class="form-label"><i class="fas fa-user fa-fw"></i> Miembro</label>
                                            <VSelectMember v-model="item.member" :mode="'object'" ></VSelectMember>
                                            <div v-if="v$.item.member.$error" class="text-danger" style="font-size:14px" >
                                                <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                            </div>
                                        </div>
                                        <div class="mb-2">
                                            <label  class="form-label"><i class="fas fa-dollar-sign fa-fw"></i> Valor</label>
                                            <input type="number" class="form-field" v-model="item.value">
                                            <div v-if="v$.item.value.$error" class="text-danger" style="font-size:14px" >
                                                <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <button class="btn btn-primary mt-2" @click="addTithes();">Agregar <i class="fa fa-plus fa-fw"></i></button>
                                        </div>
                                    </div>
                                    <div class="col-lg-8">
                                        <table class="table table-sm table-striped">
                                            <thead class="table-info">
                                                <tr>
                                                <th scope="col">Miembro</th>
                                                <th scope="col">Valor</th>
                                                <th scope="col">Opciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item,index) in items" :key="item.id" >
                                                    <td>{{item.member.text}}</td>
                                                    <td>{{ $filters.cop_currency_no_decimals(item.value) }}</td> 
                                                    <td>
                                                        <button class="btn btn-outline-danger btn-sm"  @click="deleteTithes(index,item)">
                                                            <i class="fas fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                </tr>  
                                            </tbody>
                                        </table>
                                        <hr>
                                        <div class="row">
                                            <div class="col-6 text-primary">
                                                <button class="btn btn-primary" @click="save();">Guardar <i class="fa fa-save fa-fw"></i></button>
                                            </div>
                                            <div class="col-6 d-flex justify-content-end">
                                                <h3>Total : {{$filters.cop_currency_no_decimals(total) }}</h3>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import useVuelidate from '@vuelidate/core'
    import { required } from '@vuelidate/validators';
    import tithesService from "../../services/tithesService";
    import Swal from 'sweetalert2';
    import VSelectMember from "../../components/common/VSelectMembers";
    import {isEmpty} from "lodash";
    export default {
        components:{VSelectMember},
        setup: () => ({ v$: useVuelidate() }),
        data(){
            return {
                item: {
                    id:"",
                    date: "",
                    member: {},
                    value: ""
                },
                items:[],
                total:0,
            }
        },
        validations () {
            return {
                item:{ 
                    member: {required},
                    value: {required}
                },
            }
        },
        methods: {
            async addTithes() {
                if (!await this.v$.item.$validate()) return;
                if(this.item.value<=0){
                    Swal.fire("Oops!", "El valor ingresado es incorrecto", "error");
                    return;
                }
                this.total+=this.item.value;
                this.items.push({...this.item});
            },
            deleteTithes(index,item) {
                this.total-=item.value;
                this.items.splice(index, 1);
            },
            async save() {
                try {

                    if (isEmpty(this.items)) {
                        Swal.fire("Oops!","Debe agregar por lo menos un miembro con su respectivo diezmo", "warning");
                        return;
                    }

                    this.LoaderSpinnerShow();
                    
                    let tithes={
                        tithes:this.items
                    }
                    await tithesService.store(tithes);

                    this.clear();
                    
                    await this.LoaderSpinnerHide();

                    await Swal.fire('Datos Guardados con exito','', 'success');

                    this.$router.push({
                        name : 'tithes'
                    })
                   

                } catch (error) {
                    console.log(error);
                    this.LoaderSpinnerHide()
                    Swal.fire("Oops!", "ha ocurrido un error al procesar la solicitud", "error");
                }
            },
            async clear() {
                this.items = [];
            },
        }
    }
</script>
<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="modalExpense" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" modal-backdrop="false">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <i class="material-icons-round text-dark fs-3 mx-2">price_check</i>
                <h5 class="modal-title" id="exampleModalLabel"> Salidas</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="fa fa-times-circle text-danger"></i></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 mt-2 mb-2">
                        <mini-statistics-card
                        :title="{value:$filters.cop_currency_no_decimals(value_cash.total_cash) }"
                        detail="Valor actual en caja"
                        class="bg-primary text-white"
                        :icon="{
                            name: 'point_of_sale',
                            color: 'text-white',
                            background: 'info',
                        }"
                        />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-sm-12">
                        <label  class="form-label">Fecha <span class="text-danger">(*)</span></label>
                        <input type="date" class="form-field" v-model="expense.date">
                        <div v-if="v$.expense.date.$error" class="text-danger" style="font-size:14px" >
                            <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                        </div>
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-sm-12">
                        <label  class="form-label">Valor <span class="text-danger">(*)</span></label>
                        <input type="number" class="form-field" v-model="expense.value">
                         <div v-if="v$.expense.value.$error" class="text-danger" style="font-size:14px" >
                            <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                        </div>
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-sm-12">
                        <label  class="form-label">Concepto <span class="text-danger">(*)</span></label>
                        <textarea  class="form-field" v-model="expense.concept"></textarea>
                        <div v-if="v$.expense.concept.$error" class="text-danger" style="font-size:14px" >
                            <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-sm" @click="closeModal();">Cerrar <i class="fa fa-times-circle fa-fw fa-2x"></i></button>
                <button type="button" class="btn btn-info btn-sm" @click="save();">Guardar <i class="fa fa-save fa-fw"></i></button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
    import useVuelidate from '@vuelidate/core'
    import { required } from '@vuelidate/validators';
    import {Modal} from 'bootstrap';
    import expenseService from "../../services/expenseService";
    import Swal from 'sweetalert2';
    import dashboardService from "../../services/dashboardService";
    import MiniStatisticsCard from "../components/MiniStatisticsCard.vue";

    export default {
        setup: () => ({ v$: useVuelidate() }),
        components: {MiniStatisticsCard},
        data(){
            return {
                expense: {
                    id:"",
                    date: "",
                    concept: "",
                    value: ""
                },
                type: "store",
                value_cash:{}
            }
        },
        validations () {
            return {
                expense:{ 
                    date: {required},
                    value: {required},
                    concept: {required},
                },
            }
        },
        methods: {
            openModal(){
                this.modalShow();
            },
            async save() {
                try {

                    if (!await this.v$.expense.$validate()) return;

                    if(this.expense.value>this.value_cash.total_cash){
                        Swal.fire("Oops!", "El valor a retirar excede la capacidad de la caja", "error");
                        return;
                    }

                    if(this.expense.value<=0){
                        Swal.fire("Oops!", "El valor a retirar es incorrecto", "error");
                        return;
                    }
                      
                    this.LoaderSpinnerShow();

                    if (this.type === "store") {
                        await expenseService.store(this.expense);
                        this.type = "store";
                        this.clear();
                    } else if (this.type === "edit") {
                        await expenseService.update(this.expense);
                        this.clear();
                        this.type = "store";
                    }
                
                    await this.LoaderSpinnerHide();

                    await Swal.fire('Datos Guardados con exito','', 'success');

                    this.$emit("get-expense");

                    this.modalHide();

                } catch (error) {
                    console.log(error);
                    this.LoaderSpinnerHide()
                    Swal.fire("Oops!", "ha ocurrido un error al procesar la solicitud", "error");
                   
                }
            },
            modalShow(){
                var myModal = new Modal(document.getElementById('modalExpense'));
                myModal.show();
                
            },
            modalHide(){
                let myModal = document.getElementById('modalExpense');
                let m = Modal.getInstance(myModal)
                m.hide();
            },
            async clear() {
                this.expense.id = "";
                this.expense.date = "";
                this.expense.value = "";
                this.expense.concept = "";
            },
            closeModal() {
                this.type = "store";
                this.clear();
                this.modalHide();
            },
            async edit(id) {
                
                this.$nextTick(async () => {
                    this.LoaderSpinnerShow();
                    this.type = "edit";
                    this.modalShow();
                    const response = await expenseService.show(id);
                    this.expense.id = response.data.id;
                    this.expense.date = response.data.date;
                    this.expense.value = response.data.value;
                    this.expense.concept = response.data.concept;
                    this.LoaderSpinnerHide();
                });
                
            },
            async getValueCash(){
                const response=await dashboardService.getValueCash();
                this.value_cash=response.data;
            }
        },
        async created() {
            await this.getValueCash();
        }
    }
</script>
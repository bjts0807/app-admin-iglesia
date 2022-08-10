<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="modalOffering" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" modal-backdrop="false">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                 <i class="material-icons-round text-dark fs-3 mx-2">paid</i>
                <h5 class="modal-title" id="exampleModalLabel"> Ofrendas</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="fa fa-times-circle text-danger"></i></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="mb-3 col-lg-12 col-md-12 col-sm-12">
                        <label  class="form-label">Fecha <span class="text-danger">(*)</span></label>
                        <input type="date" class="form-field" v-model="offering.date">
                        <div v-if="v$.offering.date.$error" class="text-danger" style="font-size:14px" >
                            <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                        </div>
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-sm-12">
                        <label  class="form-label">Valor <span class="text-danger">(*)</span></label>
                        <input type="number" class="form-field" v-model="offering.value">
                         <div v-if="v$.offering.value.$error" class="text-danger" style="font-size:14px" >
                            <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                        </div>
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-sm-12">
                        <label  class="form-label">Descripción <span class="text-body">(Opcional)</span></label>
                        <textarea  class="form-field" v-model="offering.description"></textarea>
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
    import offeringService from "../../services/offeringService";
    import Swal from 'sweetalert2';

    export default {
        setup: () => ({ v$: useVuelidate() }),
        data(){
            return {
                offering: {
                    id:"",
                    date: "",
                    description: "",
                    value: ""
                },
                type: "store",
            }
        },
        validations () {
            return {
                offering:{ 
                    date: {required},
                    value: {required},
                },
            }
        },
        methods: {
            openModal(){
                this.modalShow();
            },
            async save() {
                try {

                    if (!await this.v$.offering.$validate()) return;
                    if(this.offering.value<=0){
                        Swal.fire("Oops!", "El valor ingresado es incorrecto", "error");
                        return;
                    }
                    this.LoaderSpinnerShow();

                    if (this.type === "store") {
                        await offeringService.store(this.offering);
                        this.type = "store";
                        this.clear();
                    } else if (this.type === "edit") {
                        await offeringService.update(this.offering);
                        this.clear();
                        this.type = "store";
                    }
                
                    await this.LoaderSpinnerHide();

                    await Swal.fire('Datos Guardados con exito','', 'success');

                    this.$emit("get-offering");

                    this.modalHide();

                } catch (error) {
                    console.log(error);
                    this.LoaderSpinnerHide()
                    Swal.fire("Oops!", "ha ocurrido un error al procesar la solicitud", "error");
                   
                }
            },
            modalShow(){
                var myModal = new Modal(document.getElementById('modalOffering'));
                myModal.show();
                
            },
            modalHide(){
                let myModal = document.getElementById('modalOffering');
                let m = Modal.getInstance(myModal)
                m.hide();
            },
            async clear() {
                this.offering.id = "";
                this.offering.date = "";
                this.offering.value = "";
                this.offering.description = "";
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
                    const response = await offeringService.show(id);
                    this.offering.id = response.data.id;
                    this.offering.date = response.data.date;
                    this.offering.value = response.data.value;
                    this.offering.description = response.data.description;
                    this.LoaderSpinnerHide();
                });
                
            },
        }
    }
</script>
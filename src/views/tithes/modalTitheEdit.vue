<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="modalTitheEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" modal-backdrop="false">
        <div class="modal-dialog ">
            <div class="modal-content">
            <div class="modal-header">
                <img src="@/assets/img/img-general/members.png" alt="" width="64" class="mx-2">
                <h5 class="modal-title" id="exampleModalLabel"> Diezmo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="fa fa-times-circle text-danger"></i></button>
            </div>
            <div class="modal-body ">
                <div class="row">
                    <div class="mb-3 col-lg-12 col-md-6 col-sm-12">
                        <label  class="form-label"><i class="fa fa-user fa-fw"></i> Miembro: 
                            <span class="text-danger">
                                {{tithe.member.first_name}} {{tithe.member.second_name}} 
                                {{tithe.member.first_surname}} {{tithe.member.second_surname}}
                            </span>
                        </label>
                    </div>
                    <div class="mb-3 col-lg-12 col-md-6 col-sm-12">
                        <label  class="form-label"><i class="fa fa-dollar-sign fa-fw"></i>Valor</label>
                        <input type="text" class="form-field" v-model="tithe.value">
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
    import tithesService from "../../services/tithesService";
    import Swal from 'sweetalert2';

    export default {
        setup: () => ({ v$: useVuelidate() }),
        data(){
            return {
                tithe: {
                    id:"",
                    member_id: "",
                    value: "",
                    member:{}
                },
            }
        },
        validations () {
            return {
                tithe:{ 
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

                    if (!await this.v$.tithe.$validate()) return;

                    this.LoaderSpinnerShow();

                    await tithesService.update(this.tithe);

                    this.clear();
                
                    await this.LoaderSpinnerHide();

                    await Swal.fire('Datos Guardados con exito','', 'success');

                    this.$emit("get-tithes");

                    this.modalHide();

                } catch (error) {
                    console.log(error);
                    this.LoaderSpinnerHide()
                    Swal.fire("Ups!", "ha ocurrido un error al procesar la solicitud", "error");
                   
                }
            },
            modalShow(){
                var myModal = new Modal(document.getElementById('modalTitheEdit'));
                myModal.show();
                
            },
            modalHide(){
                let myModal = document.getElementById('modalTitheEdit');
                let m = Modal.getInstance(myModal)
                m.hide();
            },
            async clear() {
                this.tithe.id = "";
                this.tithe.value = "";
            },
            closeModal() {
                this.clear();
                this.modalHide();
            },
            async edit(id) {
                
                this.$nextTick(async () => {
                    this.LoaderSpinnerShow();
                    this.modalShow();
                    const response = await tithesService.show(id);
                    this.tithe.id = response.data.id;
                    this.tithe.value = response.data.value;
                    this.tithe.member = response.data.member;
                    this.tithe.member_id = response.data.member_id;
                    this.LoaderSpinnerHide();
                });
                
            },
        }
    }
</script>
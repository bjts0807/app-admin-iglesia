<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="modalMembers" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" modal-backdrop="false">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Miembros</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="fa fa-times-circle text-danger"></i></button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="card-header bg-light"><i class="fa fa-user fa-fw text-info"></i> Información Básica</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Primer Nombre <span class="text-danger">(*)</span></label>
                                <input type="text" class="form-field" v-model="member.first_name">
                                <div v-if="v$.member.first_name.$error" class="text-danger" style="font-size:14px" >
                                    <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                </div>
                            </div>
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Segundo Nombre</label>
                                <input type="text" class="form-field" >
                            </div>
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Primer Apellido</label>
                                <input type="text" class="form-field" >
                            </div>
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Segundo Apellido</label>
                                <input type="text" class="form-field" >
                            </div>
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Tipo Doc <span class="text-danger">(*)</span></label>
                                <select class="form-select2" v-model="member.document_type">
                                    <option value="">---Seleccione un valor---</option>
                                    <option value="CC">CC</option>
                                    <option value="TI">TI</option>
                                    <option value="RC">RC</option>
                                </select>
                                <div v-if="v$.member.document_type.$error" class="text-danger" style="font-size:14px" >
                                    <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                </div>
                            </div>
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">No. Doc <span class="text-danger">(*)</span></label>
                                <input type="number" class="form-field" v-model="member.document_number">
                                <div v-if="v$.member.document_number.$error" class="text-danger" style="font-size:14px" >
                                    <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                </div>
                            </div>
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Fecha de Nacimiento <span class="text-danger">(*)</span></label>
                                <input type="date" class="form-field" v-model="member.birthday">
                                <div v-if="v$.member.birthday.$error" class="text-danger" style="font-size:14px" >
                                    <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                </div>
                            </div>
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Miembro Activo <span class="text-danger">(*)</span></label>
                                <select class="form-select2" v-model="member.active_member">
                                    <option value="">---Seleccione un valor---</option>
                                    <option value="S">SI</option>
                                    <option value="N">NO</option>
                                </select>
                                <div v-if="v$.member.active_member.$error" class="text-danger" style="font-size:14px" >
                                    <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="card-header bg-light"><i class="fa fa-user fa-fw text-info"></i> Datos de Contacto</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Teléfono </label>
                                <input type="text" class="form-field" >
                            </div>
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Dirección</label>
                                <input type="text" class="form-field" >
                            </div>
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Email</label>
                                <input type="email" class="form-field" >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cerrar <i class="fa fa-times-circle fa-fw fa-2x"></i></button>
                <button type="button" class="btn btn-info btn-sm" @click="guardar();">Guardar <i class="fa fa-save fa-fw"></i></button>
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
    import membersService from "../../services/membersService";
    import Swal from 'sweetalert2';

    export default {
        setup: () => ({ v$: useVuelidate() }),
        data(){
            return {
                member: {
                    first_name: "",
                    second_name: "",
                    first_surname: "",
                    second_surname: "",
                    document_type: "",
                    document_number: "",
                    phone: "",
                    address: "",
                    birthday: "",
                    active_member: "",
                    email: "",
                }
            }
        },
         validations () {
                return {
                    member:{ 
                        first_name: {required},
                        document_type: {required},
                        document_number: {required},
                        birthday: {required},
                        active_member: {required},
                    },
                }
        },
        methods: {
            abrirModal(){
                this.modalShow();
            },
            async guardar() {
                console.log('hola');
                try {
                        
                        
                        /* if (!this.v$.$validate()) {
                            return;
                        } */
                         if (!await this.v$.member.$validate()) return;
                            await membersService.store(this.member);
                            Swal.fire('Datos Guardados con exito','', 'success');
                        
                        
                        
                        
                        
                        

                       
                        
                        //this.LoaderSpinnerHide();

                        /* Toast.fire({
                            icon: 'success',
                            title: 'Datos guardados con exito'
                        }); */
                    } catch (error) {
                        console.log(error);
                         Swal.fire("Ups!", "ha ocurrido un error al procesar la solicitud", "error");
                    /* this.LoaderSpinnerHide();
                        Toast.fire({
                            icon: 'error',
                            title: 'Ocurrio un error al procesar la solicitud'
                        }); */
                }
            },
            modalShow(){
                var myModal = new Modal(document.getElementById('modalMembers'));
                myModal.show();
                
            },
            modalHide(){
                let myModal = document.getElementById('modalMembers');
                let m = Modal.getInstance(myModal)
                m.hide();
            },
        }
    }
</script>
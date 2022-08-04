<template>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="modalMembers" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" modal-backdrop="false">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <img src="@/assets/img/img-general/members.png" alt="" width="64" class="mx-2">
                <h5 class="modal-title" id="exampleModalLabel"> Miembros</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="fa fa-times-circle text-danger"></i></button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="card-header bg-light"><i class="fa fa-address-book fa-fw text-info"></i> Información Básica</div>
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
                                <input type="text" class="form-field" v-model="member.second_name">
                            </div>
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Primer Apellido</label>
                                <input type="text" class="form-field" v-model="member.first_surname">
                            </div>
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Segundo Apellido</label>
                                <input type="text" class="form-field" v-model="member.second_surname">
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
                    <div class="card-header bg-light"><i class="fas fa-address-card fa-fw text-info"></i> Datos de Contacto</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Teléfono </label>
                                <input type="text" class="form-field" v-model="member.phone">
                            </div>
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Dirección</label>
                                <input type="text" class="form-field" v-model="member.address">
                            </div>
                            <div class="mb-3 col-lg-4 col-md-6 col-sm-12">
                                <label  class="form-label">Email</label>
                                <input type="email" class="form-field" v-model="member.email">
                            </div>
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
    import membersService from "../../services/membersService";
    import Swal from 'sweetalert2';

    export default {
        setup: () => ({ v$: useVuelidate() }),
        data(){
            return {
                member: {
                    id:"",
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
                },
                type: "store",
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
            openModal(){
                this.modalShow();
            },
            async save() {
                try {

                    if (!await this.v$.member.$validate()) return;

                    this.LoaderSpinnerShow();

                    if (this.type === "store") {
                        await membersService.store(this.member);
                        this.type = "store";
                        this.clear();
                    } else if (this.type === "edit") {
                        await membersService.update(this.member);
                        this.clear();
                        this.type = "store";
                    }
                
                    await this.LoaderSpinnerHide();

                    await Swal.fire('Datos Guardados con exito','', 'success');

                    this.$emit("get-members");

                    this.modalHide();

                } catch (error) {
                    console.log(error);
                    this.LoaderSpinnerHide()
                    Swal.fire("Ups!", "ha ocurrido un error al procesar la solicitud", "error");
                   
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
            async clear() {
                this.member.id = "";
                this.member.first_name = "";
                this.member.second_name = "";
                this.member.first_surname = "";
                this.member.second_surname = "";
                this.member.document_type = "";
                this.member.document_number = "";
                this.member.email = "";
                this.member.address = "";
                this.member.phone = "";
                this.member.birthday = "";
                this.member.active_member = "";
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
                    const response = await membersService.show(id);
                    this.member.id = response.data.id;
                    this.member.first_name = response.data.first_name;
                    this.member.second_name = response.data.second_name;
                    this.member.first_surname = response.data.first_surname;
                    this.member.second_surname = response.data.second_surname;
                    this.member.document_type = response.data.document_type;
                    this.member.document_number = response.data.document_number;
                    this.member.email = response.data.email;
                    this.member.phone = response.data.phone;
                    this.member.address = response.data.address;
                    this.member.birthday = response.data.birthday;
                    this.member.active_member = response.data.active_member;
                    this.LoaderSpinnerHide();
                });
                
            },
        }
    }
</script>
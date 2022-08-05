<template>
  <main>
    <navbar btnBackground="bg-gradient-success" />
  <div
    class="page-header align-items-start min-vh-100"
    style="
      background: rgb(15,118,255);
      background: linear-gradient(90deg, rgba(15,118,255,1) 0%, rgba(39,127,244,1) 35%, rgba(68,145,240,1) 100%);
    "
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container my-auto">
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12 mx-auto">
          <div class="card z-index-0 fadeIn3 fadeInBottom">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div
                class="bg-gradient-info shadow-info border-radius-lg py-3 pe-1"
              >
                <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                  Iniciar sesión
                </h4>
                <div class="row mt-3">
                  <div class="col-12 text-center ms-auto">
                   <img src="@/assets/img/img-general/login.png" alt="" width="100">
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form role="form" class="text-start mt-3">
                <div class="form-group" v-if="has_error">
                  <div class="alert alert-danger alert-dismissible fade show w-100 d-block" role="alert">
                    <i class="fas fa-exclamation-triangle fa-fw"></i>
                    <div v-text="message"></div>
                  </div>
                </div>

                <div class="mb-3 form-group">  
                  <input class="form-field" type="text" v-model="form.email"/>
                </div>
                <!-- <div v-if="!$v.form.email.required" class="invalid-feedback">
                  Por favor ingrese su e-mail
                </div> -->
                <div v-if="v$.form.email.$error" class="text-danger" style="font-size:14px" >
                  <i class="fa fa-warning fa-fw"></i> Por favor ingrese su e-mail.
                </div>
                
                
                <div class="mb-3 form-group">
                  <input class="form-field" type="password" v-model="form.password"/>
                </div>
                 <div v-if="v$.form.password.$error" class="text-danger" style="font-size:14px" >
                  <i class="fa fa-warning fa-fw"></i> Por favor ingrese su contraseña.
                </div>
                <!-- <material-switch id="rememberMe" name="rememberMe"
                  >Remember me</material-switch
                > -->
                <div class="text-center">
                  <button class="mt-4 btn btn-info"
                    variant="gradient"
                    color="success"
                    fullWidth
                    size="lg"
                    @click.prevent="login()">Acceder <i class="fa fa-sign-in fa-fw"></i>
                  </button>
                </div>
                <!-- <p class="mt-4 text-sm text-center">
                  Don't have an account?
                  <router-link
                    :to="{ name: 'SignUp' }"
                    class="text-success text-gradient font-weight-bold"
                    >Sign up</router-link
                  >
                </p> -->
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer position-absolute bottom-2 py-2 w-100">
      <div class="container">
        <div class="row align-items-center justify-content-lg-between">
          <div class="col-12 col-md-6 my-auto">
            <div class="copyright text-center text-sm text-white text-lg-start">
              © {{ new Date().getFullYear() }}, powered
              <i class="fa fa-heart" aria-hidden="true"></i> by
              <a
                href=""
                class="font-weight-bold text-white"
                target="_blank"
                >Brayan Torres</a
              >
            </div>
          </div>
          <div class="col-12 col-md-6">
            <ul
              class="nav nav-footer justify-content-center justify-content-lg-end"
            >
              <li class="nav-item">
                <a
                  href=""
                  class="nav-link text-white"
                  target="_blank"
                  >Iglesia Dios con Nosotros v 1.0</a
                >
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
  </main>
</template>

<script>
//import Navbar from "@/examples/PageLayout/Navbar.vue";
//import MaterialSwitch from "@/components/MaterialSwitch.vue";
import { mapMutations } from "vuex";
import useVuelidate from '@vuelidate/core'
import { required ,email} from '@vuelidate/validators';
export default {
  name: "signin",
   setup: () => ({ v$: useVuelidate() }),
  data (){
    return {
      form: {
          email: "",
          password: "",
      },
      has_error : false,
      message : "",
    }
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  validations(){
    return {
      form: {
          email: { required, email },
          password: { required },
      }
    }
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    async login() {
        try{

          if (!await this.v$.form.$validate()) return;

          this.LoaderSpinnerShow();

          await this.$store.dispatch("login", this.form);
          this.LoaderSpinnerHide();
        }catch(error){
            this.LoaderSpinnerHide();
            switch(error.response.status){
                case 422:
                    this.has_error = true;
                    this.message = "Usuario o contraseña incorrectos";
                    break;
                 case 401:
                        this.has_error = true;
                        this.message = "Usuario o contraseña incorrectos";
                break;
                default :
                    this.has_error = true;
                    this.message = "Ha ocurrido un error, por favor intente nuevamente";
                break;
            }
        }
    }
  },
};
</script>
<style scoped>

  .form-field {
    display: block;
    width: 100%;
    padding: 8px 16px;
    line-height: 25px;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    border-radius: 6px;
    -webkit-appearance: none;
    color: #99A3BA;
    border: 1px solid #CDD9ED;
    background: #EEF4FF;
    transition: border .3s ease;
    &::placeholder {
        color: #CBD1DC;
    }
    &:focus {
        outline: none;
        border-color: #275EFE;
    }
  }

  .form-group {
    position: relative;
    display: flex;
    width: 100%;
    & > span,
    .form-field {
        white-space: nowrap;
        display: block;
        &:not(:first-child):not(:last-child) {
            border-radius: 0;
        }
        &:first-child {
            border-radius: 6px 0 0 6px;
        }
        &:last-child {
            border-radius: 0 6px 6px 0;
        }
        &:not(:first-child) {
            margin-left: -1px;
        }
    }
    .form-field {
        position: relative;
        z-index: 1;
        flex: 1 1 auto;
        width: 1%;
        margin-top: 0;
        margin-bottom: 0;
    }
    & > span {
        text-align: center;
        padding: 8px 12px;
        font-size: 14px;
        line-height: 25px;
        color: #99A3BA;
        background: #EEF4FF;
        border: 1px solid #CDD9ED;
        transition: background .3s ease, border .3s ease, color .3s ease;
    }
    &:focus-within {
        & > span {
            color: #fff;
            background: #678EFE;
            border-color: #275EFE;
        }
    }
  }
</style>

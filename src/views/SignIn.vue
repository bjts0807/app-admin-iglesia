<template>
  <navbar btnBackground="bg-gradient-success" />
  <div
    class="page-header align-items-start min-vh-100"
    style="
      background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');
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
                  <div class="col-2 text-center ms-auto">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-facebook text-white text-lg"></i>
                    </a>
                  </div>
                  <div class="col-2 text-center px-1">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-github text-white text-lg"></i>
                    </a>
                  </div>
                  <div class="col-2 text-center me-auto">
                    <a class="btn btn-link px-3" href="javascript:;">
                      <i class="fab fa-google text-white text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form role="form" class="text-start mt-3">
                <div class="form-group" v-if="has_error">
                  <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div v-text="message">                         
                    </div>
                  </div>
                </div>
                 <div class="mb-3 form-group">
                     
                  <input class="form-field" type="text" v-model="form.email"/>
                </div>
                    <div class="mb-3 form-group">
                     
                    <input class="form-field" type="password" v-model="form.password"/>
                    </div>
                <material-switch id="rememberMe" name="rememberMe"
                  >Remember me</material-switch
                >
                
                <div class="text-center">
                  <button class="mt-4 btn btn-info"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        @click.prevent="login()">Acceder</button>
                </div>
                <p class="mt-4 text-sm text-center">
                  Don't have an account?
                  <router-link
                    :to="{ name: 'SignUp' }"
                    class="text-success text-gradient font-weight-bold"
                    >Sign up</router-link
                  >
                </p>
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
              © {{ new Date().getFullYear() }}, made with
              <i class="fa fa-heart" aria-hidden="true"></i> by
              <a
                href="https://www.creative-tim.com"
                class="font-weight-bold text-white"
                target="_blank"
                >Creative Tim</a
              >
              for a better web.
            </div>
          </div>
          <div class="col-12 col-md-6">
            <ul
              class="nav nav-footer justify-content-center justify-content-lg-end"
            >
              <li class="nav-item">
                <a
                  href="https://www.creative-tim.com"
                  class="nav-link text-white"
                  target="_blank"
                  >Creative Tim</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="https://www.creative-tim.com/presentation"
                  class="nav-link text-white"
                  target="_blank"
                  >About Us</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="https://www.creative-tim.com/blog"
                  class="nav-link text-white"
                  target="_blank"
                  >Blog</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="https://www.creative-tim.com/license"
                  class="nav-link pe-0 text-white"
                  target="_blank"
                  >License</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
//import Navbar from "@/examples/PageLayout/Navbar.vue";
import MaterialSwitch from "@/components/MaterialSwitch.vue";
import { mapMutations } from "vuex";
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: "signin",
  components: {
    //Navbar,
    MaterialSwitch,
  },
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
  validations:{
      form: {
          email: { required, email },
          password: { required },
      }
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    async login() {
        try{   
          await this.$store.dispatch("login", this.form);
        }catch(error){
            //this.LoaderSpinnerHide();
            switch(error.response.status){
                case 422:
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

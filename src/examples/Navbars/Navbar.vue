<template>
  <nav
    class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
    :class="isAbsolute ? 'mt-4' : 'mt-0'"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :currentPage="currentRouteName" :color="color" />
      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="isRTL ? 'px-0' : 'me-sm-4'"
        id="navbar"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="isRTL ? 'me-md-auto' : 'ms-md-auto'"
        >
        
        </div>
        <ul class="navbar-nav justify-content-end">
          <!-- <li class="nav-item d-flex align-items-center">
            <router-link
              :to="{ name: 'signin' }"
              class="px-0 nav-link font-weight-bold lh-1"
              :class="color ? color : 'text-body'"
            >
              <i class="material-icons" :class="isRTL ? 'ms-sm-2' : 'me-sm-1'">
                account_circle
              </i>
            </router-link>
          </li> -->
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              href="#"
              @click="toggleSidebar"
              class="p-0 nav-link text-body lh-1"
              id="iconNavbarSidenav"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li> 
          <!-- <li class="px-3 nav-item d-flex align-items-center">
            <a
              class="p-0 nav-link lh-1"
              @click="toggleConfigurator"
              :class="color ? color : 'text-body'"
            >
              <i class="material-icons fixed-plugin-button-nav cursor-pointer">
                settings
              </i>
            </a>
          </li> -->
          <li
            class="nav-item dropdown d-flex align-items-center"
            :class="isRTL ? 'ps-2' : 'pe-2'"
          >
            <a
              href="#"
              class="p-0 nav-link lh-1"
              :class="[color ? color : 'text-body', showMenu ? 'show' : '']"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="showMenu = !showMenu"
            >
              <i class="material-icons cursor-pointer text-info fs-3"> account_circle </i>
            </a>
            <ul
              class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4"
              :class="showMenu ? 'show' : ''"
              aria-labelledby="dropdownMenuButton"
            >
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="my-auto">
                      <i class="fa fa-user-circle avatar avatar-sm bg-gradient-dark me-3 text-white"></i> 
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <span class="font-weight-bold" v-if="this.$store.state.user">{{this.$store.state.user.name}}</span> 
                      </h6>
                      <p class="mb-0 text-xs text-secondary" v-if="this.$store.state.user">
                        <i class="fas fa-envelope me-1 text-info"></i>
                        {{this.$store.state.user.email}}
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="my-auto">
                      <i class="fa fa-user avatar avatar-sm bg-gradient-dark me-3 text-white"></i> 
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <span class="font-weight-bold">Perfil</span> 
                      </h6>
                    </div>
                  </div>
                </a>
              </li>
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" @click="logout()">
                  <div class="py-1 d-flex">
                    <div class="my-auto">
                      <i class="fa fa-sign-out avatar avatar-sm bg-gradient-dark me-3 text-white"></i> 
                     
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        Salir 
                      </h6>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>

import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapState } from "vuex";
import {useStore} from 'vuex';
import Swal from "sweetalert2";

export default {
  name: "navbar",
   setup (){
    const store = useStore();
    const logout = async () => {
      try{
        const result = await Swal.fire({
          title :  "¿Está seguro de finalizar la Sesión ?",
          text : "",
          showCancelButton : true,
          showConfirmButton : true,
          confirmButtonColor: "#1a73e8",
          confirmButtonText : 'Sí, finalizar',
          cancelButtonText : 'No',
          icon : "warning",
          showLoaderOnConfirm : true,
          preConfirm: async () => {
            try{
             await store.dispatch('logout')
            }catch (e) {
              console.error(e);
              Swal.showValidationMessage('ha ocurrido un error al procesar la solicitud');
            }

          },
        });

        if(result.isConfirmed){
          Swal.fire('Exíto', 'Sesión finalizada con exíto', 'success');
          
        }
        
        
      }catch (e) {
        console.error(e);
      }
    }

    return {
      logout
    }
  },
  data() {
    return {
      showMenu: false,
    };
  },
  props: ["minNav", "color"],
  created() {
    this.minNav;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),

    toggleSidebar() {
      this.navbarMinimize();
    },
  },
  components: {
    Breadcrumbs,
  },
  computed: {
    ...mapState(["isRTL", "isAbsolute","is_logged", 'user']),

    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

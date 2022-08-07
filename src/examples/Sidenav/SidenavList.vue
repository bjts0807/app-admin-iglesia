<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          :to="{name:'Dashboard'}"
          navText="Inicio"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">dashboard</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          :to="{name:'members'}"
          :aria-controls="''"
          v-bind:collapse="false"
          navText="Miembros"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">group</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          :to="{name:'tithes'}"
          :aria-controls="''"
          v-bind:collapse="false"
          navText="Diezmos"

        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">payments</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          :to="{name:'offerings'}"
          :aria-controls="''"
          v-bind:collapse="false"
          navText="Ofrendas"

        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">paid</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          :to="{name:'expenses'}"
          :aria-controls="''"
          v-bind:collapse="false"
          navText="Salidas"

        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">price_check</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          :to="{name:'cash'}"
          :aria-controls="''"
          v-bind:collapse="false"
          navText="Caja"

        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">point_of_sale</i>
          </template>
        </sidenav-collapse>
      </li>
      <!-- <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder text-white"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          ACCOUNT PAGES
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="profile"
          navText="Profile"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">person</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="sign-in"
          navText="SignIn"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">login</i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="sign-up"
          navText="SignUp"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">assignment</i>
          </template>
        </sidenav-collapse>
      </li> -->
    </ul>
    <div class="sidenav-footer position-absolute w-100 bottom-0">
      <div class="mx-3">
        <a
          class="btn mt-4 w-100"
          :class="`bg-gradient-${this.$store.state.color}`"
          @click="logout()"
          >Salir <i class="fa fa-sign-out"></i> </a
        >
      </div>
    </div>
  </div>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
import {useStore} from 'vuex';
import Swal from "sweetalert2";
export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  setup (){
    const store = useStore();
    const logout = async () => {
      try{
        const result = await Swal.fire({
          title :  "¿Está seguro de finalizar la Sesión ?",
          text : "",
          showCancelButton : true,
          showConfirmButton : true,
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
      title: "Dios con Nosotros",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavCollapse
  }
};
</script>

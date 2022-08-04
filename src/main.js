import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import MaterialDashboard from "./material-dashboard";
import Loading from "vue-loading-overlay";
import momentjsMixin from "./mixins/momentjs-mixin";
import moment from "moment";
 
const appInstance = createApp(App);

appInstance.use(store);
appInstance.use(router);
appInstance.use(MaterialDashboard);
appInstance.mount("#app");
appInstance.use(Loading);
appInstance.mixin(momentjsMixin);


appInstance.config.globalProperties.$filters = {
    cop_currency(value) {
        return new Intl.NumberFormat("ES-co", { style: "currency", currency: "COP" }).format(value);
    },

    cop_currency_no_decimals(value){
        return new Intl.NumberFormat("Es-co", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(value);
    },

    formatDate(value) {
        if (value) {
            return moment(String(value)).format('YYYY/MM/DD');
        }
    },
    
    formatDateTime(value) {
        if (value) {
            return moment(String(value)).format('YYYY/MM/DD hh:mm A');
        }
    },
    
    time(value) {
        if (value) {
            return moment(String(value)).format('hh:mm A');
        }
    },
    
    pad_left(value) {
        return value.toString().padStart(3, '0');
    },
    
    truncate(value) {
        return Number(value).toFixed(2);
    }
}
appInstance.mixin({
    methods: {
        LoaderSpinnerShow: function() {
            this.$options.loader = this.$loading.show({ color: '#0055ff', container: null });
        },
        LoaderSpinnerHide: function() {

            this.$options.loader.hide();
        }
    }
});




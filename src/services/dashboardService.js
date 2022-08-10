import Service from "./Service";
const baseurl = '/api/dashboard';
export default {
    
    getValueCash() {
        return Service.get(`${baseurl}/getValueCash`);
    },
    
    dashboardCount(){
        return Service.get(`${baseurl}/dashboardCount`);
    }
}
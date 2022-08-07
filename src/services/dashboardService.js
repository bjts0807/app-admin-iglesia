import Service from "./Service";
const baseurl = '/api/dashboard';
export default {
    
    getCash() {
        return Service.get(`${baseurl}/getCash`);
    },
    
    dashboardCount(){
        return Service.get(`${baseurl}/dashboardCount`);
    }
}
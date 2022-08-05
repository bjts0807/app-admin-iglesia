import Service from "./Service";
const baseurl = '/api/cash';
export default {
    
    getCash() {
        return Service.get(`${baseurl}/getCash`);
    },
    
}
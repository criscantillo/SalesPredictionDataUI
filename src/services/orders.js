import service from './service.js'

const endPoint = 'order';

export default {
    get(){
        return service.get(endPoint);
    },

    getPrediction(customerName){
        customerName = (customerName == '')?'all':customerName;
        return service.get(`${endPoint}/${customerName}/1`);
    },

    getByCustomerId(customerId){
        return service.get(`${endPoint}/${customerId}`);
    },

    create(order){
        return service.post(endPoint, order);
    }
}
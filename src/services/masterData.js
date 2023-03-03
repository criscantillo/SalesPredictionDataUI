import service from './service.js'

const endPointEmployee = 'employee';
const endPointProduct = 'product';
const endPointShipper = 'shipper';

export default {
    getEmployees(){
        return service.get(endPointEmployee);
    },

    getProducts(){
        return service.get(endPointProduct);
    },

    getShippers(){
        return service.get(endPointShipper);
    }
}
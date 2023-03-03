<template>
    <v-container>
        <v-card>
            <v-data-table
                :headers="headers"
                :items="data"
                :items-per-page="10"
                class="elevation-1"
                :loading="loadingData"
                loading-text="Loading... Please wait"
            >
        
            <template v-slot:[`item.requireddate`]="{ item }">
                {{ item.requireddate | dateFormat }}
            </template>

            <template v-slot:[`item.shippeddate`]="{ item }">
                {{ item.shippeddate | dateFormat }}
            </template>
        
            </v-data-table>
        </v-card>
    </v-container>
  </template>
  
<script>
import orderService from "@/services/orders";
import moment from 'moment';

export default {
    name: 'customer-order-detial',
    data: () => ({
        loadingData: false,
        headers: [
            { text: 'Order ID',value: 'orderid',},  
            { text: 'Required Date',value: 'requireddate',},
            { text: 'Shipped Date', value: 'shippeddate' },
            { text: 'Ship Name', value: 'shipname' },
            { text: 'Ship Address', value: 'shipaddress' },
            { text: 'Ship City', value: 'shipcity' }
        ],
        data:[]
    }),

    filters:{
        dateFormat(value){
            let formatDate = moment(value, 'yyyy-MM-DD').format('M/D/yyyy, h:mm:ss A');
            return formatDate;
        }
    },

    methods:{
        async getOrderCustomerData(customerId){
            this.loadingData = true;

            try{
                let res = await orderService.getByCustomerId(customerId);
                this.data = res.data;
            }catch(err){
                console.error(err);
            }finally{
                this.loadingData = false;
            }
        },
    }
}
</script>

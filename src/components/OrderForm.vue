<template>
    <v-container>
        <v-form ref="form" 
            v-model="formValid"
            lazy-validation
            v-on:submit.prevent>

            <v-row>
                <v-col cols="12">
                    <h2 style="color:black;" @click="runTestData">Order</h2>
                </v-col>
                <v-col cols="12" md="12" lg="6" >
                    <v-select
                        v-model="orderData.empid"
                        :items="employees"
                        item-text="fullName"
                        item-value="empid"
                        label="Employee*"
                        required
                        no-data-text="No data"
                        :rules="[emptyFiled]"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="12" lg="6" >
                    <v-select
                        v-model="orderData.shipperid"
                        :items="shippers"
                        item-text="companyname"
                        item-value="shipperid"
                        label="Shipper*"
                        required
                        no-data-text="No data"
                        :rules="[emptyFiled]"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="12" lg="12" >
                    <v-text-field
                        v-model="orderData.shipname"
                        label="Ship Name*"
                        required
                        :rules="[emptyFiled]"
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="4" lg="4" >
                    <v-text-field
                        v-model="orderData.shipaddress"
                        label="Ship Address*"
                        required
                        :rules="[emptyFiled]"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" lg="4" >
                    <v-text-field
                        v-model="orderData.shipcity"
                        label="Ship City*"
                        required
                        :rules="[emptyFiled]"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" lg="4" >
                    <v-text-field
                        v-model="orderData.shipcountry"
                        label="Ship Country*"
                        required
                        :rules="[emptyFiled]"
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="4" lg="4" >
                    <v-menu
                        v-model="m1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="orderData.orderDate"
                                label="Order Date*"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :rules="[emptyFiled]"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="orderData.orderDate"
                            @input="m1 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="4" lg="4" >
                    <v-menu
                        v-model="m2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="orderData.requireddate"
                                label="Required Date*"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :rules="[emptyFiled]"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="orderData.requireddate"
                            @input="m2 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="4" lg="4" >
                    <v-menu
                        v-model="m3"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="orderData.shippeddate"
                                label="Shipped Date*"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :rules="[emptyFiled]"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="orderData.shippeddate"
                            @input="m3 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col cols="12" md="12" lg="12" >
                    <v-text-field
                        v-model="orderData.freight"
                        label="$ Freight*"
                        required
                        type="number"
                        :rules="[emptyFiled, validNumber]"
                    ></v-text-field>
                </v-col>

                <v-divider></v-divider>

                <v-col cols="12">
                    <h2 style="color:black;">Order Detials</h2>
                </v-col>
                <v-col cols="12" md="12" lg="12" >
                    <v-select
                        v-model="orderData.orderDetails[0].productid"
                        :items="products"
                        item-text="productname"
                        item-value="productid"
                        label="Product*"
                        required
                        no-data-text="No data"
                        :rules="[emptyFiled]"
                    ></v-select>
                </v-col>

                <v-col cols="12" md="4" lg="4" >
                    <v-text-field
                        v-model="orderData.orderDetails[0].unitprice"
                        label="$Unit Price*"
                        required
                        type="number"
                        :rules="[emptyFiled, validNumber]"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" lg="4" >
                    <v-text-field
                        v-model="orderData.orderDetails[0].qty"
                        label="Quantity*"
                        required
                        type="number"
                        :rules="[emptyFiled, validNumber]"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4" lg="4" >
                    <v-text-field
                        v-model="orderData.orderDetails[0].discount"
                        label="Discount*"
                        required
                        type="number"
                        :rules="[emptyFiled, validNumber]"
                    ></v-text-field>
                </v-col>                
            </v-row>
        </v-form>
    </v-container>
  </template>
  
<script>
import masterDataService from "@/services/masterData";

export default {
    name: 'order-form',
    data: () => ({
        m1:false,
        m2:false,
        m3: false,
        orderDataClean: {},
        orderData:{
            "custid": -1,
            "empid": null,
            "shipperid": null,
            "shipname": "",
            "shipaddress": "",
            "shipcity": "",
            "orderDate": "",
            "requireddate": "",
            "shippeddate": "",
            "freight": null,
            "shipcountry": "",
            "orderDetails": [
                {
                    "productid": null,
                    "unitprice": null,
                    "qty": null,
                    "discount": null
                }
            ]
        },
        testData: {
            "custid": 1,
            "empid": 5,
            "shipperid": 1,
            "shipname": "Ship to 84-A",
            "shipaddress": "3456, rue du Commerce",
            "shipcity": "Lyon",
            "orderDate": "2023-03-02",
            "requireddate": "2023-03-12",
            "shippeddate": "2023-03-02",
            "freight": 34.1,
            "shipcountry": "France",
            "orderDetails": [
                {
                "productid": 77,
                "unitprice": 13.00,
                "qty": 3,
                "discount": 0
                }
            ]
        },
        employees:[],
        shippers:[],
        products:[],
        formValid: false
    }),

    mounted(){
        this.orderDataClean = {...this.orderData};
        this.getMasterData();
    },

    methods:{
        emptyFiled(v){
            if(v == null || v == '')
                return 'This field is required';

            return true;
        },

        validNumber(v){
            return !isNaN(v) || 'The value should be a number';
        },

        getMasterData(){
            this.getEmployees();
            this.getProducts();
            this.getShippers();
        },

        async getEmployees(){
            try{
                let res = await masterDataService.getEmployees();
                this.employees = res.data;
            }catch(err){
                console.error(err);
            }
        },

        async getProducts(){
            try{
                let res = await masterDataService.getProducts();
                this.products = res.data;
            }catch(err){
                console.error(err);
            }
        },

        async getShippers(){
            try{
                let res = await masterDataService.getShippers();
                this.shippers = res.data;
            }catch(err){
                console.error(err);
            }
        },

        getFormData(){
            if(this.$refs.form.validate())
                return this.orderData;

            return null;
        },

        cleanForm(){
            this.orderData = {...this.orderDataClean};
            this.$refs.form.reset();
        },

        runTestData(){
            this.orderData = {...this.testData};
        }
    }
}
</script>
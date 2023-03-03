<template>
    <v-container>
        <v-card>
            <v-card-title>
                <v-row>
                    <v-col cols="12" md="5" lg="5">Customers</v-col>
                    <v-col cols="12" md="7" lg="7">
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Customer Name"
                        single-line
                        hide-details
                        @keyup="getPredictionData"
                    ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-title>

            <v-data-table
                :headers="headers"
                :items="data"
                :items-per-page="10"
                class="elevation-1"
                :loading="loadingData"
                loading-text="Loading data... Please wait"
            >
        
            <template v-slot:[`item.view`]="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn 
                            @click.stop="showCustomerOrders(item)"
                            v-on="on"
                            color="#b52c2d"
                            text>
                            VIEW ORDERS
                        </v-btn>
                        </template>
                        <span>{{ `View ${item.customerName} Order details`}}</span>
                </v-tooltip>
            </template>

            <template v-slot:[`item.new`]="{ item }">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn 
                            @click.stop="showFormNewOrder(item)"
                            v-on="on"
                            color="#108b08"
                            text>
                            NEW ORDER
                        </v-btn>
                        </template>
                        <span>{{ `Create new order for ${item.customerName}`}}</span>
                </v-tooltip>
            </template>
            </v-data-table>
        </v-card>

        <v-dialog 
            v-model="orderDialog"
            eager
            max-width="900px">
            <v-card>
              <v-toolbar
                dark
                color="secondary"
              >
                <v-toolbar-title>
                  {{ customerSelected.customerName }} - Orders
                </v-toolbar-title>
              </v-toolbar>

              <customer-order-detial ref="customerOrderDetail" />

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  @click="orderDialog = false"
                  text
                  color="secondary"
                  >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog 
            v-model="orderFormDialog"
            eager
            max-width="800px">
            <v-card>
              <v-toolbar
                dark
                color="success"
              >
                <v-toolbar-title>
                  {{ customerSelected.customerName }} - New Order
                </v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <order-form ref="orderForm" />
              </v-card-text>
              
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                    @click="closeOrderForm"
                    text
                    color="success"
                    >
                    Close
                </v-btn>
                <v-btn 
                    @click="saveOrder"
                    text
                    color="success"
                    >
                    Save
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar
          v-model="showSnackMsg"
          :timeout="2000"
        >
          {{ snackMsg }}
        </v-snackbar>

        <message-loader v-if="showLoaderCreate" message="Creating order"></message-loader>
    </v-container>
  </template>
  
<script>
import CustomerOrderDetial from './CustomerOrderDetail';
import OrderForm from './OrderForm';
import MessageLoader from './MessageLoader';
import orderService from "@/services/orders";

export default {
    name: 'sales-prediction-data',
    components:{
      CustomerOrderDetial,
      OrderForm,
      MessageLoader
    },
    data: () => ({
      showLoaderCreate: false,
      loadingData: true,
      orderDialog: false,
      orderFormDialog: false,
      showSnackMsg: false,
      snackMsg: "",
      search: "",
      customerSelected: {},
      headers: [
        { text: 'Customer Name', value: 'customerName' },
        { text: 'Last Order Date', value: 'lastOrderDate' },
        { text: 'Next Oredicted Order', value: 'nextPredictedOrder' },
        { text: '', value: 'view' },
        { text: '', value: 'new' }
      ],
      data: [],
    }),

    mounted(){
      this.getPredictionData();
    },

    methods:{
      showCustomerOrders(item){
        this.customerSelected = item;
        this.orderDialog = true;
        this.$refs.customerOrderDetail.getOrderCustomerData(item.custId);
      },

      closeCustomerOrders(){
        this.customerSelected = {};
        this.orderDialog = false;
      },

      async getPredictionData(){
        this.loadingData = true;

        try{
          let res = await orderService.getPrediction(this.search);
          this.data = res.data;
        }catch(err){
          console.error(err);
          this.showMessage('Error to load data, please reatry');
        }finally{
          this.loadingData = false;
        }
      },

      showMessage(msg){
        this.showSnackMsg = true;
        this.snackMsg = msg;
      },

      showFormNewOrder(item){
        this.customerSelected = item;
        this.$refs.orderForm.cleanForm();
        this.orderFormDialog = true;
      },

      closeOrderForm(){
        this.customerSelected = {};
        this.orderFormDialog = false;
      },

      saveOrder(){
        let orderData = this.$refs.orderForm.getFormData();
        if(orderData != null){
          this.orderFormDialog = false;
          orderData.custid = this.customerSelected.custId;

          this.saveOrderData(orderData);
        }
      },

      async saveOrderData(orderData){
        this.showLoaderCreate = true;

        try{
          await orderService.create(orderData);
          this.showMessage(`The Order for ${this.customerSelected.customerName} was created!`);
        }catch(err){
          console.error(err);
          this.showMessage('Error to create the order, please reatry');
        }finally{
          this.showLoaderCreate = false;
        }
      },
    }
  }
</script>
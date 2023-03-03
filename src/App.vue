<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
      height="60"
    >
      <v-toolbar-title>Sales Date Prediction App</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-img
          :src="require('./assets/logo.png')"
          contain
          height="50"
        />
      </div> 
    </v-app-bar>

    <v-main>
      <sales-prediction-data />
    </v-main>
  </v-app>
</template>

<script>
import SalesPredictionData from './components/SalesPredictionData';

export default {
  name: 'App',

  components: {
    SalesPredictionData,
  },

  data: () => ({
    //
  }),
};
</script>

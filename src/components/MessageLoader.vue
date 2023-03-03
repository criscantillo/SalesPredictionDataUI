<template>
    <div class="text-center">
      <v-overlay 
        :value="overlay"
        :absolute="false"
        opacity="0.7">
  
        <div class="_loader">
          <v-progress-circular
            v-if="$props.type == 'circular'"
            width="8"
            size="60"
            color="white"
            indeterminate
          ></v-progress-circular>
  
          <h2 v-if="$props.message"
            style="padding: 10px;">
            {{$props.message}}
          </h2>
  
          <v-progress-linear
            v-if="$props.type != 'circular'"
            striped
            indeterminate
            color="white"
            height="10"
          ></v-progress-linear>
        </div>
      </v-overlay>
    </div>
</template>
  
<script>
  
export default {
    name: 'message-loader',
    props: {     
        type: String,
        message: String
    },
    data: () => ({
        overlay: true,
    })
}
</script>
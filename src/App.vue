<template>
  <v-app>
  <router-view  :host = "this.host" :port = "this.port"></router-view>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {


  },
  data(){
    return {
      host: "localhost",
      port: 8080,
    };

  }
}


</script>

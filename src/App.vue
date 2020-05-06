<template>
  <v-app>
  <Navbar :host = "this.host" :port = "this.port"/>
  <router-view  :host = "this.host" :port = "this.port"></router-view>
  </v-app>
</template>

<script>

import Navbar from "@/components/Navbar";
export default {
  name: 'App',

  components: {
    Navbar

  },
  data(){
    return {
      host: "localhost",
      port: 8080,
    };

  }
}


</script>

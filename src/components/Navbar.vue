<template>
    <nav>
        <v-app-bar  app class = "primary">
            <v-btn text height="50" >
            <v-toolbar-title class="text-uppercase white--text">
                <span class = "font-weight-black mx-3 display-2"> Cefalo News Portal </span>
            </v-toolbar-title>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color = "success darken-1" class = "mx-2">Login</v-btn>
            <v-btn  width="90" color = "success darken-1" class="mx-1" >Register</v-btn>

        </v-app-bar>


    </nav>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>

</style>
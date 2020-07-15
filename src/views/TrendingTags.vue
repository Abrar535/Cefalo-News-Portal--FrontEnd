<template>
    <v-content>
        <Navbar :user="this.user"></Navbar>
        <template v-for = "(tag,id) in trendingTags">
            <v-card class = "ma-3" elevation="5" :key = id>
                <v-card-title><v-icon color = "teal">local_offer</v-icon>{{tag.tagName}}</v-card-title>
                <v-card-text><v-icon>arrow_forward</v-icon><strong>Number of stories with this tag:</strong> {{tag.numberOfStories}}</v-card-text>
            </v-card>

        </template>

    </v-content>
</template>

<script>
    import Navbar from "@/components/Navbar";
    import axios from "axios"
    export default {
        name: "TrendingTags",
        components: {Navbar},
        props: ["host", "port"],
        data(){

            return {
                trendingTags:[],
                user : null,


            }

        },
        created(){
            axios.get(`http://${this.host}:${this.port}/api/users/user`,{
                headers:{
                    Authorization : JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res=>{
                    this.user = res.data;

                })
                .catch(err=>{
                    console.log(err,'Custom Error');
                    localStorage.removeItem("token");
                });

            axios.get(`http://${this.host}:${this.port}/api/public/tags/trending`)
            .then(res=>{
                this.trendingTags = res.data;
                console.log(this.trendingTags);

            })
            .catch(err=>{

                console.log(err);

            })


        }
    }
</script>

<style scoped>

</style>
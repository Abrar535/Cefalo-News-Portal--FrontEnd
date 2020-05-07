<template>

    <v-content>
        <Navbar :host = "this.host" :port = "this.port"/>
        <v-container>
            <template v-for = "(item,index) in stories">
                <v-card class = "ma-3" elevation="5" :key="index">
                    <v-card-title>{{item.title}}</v-card-title>
                    <v-card-subtitle>
                        By <span class = "font-weight-bold">{{item.user.fullName}}</span> on <span class = "font-weight-bold">{{item.publishedDate}}</span>


                    </v-card-subtitle>
                    <v-card-text>{{item.body}}</v-card-text>
                    <div v-if = "user == item.user">
                    <v-btn @click = "test(item.storyId)" class = "mx-3 mb-1" >Edit</v-btn>
                    <v-btn class = "mx-2 mb-1">Delete</v-btn>
                    </div>
                </v-card>
            </template>

        </v-container>

    </v-content>

</template>

<script>
import axios from "axios";
import Navbar from "@/components/Navbar";
export default {
  name: 'Home',
  components: {
      Navbar
  },
    data(){
      return {
          stories:[],
          totalNumberOfStories:0,
          totalNumberOfPages:0,
          storiesPerPage:4,
          blah:0,
          user:{}
      }
    },
    props:["host","port"],
    methods:{
      test(blah){
          console.log(blah);

      }

    },
    created(){
    axios.get(`http://${this.host}:${this.port}/api/public/stories?pageNum=0&pageSize=${this.storiesPerPage}`)
        .then((res)=>{
            this.stories = res.data.stories;
        })
        .catch(err=>{
            console.log(err);
        });

    axios.get(`http://${this.host}:${this.port}/api/users/user`,{
        headers:{
            Authorization : JSON.parse(localStorage.getItem("token"))
        }
    })
        .then(res=>{
            this.user = res.data;
            console.log(this.user.fullName);

        })
        .catch(err=>{
            console.log(err,'Custom Error');

        })



    }





}
</script>

<template>

    <v-content>
        <Navbar :host = "this.host" :port = "this.port" :user = "this.user" />
        <v-container>
            <template v-for = "(item,index) in stories">
                <v-card class = "ma-3" elevation="5" :key="index">
                    <v-card-title>{{item.title}}</v-card-title>
                    <v-card-subtitle>
                        By <span class = "font-weight-bold">{{item.user.fullName}}</span> on <span class = "font-weight-bold">{{item.publishedDate}}</span>


                    </v-card-subtitle>
                    <v-card-text>{{item.body}}</v-card-text>
                    <div v-if = "user !== null && user.userName === item.user.userName">

                    <v-btn @click.stop = "dialog=true" @click="editStoryTitle = item.title, editStoryBody = item.body , editStoryDate = item.publishedDate , editStory(item.storyId)"  class = "mx-3 mb-1" ><v-icon>create</v-icon>Edit</v-btn>
                    <v-btn class = "mx-2 mb-1" @click = "deleteStory(item.storyId)"><v-icon>delete</v-icon>Delete</v-btn>
                    </div>
                </v-card>
            </template>
<!--            Edit a story-->
            <v-dialog v-model ="dialog" width = "500">

                <v-card class="elevation-12" >
                    <v-app-bar dark class="primary darken-3">
                        <v-toolbar-title>Edit Story</v-toolbar-title>
                    </v-app-bar>
                    <v-form ref="form" class="px-3 my-3" v-model="valid">
                        <v-text-field
                                label="Title"
                                placeholder="Enter the title of your story"
                                v-model="editStoryTitle"
                                prepend-icon="create"
                                :rules="[v => !!v || 'FullName is required']"
                        ></v-text-field>

                        <v-textarea

                                filled
                                label="Body"
                                placeholder="Enter the body of your story"
                                v-model="editStoryBody"
                                :counter="500"
                                prepend-icon="create"
                                :rules="editStoryRules"
                        ></v-textarea>


                        <div class="col text-center">
                            <v-btn outlined class="indigo mr-2" @click="editStorySubmit" :disabled="!valid">SUBMIT</v-btn>
                            <v-btn color="error darken-2" class="mr-4" @click="editStoryReset">CLEAR</v-btn>
                        </div>
                    </v-form>
                </v-card>

            </v-dialog>

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
          storiesPerPage:7,
          storyId:0,
          user:null,
          dialog:false,
          valid:"",
          editStoryTitle:"",
          editStoryBody:"",
          editStoryDate:"",

          //rules
          editStoryRules: [
              v => !!v || "Name is required",
              v => (v && v.length <= 500) || "Body must be less than 500 characters"
          ]

      }
    },
    props:["host","port"],
    methods:{
      editStory(storyId){
         this.storyId = storyId;

      },
        editStorySubmit(){
          console.log(this.storyId);
          var story = {};
          this.stories.forEach(ob=>{
          if(ob.storyId === this.storyId){
              story = ob;
          }
       });

        story.title = this.editStoryTitle;
        story.body = this.editStoryBody;

        this.dialog = false ;
        axios.put(`http://${this.host}:${this.port}/api/stories/${this.storyId}`,{title:this.editStoryTitle , body: this.editStoryBody},{
            headers:{
                Authorization: JSON.parse(localStorage.getItem("token"))
            }
        })
            .then(res=>{
                console.log(res.data);
                story.publishedDate = res.data.publishedDate;
            })
            .catch(err=>{
                console.log(err);
            });
        this.storyId = 0;

        },
        editStoryReset(){
            console.log("hell i am reset");
            this.$refs.form.reset();
        },
        deleteStory(storyId){
          console.log(storyId);
          this.$swal({
              title: "Are you sure?",
              text: "You will completely remove this story.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, i want to delete this story!"
          }).then(result=>{
              if(result.value){
                  axios.delete(`http://${this.host}:${this.port}/api/stories/${storyId}`,{
                      headers:{
                          Authorization:JSON.parse(localStorage.getItem("token"))
                      }
                  })
                      .then(res=>{
                          this.$swal({
                              icon: "success",
                              title: "Done!",
                              text: "Successfully deleted the story.",
                              showConfirmButton: false,
                              timer: 1500
                          });
                          this.stories = this.stories.filter(story => {
                              return story.storyId !== storyId;
                          })
                          console.log("Successfully Deleted ",res.data);
                      })
                      .catch(err=>{
                          this.$swal({
                              icon: "error",
                              title: "Sorry!",
                              text: "Story cannot be deleted!",
                              showConfirmButton: false,
                              timer: 1500

                          });
                          console.log(err);
                      });
              }
            });

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
            localStorage.removeItem("token");
        });



    }





}
</script>

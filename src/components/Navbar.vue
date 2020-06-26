<template>
    <nav>
        <v-app-bar  app class = "primary">
            <v-btn text height="50" @click = "homeButtonFunc" >
            <v-toolbar-title class="text-uppercase white--text">
                <span class = "font-weight-black mx-3 display-2"> Cefalo News Portal </span>
            </v-toolbar-title>
            </v-btn>
            <v-spacer></v-spacer>
<!-- Tag Searching-->
            <v-form @submit.prevent="tagSearchSubmit">
                <div class = "mt-8 pa-3">

                    <v-text-field
                    placeholder= "Search Story By Tag"
                    color = "red lighten-2"
                    background-color = "indigo"
                    prepend-inner-icon="search"
                    solo-inverted
                    clearable
                    flat
                    v-model = "tagSearchText"
                    @click:prepend-inner ="tagSearchSubmit"

                    >
                    </v-text-field>

                </div>
            </v-form>
<!--Login dialog box-->
            <div v-if = "user == null">
            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                    <v-btn
                            class="success darken-1 my-1 mx-2"
                            v-on="on"
                    >
                            <span class="font-weight-light white--text">Login</span>

                    </v-btn>
                </template>
                <v-card class="elevation-12" >
                    <v-app-bar dark class="primary darken-3">
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-app-bar>
                    <v-form ref="form" class="px-3 my-3" v-model="valid">
                        <v-text-field
                                label="USERNAME"
                                v-model="loginUserName"
                                :counter="15"
                                prepend-icon="person"
                                :rules="userNameRules"
                        ></v-text-field>
                        <v-text-field
                                type="text"
                                label="PASSWORD"
                                v-model="loginPassword"
                                prepend-icon="vpn_key"
                                :rules="[v => !!v || 'Password is required']"
                        ></v-text-field>

                        <div class="col text-center">
                            <v-btn outlined class="indigo mr-2" @click="loginSubmit" :disabled="!valid">SUBMIT</v-btn>
                            <v-btn color="error darken-2" class="mr-4" @click="loginReset">CLEAR</v-btn>
                        </div>
                    </v-form>
                </v-card>

            </v-dialog>

<!--Register dialog box-->
            <v-dialog v-model="dialog2" width="500">
                <template v-slot:activator="{ on }">
                    <v-btn
                            width="90" color = "success darken-1" class="mx-1"
                            v-on="on"
                    >

                        <span class="font-weight-light white--text">Register</span>

                    </v-btn>
                </template>

                <v-card class="elevation-12" >
                    <v-app-bar dark class="primary darken-3">
                        <v-toolbar-title>Register</v-toolbar-title>
                    </v-app-bar>
                    <v-form ref="form2" class="px-3 my-3" v-model="valid2">
                        <v-text-field
                                label="FULLNAME"
                                v-model="registerFullName"
                                prepend-icon="person"
                                :rules="[v => !!v || 'FullName is required']"
                        ></v-text-field>

                        <v-text-field
                                label="USERNAME"
                                v-model="registerUserName"
                                :counter="15"
                                prepend-icon="person"
                                :rules="userNameRules"
                        ></v-text-field>
                        <v-text-field
                                type="text"
                                label="PASSWORD"
                                v-model="registerPassword"
                                prepend-icon="vpn_key"
                                :rules="[v => !!v || 'Password is required']"
                        ></v-text-field>

                        <v-text-field
                                type="text"
                                label="CONFIRM PASSWORD"
                                v-model="registerConfirmPassword"
                                prepend-icon="vpn_key"
                                :rules="confirmPasswordRules"
                        ></v-text-field>



                        <div class="col text-center">
                            <v-btn outlined class="indigo mr-2" @click="registerSubmit" :disabled="!valid2">SUBMIT</v-btn>
                            <v-btn color="error darken-2" class="mr-4" @click="registerReset">CLEAR</v-btn>
                        </div>
                    </v-form>
                </v-card>

            </v-dialog>
            </div>

            <div v-else>
 <!--Create A new story dialog box-->
                <v-dialog v-model="dialog3" width="500">
                    <template v-slot:activator="{ on }">
                        <v-btn
                                color = "success darken-1" class="mx-1"
                                v-on="on"
                        >
                            <v-icon color="orange" >add</v-icon>
                            <span class="font-weight-light white--text">Create</span>

                        </v-btn>
                    </template>

                    <v-card class="elevation-12" >
                        <v-app-bar dark class="primary darken-3">
                            <v-toolbar-title>Create A New Story</v-toolbar-title>
                        </v-app-bar>
                        <v-form ref="form3" class="px-3 my-3" v-model="valid3">
                            <v-text-field
                                    label="Title"
                                    placeholder="Enter the title of your story"
                                    v-model="createStoryTitle"
                                    prepend-icon="create"
                                    :rules="[v => !!v || 'FullName is required']"
                            ></v-text-field>

                            <v-textarea

                                    filled
                                    label="Body"
                                    placeholder="Enter the body of your story"
                                    v-model="createStoryBody"
                                    :counter="500"
                                    prepend-icon="create"
                                    :rules="createStoryRules"
                            ></v-textarea>
                            <v-text-field
                                label = "Tag"
                                placeholder = "Enter a new tag"
                                v-model = "tagText"
                                prepend-icon = "local_offer"
                                :rules = "tagTextRules"
                            >

                            </v-text-field>

                            <v-col class = "text-right">
                                 <v-btn class ="mb-4"  color = "error" @click="addTag" >Add Tag</v-btn>
                            </v-col>
                           <template v-for = "(item,index) in tags">
                                <v-chip
                                        :key = "index"
                                        class="ma-2"
                                        close
                                        color="teal"
                                        text-color="white"
                                        @click:close="closeTag(item)"
                                >
                                    <v-avatar left>
                                        <v-icon>mdi-checkbox-marked-circle</v-icon>
                                    </v-avatar>
                                    {{item.tagName}}
                                </v-chip>
                           </template>

                            <div class="col text-center">
                                <v-btn outlined class="indigo mr-2" @click="createStorySubmit" :disabled="!valid3">SUBMIT</v-btn>
                                <v-btn color="error darken-2" class="mr-4" @click="createStoryReset">CLEAR</v-btn>
                            </div>
                        </v-form>
                    </v-card>

                </v-dialog>

                <v-btn  class="success darken-1 my-1 mx-2" @click = "logOut">
                    <span class="font-weight-light white--text">Logout </span>

                    <span class = "white--text font-weight-bold">
                     ({{user.userName}})
                    </span>
                    <v-icon color="error">exit_to_app</v-icon>
                </v-btn>

            </div>




        </v-app-bar>


    </nav>
</template>

<script>
    import axios from "axios";
    export default {
        name: "Navbar",
        props:["host","port","user","storyId"],
        data(){
            return {
                //rules
                userNameRules: [
                    v => !!v || "Name is required",
                    v => (v && v.length <= 20) || "Name must be less than 10 characters"
                ],
                confirmPasswordRules: [
                    v => !!v || "Password must be confirmed",
                    // v => (v && v.length <= 10) || "Name must be less than 10 characters"
                    v=> (v === this.registerPassword) ||"Password doesnt match"
                ],
                createStoryRules: [
                    v => !!v || "Name is required",
                    v => (v && v.length <= 500) || "Body must be less than 500 characters"
                ],
                tagTextRules:[],
                //rules
                dialog: false ,
                dialog2:false,
                dialog3:false,
                valid: "",
                valid2:"",
                valid3:"",
                loginUserName:"",
                loginPassword:"",
                registerUserName:"",
                registerPassword:"",
                registerFullName:"",
                registerConfirmPassword:"",
                loginStatus:false,
                createStoryTitle:"",
                createStoryBody:"",
                tagText:"",
                tags:[],
                tagPresentMap:{},
                tagSearchText: "",
                searchedStories: []


            }

        },
        watch: {
            'tagText' (val) {
                this.tagTextRules = [];
                console.log("called from watcher tagTex " , val);
            }
        },
        methods:{
            testSearch(){
              console.log('I am called from testSearch');
            },
            loginSubmit(){
                this.$refs.form.validate();

                axios.post(`http://${this.host}:${this.port}/api/public/authenticate`,{username:this.loginUserName , password:this.loginPassword})
                .then(res=>{
                    console.log(res.data.jwt);
                    localStorage.setItem("token", JSON.stringify("Bearer "+ res.data.jwt));
                    this.$swal({
                        icon: "success",
                        title: `Logged in as ${this.loginUserName}`,
                        showConfirmButton: false,
                        timer: 1500

                    });
                    setTimeout(() => {
                        this.$router.go();
                    }, 1501);
                })
                .catch(err=>{
                    this.$swal({
                        icon: "error",
                        title: "Access Denied!",
                        text: "Incorrect Username or Password!",
                        showConfirmButton: false,
                        timer: 1500

                    });
                    console.log(err);
                });
            },
            loginReset(){
                this.$refs.form.reset();
            },
            registerSubmit(){
                this.$refs.form2.validate();

                axios.post(`http://${this.host}:${this.port}/api/public/register/users`,{userName:this.registerUserName , fullName: this.registerFullName , password: this.registerPassword})
                    .then(res=>{
                        this.$swal({
                            icon: "success",
                            title: "Registered!",
                            text: `Successfully registered as ${res.data.userName}.`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setTimeout(() => {
                            this.dialog2 = false ;
                            this.registerReset();
                        }, 1501);
                    })
                .catch(error=>{
                    //console.log(error.response.data)
                    this.$swal({
                        icon: "error",
                        title: "Error!",
                        text: `${error.response.data}`,
                        showConfirmButton: false,
                        timer: 2000

                    });

                })


            },
            registerReset(){
                this.$refs.form2.reset();

            },
            createStorySubmit(){

                axios.post(`http://${this.host}:${this.port}/api/stories`,{title:this.createStoryTitle , body:this.createStoryBody, tags:this.tags},{
                    headers:{
                        Authorization : JSON.parse(localStorage.getItem("token"))
                    }
                })
                .then(res=>{
                    this.dialog3 = false ;
                    console.log("Successfully created story " + res.data);
                    this.$emit('create-story',res.data);
                    this.$swal({
                        icon: "success",
                        title: "Done!",
                        text: "Story Created",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => {
                        this.$router.go();
                    }, 1501);
                })
                .catch(err=>{
                    console.log(err.response.data.message);
                    this.dialog3 = false ;
                    this.$swal({
                        icon: "error",
                        title: "Denied!",
                        text: err.response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(()=>{
                        this.$router.go();
                    },1501)

                });
             this.createStoryTitle = "" , this.createStoryBody = "";
            },
            createStoryReset(){
                this.$refs.form3.reset();
            },
            logOut(){
                this.$swal({
                    title: "Are you sure?",
                    text: "You will be logged out!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, i want to logout."
                }).then(result=>{
                    if(result.value){
                        localStorage.removeItem("token");
                        this.$swal({
                            icon: "success",
                            title: "Done!",
                            text: "You have successfully logged out.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setTimeout(() => {
                            this.$router.go();
                        }, 1501);

                    }
                });


            },
            homeButtonFunc(){

             localStorage.removeItem("tagSearch");
             this.$router.go();
            }
            ,
            addTag(){

                this.tagTextRules = [
                    v=> !!v || "Empty tag cannot be added",
                    v=> this.tagPresentMap[v] === null || "Tag already present"
                ]
                if(this.tagText!=='' && this.tagPresentMap[this.tagText] == null ) {
                    this.tagPresentMap[this.tagText] = true;
                    this.tags.push({tagName: this.tagText});
                }
                console.log(this.tags);
            },
            closeTag(tag){
                this.tags = this.tags.filter((ob)=>{
                    return ob!==tag;
                })
                delete this.tagPresentMap[tag.tagName];
            },
            tagSearchSubmit(){

                this.$emit('tag-search', this.tagSearchText);

            }

        }
    }
</script>

<style scoped>
    /*.custom-placeholder-color input::placeholder {*/
    /*    color: green!important;*/
    /*    opacity: 1;*/
    /*}*/




</style>
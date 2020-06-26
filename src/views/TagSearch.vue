<template>

    <Home :searchedStories="this.searchedStories" :searchEvent="true" :host ="this.host" :port = "this.port"/>

</template>

<script>

    import Home from "@/views/Home";
    import axios from "axios";
    export default {
        name: 'TagSearch',
        components: {
            Home
        },
        data() {
            return {

                searchedStories: [],
                tagName: this.$route.params.tagName,
                storiesPerPage: 4,
                totalNumberOfPages: 0,
                totalNumberOfStories:0

            }

        },
        props:["host","port"],

        created() {
            console.log("i am tagName ",this.tagName);
            axios.get(`http://${this.host}:${this.port}/api/public/tags/${this.tagName}/story?pageNum=0&pageSize=${this.storiesPerPage}`)
                .then((res) => {
                    //this.searchedStories = res.data.stories;
                    //this.totalNumberOfPages = res.data.totalNumberOfPages;
                    this.totalNumberOfStories = res.data.totalNumberOfStories;
                    this.searchedStories = res.data ;
                     console.log("I am total number of searched stories ", this.searchedStories);
                    // console.log("searched story length ", this.searchedStories[0].body);

                })
                .catch(err => {
                    console.log('Tagsearch error');
                    console.log(err);
                });

        }
    }
</script>

<style scoped>

</style>
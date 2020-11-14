<template>
  <div id="show-blogs">
    <h1>List Blog Titles</h1>
    <input type="text" v-model="search" placeholder="search blogs"/>
    <div v-for="blog in filteredBlogs" v-bind:key="blog" class="single-blog">
      <router-link v-bind:to="'/blog/' + blog.id"><h2>{{ blog.title | to-uppercase}}</h2></router-link>
    </div>
  </div>
</template>

<script>
  import searchMixin from '../mixins/searchMixin'

  export default {
    name: 'listBlogs',
    data(){
      return {
        blogs: [],
        search: ""
      }
    },
    created(){
      this.$http.get("https://netninja-mini-blog.firebaseio.com/posts.json")
        .then(data => {
          return data.json();
        }).then(data => {
          let blogsArray = [];
          for (const key in data){
            data[key].id = key;
            blogsArray.push(data[key])
          }
          this.blogs = blogsArray;
        })
    },
    filters: {
      'to-uppercase': value => {
        return value.toUpperCase();
      },
      snippet(value){
        return value.slice(0, 100) + '...';
      }
    },
    directives: {
      'rainbow': {
        bind(el){
          el.style.color = "#" + Math.random().toString(16).slice(2,8);
        }
      }
    },
    mixins:[searchMixin]
  }
</script>

<style>
  #show-blogs a{
    color: #444;
    text-decoration: none;
  }
</style>

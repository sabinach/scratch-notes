<template>
  <div id="add-blog">
    <h2>Add a New Blog Post</h2>
    <form v-if="!submitted">
      <label>Blog Title:</label>
      <input type="text" v-model="blog.title" required/>
      <label>Blog Content:</label>
      <textarea v-model="blog.content"></textarea>
      <div id="checkboxes">
        <label>Ninjas</label>
        <input type="checkbox" value="ninjas" v-model="blog.categories" />
        <label>Wizards</label>
        <input type="checkbox" value="wizards" v-model="blog.categories" />
        <label>Warriors</label>
        <input type="checkbox" value="warriors" v-model="blog.categories" />
        <label>Mages</label>
        <input type="checkbox" value="mages" v-model="blog.categories" />
      </div>
      <label>Author:</label>
      <select v-model="blog.author">
        <option v-for="author in authors" v-bind:key="author">{{ author }}</option>
      </select>
      <button v-on:click.prevent="post">Add Blog</button>
    </form> 
    <div v-if="submitted">
      <h3>Thanks for adding your post!</h3>
    </div>
    <div id="preview">
      <h3>Preview Blog</h3>
      <p>Blog Title: {{ blog.title }}</p>
      <p>Blog Content:</p>
      <p>{{ blog.content }}</p>
      <p>Blog Categories:</p>
      <ul>
        <li v-for="category in blog.categories" v-bind:key="category">{{ category }}</li>
      </ul>
      <p>Blog Author: {{ blog.author }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'addBlog',
    data(){
      return {
        blog: {
          title: "",
          content: "",
          categories: [],
          author: ""
        },
        authors: ["", "The Net Ninja", "The Angular Avenger", "The Vue Vindicator"],
        submitted: false
      }
    },
    methods: {
      post(){
        this.$http.post("https://netninja-mini-blog.firebaseio.com/posts.json", this.blog)
          .then(data => {
            console.log(data);
            this.submitted = true;
          });
      }
    }
  }
</script>

<style>
  #add-blog *{
    box-sizing: border-box;
  }
  #add-blog{
    margin: 20px auto;
    max-width: 500px;
  }
  label{
    display: block;
    margin: 20px 0 10px;
  }
  input[type="text"], textarea{
    display: block;
    width: 100%;
    padding: 8px;
  }
  #preview{
    padding: 10px 20px;
    border: 1px dotted #ccc;
    margin: 30px 0;
  }
  h3{
    margin-top: 10px;
  }
  #checkboxes input{
    display: inline-block;
    margin-right: 10px;
  }
  #checkboxes label{
    display: inline-block;
  }
</style>

<template>
  <header>
    <h1 v-on:click="changeTitle">{{ title }}</h1>
  </header>
</template>

<script>
  import {bus} from "../main";
  export default {
    props:{
      title:{
        type: String
      }
    },
    data(){
      return {
      }
    },
    methods:{
      changeTitle(){
        //this.$emit('changeTitle', 'Vue Wizards'); // emit to App root
        this.title = 'Vue Wizards';                 // change in Header
        bus.$emit('titleChanged', 'Vue Wizards');   // emit to Footer
      }
    }
  }
</script>

<style scoped>
  header{
    background: lightgreen;
    padding: 10px;
  }
  h1{
    color: #222;
    text-align: center;
  }
</style>

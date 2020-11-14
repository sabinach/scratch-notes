<template>
  <div id="app">
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
    <button v-on:click="component = 'form-one'">Show form one</button>
    <button v-on:click="component = 'form-two'">Show form two</button>
  </div>
</template>

<script>
  import formOne from './components/formOne.vue'
  import formTwo from './components/formTwo.vue'

  export default {
    name: 'App',
    components: {
      'form-one': formOne,
      'form-two': formTwo
    },
    data(){
      return {
        component: 'form-one'
      }
    },
    methods: {

    }
  }
</script>

<style>
  body{
    margin: 0;
    font-family: 'Nunito SemiBold';
  }
</style>

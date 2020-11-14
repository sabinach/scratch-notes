<template>
  <div>
    <app-header v-bind:title="title" v-on:changeTitle="updateTitle($event)"></app-header>
    <app-ninjas v-bind:ninjas="ninjas"></app-ninjas>
    <app-footer v-bind:title="title"></app-footer>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Ninjas from './components/Ninjas.vue'
  import Footer from './components/Footer.vue'

  export default {
    name: 'App',
    components: {
      'app-header': Header,
      'app-ninjas': Ninjas,
      'app-footer': Footer
    },
    data(){
      return {
        title: 'Vue Ninjas',
        ninjas: [
          {name: 'Ryu', speciality: 'Vue Components', show: false},
          {name: 'Crystal', speciality: 'HTML Wizardry', show: false},
          {name: 'Hitoshi', speciality: 'Click Events', show: false},
          {name: 'Tango', speciality: 'Conditionals', show: false},
          {name: 'Kami', speciality: 'Webpack', show: false},
          {name: 'Yoshi', speciality: 'Data Diggin', show: false}
        ]
      }
    },
    methods: {
      updateTitle(updatedTitle){
        this.title = updatedTitle
      }
    }
  }
</script>

<style>

</style>

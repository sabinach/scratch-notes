<template>
  <div>
    <form-helper>
      <div slot="form-header">
        <h3>This is the title of the form</h3>
        <p>Information about the form</p>
      </div>
      <div slot="form-fields">
        <input type="text" placeholder="name" required />
        <input type="text" placeholder="password" required />
      </div>
      <div slot="form-controls">
        <button v-on:click="handleSubmit">Submit</button>
      </div>
    </form-helper>
  </div>
</template>

<script>
  import formHelper from './components/formHelper.vue'

  export default {
    name: 'App',
    components: {
      'form-helper': formHelper
    },
    data(){
      return{
        title: 'I am a dynamic slot title' // this must be defined where the template tags is directly used
      }
    }
  }
</script>

<style>
</style>

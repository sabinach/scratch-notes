<template>
  <div class="skills">
    <div class="holder">
      <!--
      <p v-if="skills.length >= 1">
        You have more than 1 skills
      </p>
      <p v-else>
        You have less than or equal to 1 skill
      </p>
      <div v-bind:class="{alert: showAlert, 'another-class': showClass}"></div>
      <div v-bind:class="alertObject"></div>
      <div v-bind:style="{backgroundColor: bgColor, width: bgWidth, height: bgHeight}"></div>
      -->

      <form @submit.prevent="addSkill">
        <input type="text" placeholder="Enter a skill you have.." v-model="skill">
        <!--
          {{ skill }}
          <input type="checkbox" id="checkbox" v-model="checked">
        -->
      </form>

      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="(data, index) in skills" :key='index'> 
            {{index}}. {{data.skill}}
            <i class="fa fa-minus-circle" v-on:click="remove(index)"></i>
          </li> 
        </transition-group>
      </ul>

      <p>These are the skills that you possess.</p>      


    </div>
  </div>
</template>

<script>
export default {
  name: 'Skills',
  data() {
    return {
      /*
      <!-- text interpolation -->
      {{ name }}

      <!-- ternary interpolation -->
      {{ btnState ? 'The button is disabled' : 'The button is active'}}

      <!-- vue directives / attributes -->
      <button v-on:click="changeName" v-bind:disabled="btnState">Change Name </button> 

      name: 'dataName',
      btnState: true,
      showAlert: true,
      showClass: true,
      alertObject: {
        alert: true,
      },
      bgColor: 'yellow',
      bgWidth: '100%',
      bgHeight: '30px',

      checked: false,
      */
      
      skill: '',
      skills: [
        {"skill": "Vue.js"}, 
        {"skill": "Front-end Developer"},
      ]
    } //return
  }, //data
  methods: {
    addSkill(){
      this.skills.push({skill: this.skill})
      this.skill = '';
      //console.log("This checkbox value is " + this.checked);
    }, //addSkill
    remove(id){
      this.skills.splice(id, 1);
    }
  } //methods
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style src="./Skills.css" scoped>-->
<!--
  .alert {
    background-color: yellow;
    width: 100%;
    height: 30px;
  }
  .another-class {
    border: 5px solid black;
  }
-->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"; 

  .holder {
    background: #fff;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  ul li {
    padding: 20px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 5px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
  }

  p {
    text-align:center;
    padding: 30px 0;
    color: gray;
  }

  .container {
    box-shadow: 0px 0px 40px lightgray;
  }

  input {
    width: calc(100% - 40px);
    border: 0;
    padding: 20px;
    font-size: 1.3em;
    background-color: #323333;
    color: #687F7F;
  }

  i {
    float: right;
    cursor: pointer;
  }

</style>

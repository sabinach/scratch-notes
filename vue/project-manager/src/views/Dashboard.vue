<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">

      <v-row class="mb-3">
        <!-- by project -->
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('title')" v-on="on">
              <v-icon left small>folder</v-icon>
              <span class="caption text-lowercase">By project name</span>
            </v-btn>
          </template>
          <span>Sort projects by project name</span>
        </v-tooltip>
        <!-- by person -->
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('person')" v-on="on">
              <v-icon left small>person</v-icon>
              <span class="caption text-lowercase">By person</span>
            </v-btn>
          </template>
          <span>Sort projects by person</span>
        </v-tooltip>
        <!-- by status -->
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('status')" v-on="on">
              <v-icon left small>done</v-icon>
              <span class="caption text-lowercase">By status</span>
            </v-btn>
          </template>
          <span>Sort projects by status</span>
        </v-tooltip>
      </v-row>
      
      <v-card flat v-for="project in projects" v-bind:key="project.title">
        <v-row wrap v-bind:class="`pl-3 project ${project.status}`">

          <v-col xs="12" md="6">
            <div class="caption grey--text">Project title</div>
            <div>{{project.title}}</div>
          </v-col>
          <v-col xs="6" md="2" >
            <div class="caption grey--text">Person</div>
            <div>{{project.person}}</div>
          </v-col> 
          <v-col xs="6" md="2">
            <div class="caption grey--text">Due by</div>
            <div>{{project.due}}</div>
          </v-col> 
          <v-col xs="6" md="2">
            <div class="d-flex justify-end mr-5">
              <v-chip small :class="`${project.status} white--text caption my-2`">{{ project.status}}</v-chip>
            </div>
          </v-col> 
          
        </v-row>
        <v-divider></v-divider>
      </v-card>
     
    </v-container>
  </div>

</template>

<script>
  import db from '@/firebase'

  export default {
    data(){
      return {
        projects: []
      }
    },
    methods:{
      sortBy(prop){
        this.projects.sort( (a,b) => a[prop] < b[prop] ? -1 : 1 ) // compare neighboring items, -1 don't change order, 1 change order
      }
    },
    created(){
      db.collection('projects').onSnapshot(res => {
        const changes = res.docChanges()

        changes.forEach(change => {
          if(change.type==='added'){
            this.projects.push({
              ...change.doc.data(), // convert document into object with properties
              id: change.doc.id     // append id
            })
          }
        })

      })
    }
  }
</script>

<style scoped>
  .project.complete {
    border-left: 4px solid #3cd1c2;
  }
  .project.ongoing {
    border-left: 4px solid orange;
  }
  .project.overdue {
    border-left: 4px solid tomato;
  }

  .v-chip.complete{
    background: #3cd1c2;
  }
  .v-chip.ongoing{
    background: orange;
  }
  .v-chip.overdue{
    background: tomato;
  }
</style>
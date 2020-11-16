<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      
      <v-expansion-panels>
        <v-expansion-panel v-for="project in myProjects" :key="project.title">
          <v-expansion-panel-header>
            {{project.title}}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="font-weight-bold">{{project.due}}</div>
            {{project.content}}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-container>
  </div>

</template>

<script>
  import db from '@/firebase'

  export default {
    data(){
      return{
        projects: []
      }
    },
    computed:{
      myProjects(){
        return this.projects.filter(project => project.person=='Ryu')
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
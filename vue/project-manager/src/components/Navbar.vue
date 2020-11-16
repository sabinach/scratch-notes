<template>
  <nav>

    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awesome! You added a new project.</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <!-- Nav Bar -->
    <v-app-bar flat app>

      <!-- Drawer Icon -->
      <v-app-bar-nav-icon class="grey--text" @click="drawer=!drawer"></v-app-bar-nav-icon>

      <!-- Title -->
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Project</span>
        <span>Manager</span>
      </v-toolbar-title>

      <!-- Spacer -->
      <v-spacer></v-spacer>

      <!-- Dropdown Menu --> 
      <v-menu offset-y>

        <!-- Button -->
        <template v-slot:activator="{ on, attrs }">
          <v-btn text color="grey" v-bind="attrs" v-on="on">
            <v-icon left>expand_more</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>

        <!-- List -->
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>

      </v-menu>

      <!-- Signout -->      
      <v-btn text color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>

    </v-app-bar>

    <!-- Drawer -->
    <v-navigation-drawer app v-model="drawer" class="primary">

      <!-- Avatar -->
      <v-row class="mt-5 text-center">
        <v-col>
          <v-avatar size="100">
            <img src="/avatar-2.png">
          </v-avatar>
          <p class="white--text subheading mt-1">Ryu</p>
        </v-col>
        <v-col class="mb-3">
          <Popup @projectAdded="snackbar = true"/>
        </v-col>
      </v-row>

      <!-- Page Items -->
      <v-list>
        <v-list-item v-for="link in links" v-bind:key="link.text" router v-bind:to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

  </nav>
</template>

<script>
  import Popup from './Popup.vue'
  export default {
    components:{
      Popup
    },
    data(){
      return{
        drawer: false,
        links: [
          {icon: 'dashboard', text: 'Dashboard', route: '/'},
          {icon: 'folder', text: 'My Projects', route: '/projects'},
          {icon: 'person', text: 'Team', route: '/team'},
        ],
        snackbar: false
      }
    }
  }
</script>
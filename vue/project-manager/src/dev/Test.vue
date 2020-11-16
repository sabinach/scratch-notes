<template>
  <div class="home">
    <h1>Testpage</h1>
    <v-btn class="pink white--text">Click me</v-btn>
    <v-btn depressed color="pink">Click me</v-btn>
    <v-btn depressed class="pink">
      <v-icon left>mdi-checkbox-marked-circle</v-icon>
      <span>Check</span>
    </v-btn>
    <v-btn depressed large class="pink">
      <span>Check</span>
      <v-icon small right>mdi-checkbox-marked-circle</v-icon>
    </v-btn>
    <v-btn
      class="ma-2"
      text
      icon
      color="red lighten-2"
    >
      <v-icon>mdi-thumb-down</v-icon>
    </v-btn>

    <v-btn fab dark olor="purple">
      <v-icon>email</v-icon>
    </v-btn>

    <v-btn class="hidden-md-and-down">click me</v-btn>

    <v-row wrap>
      <v-col cols="12" md="6">
        <v-btn outlined block class="primary">1</v-btn>
      </v-col>
      <v-col cols="4" md="2">
        <v-btn outlined block class="primary">2</v-btn>
      </v-col>
      <v-col cols="4" md="2">
        <v-btn outlined block class="primary">2</v-btn>
      </v-col>
      <v-col cols="4" md="2">
        <v-btn outlined block class="primary">2</v-btn>
      </v-col>
    </v-row>

  </div>

</template>

<script>
  export default {
    
  }
</script>
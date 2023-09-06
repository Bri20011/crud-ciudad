<template>
  <v-card
    color="grey-lighten-4"
    flat
    height="100%"
    rounded="0"
  >
    <v-toolbar color="blue-grey">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Inmobiliaria Digital BC</v-toolbar-title>

      <v-spacer></v-spacer>

     
    </v-toolbar>
  </v-card>
</template>













<script>
import router from '@/router';

export default {
    name: "Menu",
    data() {
        return {};
    },
    components: { router }
};


</script>


<style>
</style>
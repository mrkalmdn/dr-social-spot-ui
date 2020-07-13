<template>
  <v-app-bar app elevate-on-scroll color="white" id="app-bar">
    <router-link to="/home" class="text-decoration-none black--text">
      <v-toolbar-title>
        drsocialspot
      </v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    <router-link to="/profile" class="text-decoration-none black--text">
      @{{ user.username }}
    </router-link>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters('auth', ['user']),
};
</script>

<style lang="scss" scoped>
#app-bar {
  border-width: 0 0 thin;
  border-style: solid;
  border-bottom-color: rgba(0, 0, 0, 0.12) !important;
}
</style>

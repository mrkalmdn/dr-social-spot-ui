<template>
  <v-app>
    <Navbar v-if="visible" />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'App',

  components: {
    Navbar: () => import('./views/Navbar'),
  },

  data: () => ({
    visible: true,
  }),

  mounted() {
    this.me();
  },

  methods: mapActions('auth', ['me']),

  watch: {
    $route: {
      handler(to) {
        if (to.name === 'login' || to.name === 'register') {
          this.visible = false;
        } else {
          this.visible = true;
        }
      },
      immediate: true,
    },
  },
};
</script>

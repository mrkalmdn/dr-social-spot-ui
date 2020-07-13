<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters>
      <v-col cols="12" lg="9" sm="4" class="bg-image primary"></v-col>

      <v-col cols="12" xs="12" sm="8" lg="3">
        <div class="login d-flex align-center py-5 px-5">
          <v-container>
            <v-row>
              <v-col class="mx-auto">
                <h1>
                  drsocial
                  <span class="primary--text">spot</span>
                </h1>

                <h5 class="headline mt-5 mb-5">
                  <span>Log in</span>
                  <br />
                  <small class="caption">Sign in to your account</small>
                </h5>

                <v-alert v-if="error" dense text type="error">
                  Invalid credentials.
                </v-alert>

                <validation-observer ref="observer" v-slot="{ passes }">
                  <v-form @submit.prevent="passes(onSubmit)">
                    <validation-provider v-slot="{ errors }" name="Username">
                      <v-text-field
                        label="Username"
                        outlined
                        v-model="form.username"
                        :error-messages="errors"
                      ></v-text-field>
                    </validation-provider>

                    <validation-provider v-slot="{ errors }" name="Password">
                      <v-text-field
                        label="Password"
                        outlined
                        type="password"
                        v-model="form.password"
                        :error-messages="errors"
                      ></v-text-field>
                    </validation-provider>

                    <v-btn
                      depressed
                      x-large
                      block
                      color="primary"
                      @click.prevent="passes(onSubmit)"
                      type="submit"
                      :loading="loading"
                      :disabled="loading"
                    >
                      <span>Submit</span>
                      <v-icon right class="ml-3 outlined">mdi-send</v-icon>
                    </v-btn>
                  </v-form>
                </validation-observer>

                <div class="mt-5 text-center">
                  Don't have an account yet? Click
                  <router-link to="/register">here</router-link>
                  to create.
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { mapActions } from 'vuex';

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data: () => ({
    loading: false,
    error: null,
    form: {
      username: null,
      password: null,
    },
  }),

  methods: {
    ...mapActions('auth', ['login']),

    async onSubmit() {
      this.error = null;
      this.loading = true;

      try {
        await this.login(this.form);

        this.loading = false;

        this.$router.push('/home');
      } catch (error) {
        this.error = error.response.data.error;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
}
</style>

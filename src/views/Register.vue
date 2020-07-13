<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row no-gutters>
      <v-col cols="12" lg="8" sm="4" class="bg-image primary"></v-col>

      <v-col cols="12" xs="12" sm="8" lg="4">
        <div class="login d-flex align-center py-5 px-5">
          <v-container>
            <v-row>
              <v-col class="mx-auto">
                <h1>
                  drsocial
                  <span class="primary--text">spot</span>
                </h1>

                <h5 class="headline mt-5 mb-5">
                  <span>Register</span>
                  <br />
                </h5>

                <v-alert v-if="error" dense text type="error">
                  {{ error }}
                </v-alert>

                <v-alert v-if="success" dense text type="success">
                  {{ success }}
                </v-alert>

                <validation-observer ref="observer" v-slot="{ passes }">
                  <v-form @submit.prevent="passes(onSubmit)">
                    <v-row>
                      <v-col cols="12">
                        <validation-provider v-slot="{ errors }" name="name">
                          <v-text-field
                            label="Name"
                            outlined
                            hide-details="auto"
                            v-model="form.name"
                            :error-messages="errors"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="6">
                        <validation-provider
                          v-slot="{ errors }"
                          name="username"
                        >
                          <v-text-field
                            label="Username"
                            outlined
                            hide-details="auto"
                            v-model="form.username"
                            :error-messages="errors"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>

                      <v-col cols="6">
                        <validation-provider v-slot="{ errors }" name="email">
                          <v-text-field
                            label="Email"
                            outlined
                            type="email"
                            hide-details="auto"
                            v-model="form.email"
                            :error-messages="errors"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <validation-provider
                          v-slot="{ errors }"
                          name="password"
                        >
                          <v-text-field
                            label="Password"
                            outlined
                            type="password"
                            hide-details="auto"
                            v-model="form.password"
                            :error-messages="errors"
                          ></v-text-field>
                        </validation-provider>
                      </v-col>
                    </v-row>

                    <div class="mt-3">
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
                    </div>
                  </v-form>
                </validation-observer>

                <div class="mt-5 text-center">
                  Already have an account? Click
                  <router-link to="/">here</router-link>
                  to login.
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
import api from '@/store/api';

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data: () => ({
    loading: false,
    error: null,
    success: false,
    form: {
      name: null,
      username: null,
      email: null,
      password: null,
    },
  }),

  methods: {
    async onSubmit() {
      this.success = false;
      this.error = null;
      this.loading = true;

      try {
        await api.post('api/register', this.form);

        setTimeout(() => {
          this.success = 'Successully registered. Redirecting to login.';

          this.loading = false;

          this.$router.push('/');
        }, 2000);
      } catch (error) {
        this.error = error.response.data.message;

        this.$refs.observer.setErrors(error.response.data.errors);

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

<template>
  <div>
    <validation-observer ref="form">
      <v-form @submit.prevent="save">
        <validation-provider v-slot="{ errors }" name="body">
          <v-textarea
            outlined
            rows="1"
            :auto-grow="true"
            hide-details="auto"
            placeholder="Say something..."
            v-model="form.body"
            :error-messages="errors"
          ></v-textarea>
        </validation-provider>

        <div class="mt-3">
          <v-btn
            type="submit"
            :loading="loading"
            :disabled="loading"
            depressed
            color="primary"
          >
            Post
          </v-btn>
        </div>
      </v-form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data: () => ({
    loading: false,
    form: {
      body: null,
    },
  }),

  methods: {
    ...mapActions('posts', ['addPost']),

    async save() {
      this.loading = true;

      try {
        await this.addPost(this.form);

        this.loading = false;
        this.form.body = null;
        this.$refs.form.reset();
      } catch (error) {
        this.loading = false;

        this.$refs.form.setErrors(error.response.data.errors);
      }
    },
  },
};
</script>

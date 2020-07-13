<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" lg="6" offset-lg="3">
          <CreatePost />
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="post in posts"
          :key="post.id"
          cols="12"
          sm="12"
          lg="6"
          offset-lg="3"
        >
          <v-card outlined>
            <v-card-text>
              <div class="mb-5">
                <span class="subtitle-1 font-weight-bold">
                  {{ post.user.name }}
                </span>
                <span class="subtitle-2 ml-2">@{{ post.user.username }}</span>
              </div>

              {{ post.body }}
            </v-card-text>

            <v-card-actions>
              <v-btn small icon>
                <v-icon small>mdi-heart</v-icon>
              </v-btn>
            </v-card-actions>

            <v-divider v-if="post.comments.length > 0"></v-divider>

            <v-card-text v-if="post.comments.length > 0">
              <h4 class="grey--text lighten-5">Comments</h4>

              <div
                class="mt-2"
                v-for="comment in post.comments"
                :key="comment.id"
              >
                <div>
                  <span class="subtitle-1 font-weight-bold">
                    {{ comment.author.name }}
                  </span>
                  <span class="subtitle-2">@{{ comment.author.username }}</span>
                </div>

                {{ comment.html }}

                <div
                  class="px-5 py-2"
                  v-for="reply in comment.replies"
                  :key="reply.id"
                >
                  <div>
                    <span class="subtitle-1 font-weight-bold">
                      {{ reply.author.name }}
                    </span>
                    <span class="subtitle-2">@{{ reply.author.username }}</span>
                  </div>
                  {{ reply.html }}
                </div>

                <div class="my-2">
                  <span style="cursor: pointer" @click="showForm(comment)">
                    Reply
                  </span>
                </div>

                <v-form
                  :ref="`reply-${comment.id}`"
                  @submit.prevent="submitReply(comment, post.commentableKey)"
                >
                  <v-text-field
                    v-if="form.replyVisible[comment.id]"
                    class="mt-2"
                    dense
                    outlined
                    hide-details="auto"
                    placeholder="Say something..."
                    v-model="form.replies[comment.id]"
                  ></v-text-field>
                </v-form>
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <div class="pa-4">
              <v-form
                :ref="`form-${post.id}`"
                style="width: 100%"
                @submit.prevent="comment(post)"
              >
                <v-text-field
                  dense
                  outlined
                  hide-details="auto"
                  placeholder="Say something..."
                  v-model="form.comments[post.id]"
                ></v-text-field>
              </v-form>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',

  components: {
    CreatePost: () => import('@/components/CreatePost'),
  },

  data: () => ({
    form: {
      comments: [],
      replyVisible: [],
      replies: [],
    },
  }),

  computed: mapGetters('posts', ['posts']),

  methods: {
    ...mapActions('posts', ['getPosts', 'commentToPost', 'replyToComment']),

    async comment(post) {
      const payload = {
        commentableKey: post.commentableKey,
        body: this.form.comments[post.id],
      };

      try {
        await this.commentToPost(payload);

        const form = 'form-' + post.id;

        this.$refs[form][0].reset();
      } catch (error) {
        console.log(error);
      }
    },

    showForm(comment) {
      if (this.form.replyVisible.find((a) => a === comment.id) === undefined) {
        this.form.replyVisible.push(comment.id);
      }

      this.form.replyVisible[comment.id] = true;
    },

    async submitReply(comment, key) {
      const payload = {
        key,
        id: comment.id,
        body: this.form.replies[comment.id],
      };

      await this.replyToComment(payload);

      this.$refs[`reply-${comment.id}`][0].reset();
    },
  },

  created() {
    this.getPosts();
  },
};
</script>

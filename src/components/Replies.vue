<template>
  <div>
    <h4 class="grey--text lighten-5 mt-2">Replies</h4>
    <div class="px-5 py-2" v-for="reply in comment.replies" :key="reply.id">
      <div>
        <span class="subtitle-1 font-weight-bold">
          {{ reply.author.name }}
        </span>
        <span class="subtitle-2">@{{ reply.author.username }}</span>
      </div>
      {{ reply.html }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['comment'],
};
</script>

import api from '../api';

const state = {
  posts: [],
  post: {},
};

const getters = {
  posts: (state) => state.posts,
  post: (state) => state.post,
};

const actions = {
  async getPosts({ commit }, payload) {
    let url = 'api/posts';

    if (payload) {
      url = url.concat(`?user_id=${payload.user_id}`);
    }

    const response = await api.get(url);

    commit('SET_POSTS', response.data);
  },

  async commentToPost({ commit }, payload) {
    const response = await api.post('/api/comments', payload);

    const data = {
      key: payload.commentableKey,
      data: response.data,
    };

    commit('SET_COMMENT', data);
  },

  async replyToComment({ commit }, payload) {
    const response = await api.post(
      `/api/comments/${payload.id}/replies`,
      payload
    );

    const data = {
      key: payload.key,
      commentId: payload.id,
      data: response.data,
    };

    commit('SET_REPLY', data);
  },

  async addPost({ commit }, payload) {
    const response = await api.post('api/posts', payload);

    commit('ADD_POST', response.data);
  },
};

const mutations = {
  SET_POSTS: (state, data) => (state.posts = data),
  ADD_POST: (state, data) => state.posts.unshift(data),
  SET_COMMENT: (state, data) => {
    const index = state.posts.findIndex((a) => a.commentableKey === data.key);

    const selected = state.posts[index];

    data.data['replies'] = [];

    selected.comments.push(data.data);
  },
  SET_REPLY: (state, data) => {
    const index = state.posts.findIndex((a) => a.commentableKey === data.key);

    const post = state.posts[index];
    const comment = post.comments.find((a) => a.id === data.commentId);

    comment.replies.push(data.data);
  },
};

export const posts = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

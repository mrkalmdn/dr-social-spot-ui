import api from '../api';

const state = {
  user: {},
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),
};

const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  isLoggedIn: (state) => state.isLoggedIn,
};

const actions = {
  async login({ commit, dispatch }, payload) {
    const response = await api.post('api/login', payload);

    commit('SET_TOKEN', response.data.access_token);
    dispatch('me');
  },

  async me({ commit }) {
    const response = await api.get('api/me');

    commit('SET_USER', response.data);
  },
};

const mutations = {
  SET_TOKEN: (state, data) => {
    localStorage.setItem('token', data);

    api.defaults.headers.common['Authorization'] = `Bearer ${data}`;

    state.token = data;
  },
  SET_USER: (state, data) => (state.user = data),
};

export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

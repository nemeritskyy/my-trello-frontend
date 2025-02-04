import api from '@/common/constants/api';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: {},
    boards: {
      data: [],
    },
    user: {},
  },
  getters: {
    boards: (state) => state.boards.data || [],
  },
  mutations: {
    UPDATE_BOARDS(state, boards) {
      state.boards.data = boards;
    },
  },
  actions: {
    async getBoards({ commit }) {
      const response = await api.get('/board');
      commit('UPDATE_BOARDS', response.data.boards);
    },
    async createBoard({ dispatch }, { submitUrlPath, boardData }) {
      await api.post(submitUrlPath, boardData);
      await dispatch('getBoards');
    },
  },
  modules: {
  },
});

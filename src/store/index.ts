import api from '@/common/constants/api';
import { BoardIExtendedItem } from '@/common/interfaces/board';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: {} as BoardIExtendedItem,
    boards: {
      data: [] as BoardIExtendedItem[],
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
    UPDATE_BOARD(state, board) {
      state.board = board;
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
    async createList({ dispatch }, { submitUrlPath, boardData }) {
      await api.post(submitUrlPath, boardData);
      await dispatch('getBoard', boardData.id);
    },
    async getBoard({ commit }, boardId) {
      const response = await api.get(`/board/${boardId}`);
      commit('UPDATE_BOARD', response.data);
    },
    async updateBoardTitle({ dispatch }, { boardId, fieldName, newValue }) {
      const payload = JSON.stringify({ [fieldName]: newValue });
      await api.put(`board/${boardId}`, payload);
    },
  },
  modules: {
  },
});

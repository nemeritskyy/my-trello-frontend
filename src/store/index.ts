import api, { setStore } from '@/api/index';
import { IBoard } from '@/common/interfaces/board';
import Vue from 'vue';
import Vuex from 'vuex';
import { IDragItem } from '@/common/interfaces/dragItem';
import { ICard } from '@/common/interfaces/card';
import { Notyf } from 'notyf';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    board: {} as IBoard,
    boards: {
      data: [] as IBoard[],
    },
    user: {},
    defaultMinLength: 2,
    draggingElementDetails: {} as IDragItem,
    editableCard: {} as ICard | null,
    isAuthenticated: !!localStorage.getItem('token'),
    notyf: {} as Notyf,
  },
  getters: {
    boards: (state) => state.boards.data || [],
    draggingElementDetails: (state) => state.draggingElementDetails,
  },
  mutations: {
    setDraggingElementDetails(state, payload: IDragItem | null) {
      state.draggingElementDetails = payload || {} as IDragItem;
    },
    updateDraggingElementDetails(state, payload: Partial<IDragItem>) {
      // Update only updated fields
      state.draggingElementDetails = { ...state.draggingElementDetails, ...payload };
    },
    UPDATE_BOARDS(state, boards) {
      state.boards.data = boards;
    },
    UPDATE_BOARD(state, board) {
      state.board = board;
    },
    setEditableCard(state, payload: ICard) {
      state.editableCard = payload || {} as ICard;
    },
    clearEditableCard(state) {
      state.editableCard = null;
    },
    SET_AUTH(state, tokens) {
      localStorage.setItem('token', tokens.token);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      state.isAuthenticated = true;
    },
    LOGOUT(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      state.isAuthenticated = false;
    },
    setNotyf(state, payload: Notyf) {
      state.notyf = payload;
    },
  },
  actions: {
    async getBoards({ commit }) {
      try {
        const response = await api.get('/board');
        commit('UPDATE_BOARDS', response.data.boards);
      } catch (error) {
        console.error('Failed to fetch boards:', error);
      }
    },
    async getBoard({ commit }, boardId) {
      try {
        const response = await api.get(`/board/${boardId}`);
        commit('UPDATE_BOARD', response.data);
      } catch (error) {
        console.error('Failed to fetch boards:', error);
      }
    },
    async createBoard({ dispatch }, payload) {
      await dispatch('createEntity', {
        ...payload,
        dispatchAction: 'getBoards',
      });
    },
    async createList({ dispatch }, payload) {
      await dispatch('createEntity', {
        ...payload,
        dispatchAction: 'getBoard',
        dispatchId: payload.boardData.id,
      });
    },
    async createCard({ dispatch }, payload) {
      await dispatch('createEntity', {
        ...payload,
        dispatchAction: 'getBoard',
      });
    },
    async updateTitle({ dispatch }, {
      apiPath,
      fieldName,
      newValue,
    }) {
      try {
        const payload = JSON.stringify({ [fieldName]: newValue });
        await api.put(apiPath, payload);
      } catch (error) {
        console.error(`Failed to update title apiPath ${apiPath}:`, error);
      }
    },
    async editCard({ dispatch }, payload) {
      await api.put(payload.submitUrlPath, payload.boardData);
      await dispatch('getBoard', payload.boardId);
    },
    async removeCard({ dispatch }, payload) {
      await api.delete(`/board/${payload.boardId}/card/${payload.cardId}`);
      await dispatch('getBoard', payload.boardId);
    },
    async removeBoard({ dispatch }, boardId) {
      await api.delete(`/board/${boardId}`);
      await dispatch('getBoards');
    },
    async createEntity({ dispatch }, {
      submitUrlPath,
      boardData,
      dispatchAction,
      dispatchId,
    }) {
      try {
        await api.post(submitUrlPath, boardData);
        if (dispatchAction) {
          await dispatch(dispatchAction, dispatchId || boardData.board_id);
        }
      } catch (error) {
        console.error(`Failed to create entity at ${submitUrlPath}:`, error);
      }
    },
    async updateCardsInAPI({ dispatch }, {
      boardId,
      cardsToUpdate,
    }) {
      try {
        const payload = JSON.stringify(cardsToUpdate);
        const apiPath = `/board/${boardId}/card`;
        await api.put(apiPath, payload);
      } catch (error) {
        console.error('Failed to update cards:', error);
      }
    },
    async login({ commit }, payload) {
      try {
        const response = await api.post('/login', payload);
        if (response.data.result === 'Authorized') {
          commit('SET_AUTH', response.data);
          return true;
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
      return false;
    },
    async register({ commit }, payload) {
      try {
        const response = await api.post('/user', payload);
        if (response.data.result === 'Created') {
          return true;
        }
      } catch (error) {
        console.error('Error during register:', error);
      }
      return false;
    },
    async updateRefreshToken({ commit }) {
      try {
        const response = await api.post('/refresh', { refreshToken: localStorage.getItem('refreshToken') });
        console.log(response);
        if (response.data.result === 'Authorized') {
          commit('SET_AUTH', response.data);
          return true;
        }
      } catch (error) {
        console.error('Error during updating refresh:', error);
      }
      commit('LOGOUT');
      return false;
    },
  },
  modules: {},
});

const notyfInstance = new Notyf({
  duration: 4000,
  position: {
    x: 'right',
    y: 'top',
  },
});

store.commit('setNotyf', notyfInstance);

setStore(store);

export default store;

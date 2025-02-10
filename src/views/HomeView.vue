<template>
  <div class="main__container">
    <h1>My Desks</h1>
    <div class="desk__container">
      <BoardComponent v-for="board in boards" :key="board.id" :board="board" />
    </div>
    <div class="main__container-add-button">
        <button @click="showModal = true" class="button__add">
          <span class="material-symbols-outlined">
          add_circle
          </span>
        </button>

        <Modal v-if="showModal" @close="showModal = false" :formSchema="formSchema" />
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from '@/components/Modal.vue';
import BoardComponent from '../components/Board.vue';

export default Vue.extend({
  name: 'HomeView',
  components: {
    BoardComponent,
    Modal,
  },
  data() {
    return {
      showModal: false,
      formSchema: {
        formName: 'Add New Desk',
        fields: [
          {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
            minLength: 3,
          },
        ],
        actionName: 'createBoard',
        submitUrlPath: '/board',
      },
    };
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
  },
  async mounted() {
    await this.$store.dispatch('getBoards');
  },
});
</script>

<style>
.main__container {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.desk__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}
.main__container-add-button {
  margin-top: 24px;
}
</style>

<template>
  <div>
    <h1>My Desks</h1>
    <div class="desk__container">
      <BoardComponent v-for="board in boards" :key="board.id" :board="board" />
      <div>
        <button @click="showModal = true" class="button__add">Add desk</button>

        <Modal v-if="showModal" @close="showModal = false" :formSchema="formSchema" />
      </div>
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
.desk__container {
  display: flex;
  gap: 30px;
}
</style>

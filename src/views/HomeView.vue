<template>
  <div>
    <h1>My Desks</h1>
    <div class="desk__container">
      <BoardComponent v-for="board in boards" :key="board.id" :board="board" />
      <div>
        <button @click="showModal = true" class="button__add">Add desk</button>

        <Modal v-if="showModal" @close="showModal = false">
          <template #header>
            <h3>Custom Header</h3>
          </template>
          <template #body>
            <p>Some custom content inside the modal.</p>
          </template>
          <template #footer>
            <button @click="showModal = false">Close</button>
          </template>
        </Modal>
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

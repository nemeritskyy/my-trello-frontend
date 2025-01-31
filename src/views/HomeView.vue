<template>
  <div>
    <h1>My Desks</h1>
    <div class="desk__container">
    <BoardComponent v-for="board in boards" :key="board.id" :board="board"/>
    <div>
      <button class="button__add">
        <span>Add Desk</span>
      </button>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BoardComponent from '../components/Board.vue';

export default Vue.extend({
  name: 'HomeView',
  components: {
    BoardComponent,
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

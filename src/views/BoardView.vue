<template>
  <div>
    <h1>{{ $store.state.board.title }}</h1>
    <div class="board__item">
      <div class="button__add">
        <span class="material-symbols-outlined">
          add_circle
        </span>
      </div>
      <ListComponent v-for="list in board && board.lists ? board.lists : []" :key="list.id"
      :title="list.title" :cards="list.cards" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ListComponent from '../components/List.vue';

export default Vue.extend({
  name: 'BoardView',
  components: {
    ListComponent,
  },
  computed: {
    board() {
      return this.$store.state.board;
    },
  },
  created() {
    this.$store.dispatch('getBoard', this.$route.params.board_id)
      .catch((err: Error) => {
        console.error('Error getting board:', err);
      });
  },
});
</script>

<style>
.board__item {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>

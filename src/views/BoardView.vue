<template>
  <div class="board__container">
    <LabelEditable
      v-model="boardTitle"
      name="title"
      :id="labelId"
    />
    <div class="board__item">
      <ListComponent v-for="list in board && board.lists ? board.lists : []" :key="list.id"
      :title="list.title" :cards="list.cards" />
      <div class="button__add">
        <span class="material-symbols-outlined">
          add_circle
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LabelEditable from '@/components/LabelEditable.vue';
import ListComponent from '../components/List.vue';

export default Vue.extend({
  name: 'BoardView',
  components: {
    ListComponent,
    LabelEditable,
  },
  computed: {
    board() {
      return this.$store.state.board;
    },
    boardTitle: {
      get() {
        return this.$store.state.board.title || '';
      },
    },
    labelId: {
      get() {
        return this.$route.params.board_id || 'default-id';
      },
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
.board__container {
  margin: 10px;
}
.board__item {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>

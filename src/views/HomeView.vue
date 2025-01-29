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
  data() {
    return {
      boards: [
        { id: 1, title: 'покупки' },
        { id: 2, title: 'подготовка к свадьбе' },
        { id: 3, title: 'разработка интернет-магазина' },
        { id: 4, title: 'курс по продвижению в соцсетях' },
      ],
    };
  },
});
</script>

<style>
.desk__container {
  display: flex;
  gap: 30px;
}
</style>

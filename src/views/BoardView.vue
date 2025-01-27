<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="board__item">
      <ListComponent v-for="list in lists" :key="list.id" :title="list.title" :cards="list.cards" />
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
import ListComponent from '../components/List.vue';

export default Vue.extend({
  name: 'BoardView',
  components: {
    ListComponent,
  },
  data() {
    return {
      title: 'Моя тестовая доска',
      lists: [
        {
          id: 1,
          title: 'Планы',
          cards: [
            { id: 1, title: 'помыть кота' },
            { id: 2, title: 'приготовить суп' },
            { id: 3, title: 'сходить в магазин' },
          ],
        },
        {
          id: 2,
          title: 'В процессе',
          cards: [
            { id: 4, title: 'посмотреть сериал' },
          ],
        },
        {
          id: 3,
          title: 'Сделано',
          cards: [
            { id: 5, title: 'сделать домашку' },
            { id: 6, title: 'погулять с собакой' },
          ],
        },
      ],
    };
  },
});
</script>

<style>
.board__item {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.button__add {
  display: flex;
  text-align: center;
  background-color: lightgreen;
  padding: 15px;
  border: 1px solid crimson;
  border-radius: 5px;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>

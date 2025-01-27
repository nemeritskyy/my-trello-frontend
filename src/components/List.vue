<template>
    <table class="card__item">
    <th class="card__item-th">{{ title }}</th>
      <tr v-for="(card, index) in cards" :key="index" class="card__item-tr">
        <td>{{ card.title }}</td>
      </tr>
    </table>
</template>

<script lang="ts">
import Vue from 'vue';
import { ICard } from '@/common/interfaces/card';

export default Vue.extend({
  name: 'ListComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    cards: {
      type: Array as () => ICard[],
      required: true,
    },
  },
});
</script>

<style>
.card__item {
  display: block;
  background-color: lightpink;
  padding: 16px;
  border: 1px solid crimson;
  border-radius: 8px;
  border-collapse: collapse;
  box-shadow: 3px black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.card__item-th {
  display: flex;
  background-color: white;
  border-radius: 8px;
  height: 48px;
  align-items: center;
  justify-content: center;
}
.card__item-tr {
  border-bottom: 1px dashed black;
  height: 48px;
}
</style>

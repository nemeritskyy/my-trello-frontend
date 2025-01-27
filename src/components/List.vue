<template>
    <table class="card__container-item">
    <th class="card__container-item-th">{{ title }}</th>
      <tr v-for="(card, index) in cards" :key="index">
        {{ card.title }}
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
.card__container-item {
  display: block;
  background-color: lightpink;
  padding: 15px;
  border: 1px solid crimson;
  border-radius: 5px;
}
.card__container-item-th {
  text-decoration: underline;
  background-color: white;
  border-radius: 5px;
}
</style>

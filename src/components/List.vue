<template>
  <table class="card__item">
    <th class="card__item-th">{{ title }}</th>
    <CardComponent v-for="card in cards" :key="card.id" :card="card" />
    <tr>
      <td>
      <button class="button__add">
        <span>Add Card</span>
      </button>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import Vue from 'vue';
import { ICard } from '@/common/interfaces/card';
import CardComponent from './Card.vue';

export default Vue.extend({
  name: 'ListComponent',
  components: {
    CardComponent,
  },
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
.card__item-th {
  display: flex;
  background-color: white;
  border-radius: 8px;
  height: 48px;
  align-items: center;
  justify-content: center;
}
</style>

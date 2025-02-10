<template>
    <div class="card__item-tr">
      <span>{{ card.title }}</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ICard } from '@/common/interfaces/card';

export default Vue.extend({
  name: 'CardComponent',
  props: {
    card: {
      type: Object as () => ICard,
      required: true,
    },
  },
});
</script>

<style>
.card__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: lightpink;
  padding: 16px;
  border: 1px solid crimson;
  border-radius: 8px;
  border-collapse: collapse;
  box-shadow: 3px black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  min-width: 200px;
  row-gap: 16px;
}

.card__item-tr {
  border-bottom: 1px dashed black;
  height: 48px;
}
</style>

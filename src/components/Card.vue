<template>
    <div class="card__item-row break-word">
      {{ card.title }}
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
  justify-content: flex-start;
  background-color: lightpink;
  padding: 16px;
  border: 1px solid crimson;
  border-radius: 8px;
  border-collapse: collapse;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 30px;
  min-width: 200px;
  max-width: 200px;
  row-gap: 16px;
}

.card__item-row {
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 16px;
  border-bottom: 1px dashed black;
}
</style>

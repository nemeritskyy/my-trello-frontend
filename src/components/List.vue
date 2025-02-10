<template>
<div class="card__item">
  <div class="card__item-title">
    <LabelEditable
      v-model="listTitle"
      name="title"
      :id="id"
      :api="`board/${$route.params.board_id}/list/${id}`"
      custom-class="cart__item-label"
    />
  </div>
  <div v-for="card in cards" :key="card.id">
    <CardComponent :card="card" />
  </div>
  <div class="card__item-footer">
    <button class="button__add">
      <span>Add Card</span>
    </button>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ICard } from '@/common/interfaces/card';
import CardComponent from './Card.vue';
import LabelEditable from './LabelEditable.vue';

export default Vue.extend({
  name: 'ListComponent',
  components: {
    LabelEditable,
    CardComponent,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: [String, Number],
      required: true,
    },
    cards: {
      type: Array as () => ICard[],
      required: true,
    },
  },
  computed: {
    listTitle: {
      get() : string {
        return this.title;
      },
      set(newTitle: string) {
        this.$emit('update:title', newTitle);
      },
    },
  },
});
</script>

<style>
.card__item-footer {
  display: flex;
  justify-content: center;
}
.cart__item-label {
  font-size: 18px;
  max-width: 150px;
}
.cart__item-label:hover {
  background-color: lightgray;
  font-size: 18px;
}
.card__item-title {
  margin: 0px;
  padding: 0px;
  display: flex;
  background-color: white;
  border-radius: 8px;
  height: 48px;
  align-items: center;
  justify-content: center;
}
</style>

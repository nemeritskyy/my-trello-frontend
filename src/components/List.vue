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
    <button @click="showModal = true" class="button__add">
      <span>Add Card</span>
    </button>
  </div>
  <Modal v-if="showModal" @close="showModal = false" :formSchema="formSchema" />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from '@/components/Modal.vue';
import { ICard } from '@/common/interfaces/card';
import CardComponent from './Card.vue';
import LabelEditable from './LabelEditable.vue';

export default Vue.extend({
  name: 'ListComponent',
  components: {
    LabelEditable,
    CardComponent,
    Modal,
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
  data() {
    return {
      showModal: false,
      formSchema: {
        formName: `Add New Card to ${this.title}`,
        fields: [
          {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
            minLength: 3,
          },
          {
            name: 'list_id',
            label: 'List ID',
            visible: false,
            value: this.id,
          },
          {
            name: 'board_id',
            label: 'Board ID',
            visible: false,
            value: this.$route.params.board_id,
          },
          {
            name: 'position',
            label: 'Position',
            visible: false,
            value: ((this.$store.state.board.lists?.find(
              (list: { id: number; cards: any[] }) => list.id === this.id,
            )?.cards?.length || 0) + 1), // need to fix last position logic
          },
        ],
        actionName: 'createCard',
        submitUrlPath: `/board/${this.$route.params.board_id}/card`,
      },
    };
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

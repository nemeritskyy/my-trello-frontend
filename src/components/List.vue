<template>
  <div class="card__item">
    <div class="card__item-title">
      <LabelEditable
        v-model="listTitle"
        name="title"
        :id="id"
        :api="`board/${$route.params.board_id}/list/${id}`"
        :minLength="formSchema.fields[0]?.minLength ?? $store.state.defaultMinLength"
        custom-class="cart__item-label"
      />
    </div>
    <div v-for="card in cards" :key="card.id">
      <CardComponent :card="card"/>
    </div>
    <div class="card__item-footer">
      <button @click="openModal" class="button__add">
        <span>Add Card</span>
      </button>
    </div>
    <Modal v-if="showModal" @close="showModal = false" :formSchema="formSchema"/>
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
          },
        ],
        actionName: 'createCard',
        submitUrlPath: `/board/${this.$route.params.board_id}/card`,
      },
    };
  },
  computed: {
    listTitle: {
      get(): string {
        return this.title;
      },
    },
  },
  methods: {
    getNextPosition(): number {
      const lists = this.$store.state.board.lists?.find(
        (list: { id: number; cards: ICard[] }) => list.id === this.id,
      );
      if (!lists || !lists.cards || lists.cards.length === 0) {
        return 0;
      }
      const lastPosition = Math.max(...lists.cards.map((card: ICard) => card.position));
      return lastPosition + 1;
    },
    openModal() {
      const positionField = this.formSchema.fields.find((field) => field.name === 'position');
      if (positionField) {
        positionField.value = this.getNextPosition();
      }
      this.showModal = true;
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
  margin: 0;
  padding: 0;
  display: flex;
  background-color: white;
  border-radius: 8px;
  min-height: 48px;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <div class="card__item" :id="'container-' + id"
       @dragenter.prevent="onDragEnter"
  >
    <div class="card__item-footer">
      <button @click="openModal" class="button__add">
        <span>Create Card</span>
      </button>
    </div>
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
    <div v-for="card in cards" :key="card.id"
         :id="`card-${card.id}`"
         class="card__item-row break-word"
         draggable="true"
         @dragstart="onDragStart($event, card.id)"
         @dragover="onDragOver($event)"
         @dragend.prevent="onDragEnd">
      {{ card.title }}
    </div>
    <Modal v-if="showModal" @close="showModal = false" :formSchema="formSchema"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from '@/components/Modal.vue';
import { ICard } from '@/common/interfaces/card';
import LabelEditable from './LabelEditable.vue';

export default Vue.extend({
  name: 'ListComponent',
  components: {
    LabelEditable,
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
    draggingIndex: {
      get(): string {
        return this.$store.state.draggingElement;
      },
      set(newDraggableElement: string) {
        this.$store.commit('setDraggingElement', newDraggableElement);
      },
    },
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
    onDragStart(event: DragEvent, cardId: string) {
      this.draggingIndex = cardId;
      const draggedItem = event.target as HTMLElement;
      if (draggedItem) {
        setTimeout(() => draggedItem.classList.add('drag__item-clear'), 0);
      }
    },
    onDragEnd(event: DragEvent) {
      const draggedItem = event.target as HTMLElement;
      if (draggedItem) {
        draggedItem.classList.remove('hidden', 'drag__item-clear');
      }
    },
    onDragEnter(event: DragEvent) {
      const container = event.currentTarget as HTMLElement;
      const draggedItem = document.getElementById(`card-${this.draggingIndex}`);
      if (!draggedItem) return;
      if (draggedItem.parentElement !== container) {
        // Join into new container
        draggedItem.parentElement?.removeChild(draggedItem);
        container.appendChild(draggedItem);
      }
    },
    onDragOver(event: DragEvent) {
      const targetItem = event.target as HTMLElement;
      if (targetItem.id) {
        if (this.cards.some((el) => el.id === Number(targetItem.id.substring(5)))) {
          const draggedItem = document.getElementById(`card-${this.draggingIndex}`);
          if (draggedItem) {
            const rect = targetItem.getBoundingClientRect();
            const middle = rect.top + rect.height / 2;

            if (event.clientY < middle) { // Add item above
              targetItem.parentNode?.insertBefore(draggedItem, targetItem);
            } else {
              const nextElement = targetItem.nextElementSibling;
              if (nextElement) {
                targetItem.parentNode?.insertBefore(draggedItem, nextElement);
              } else { // Add item below
                targetItem.parentNode?.appendChild(draggedItem);
              }
            }
          }
        }
      }
    },
  },
});
</script>

<style lang="scss">
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

.card__item-container {
  display: block;
}

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
  padding: 10px;
  background-color: #ffed83;
  border-radius: 5px;
  border: 1px solid transparent;
}

.dragging {
  cursor: move;
  opacity: 0.5;
  background-color: #e73c7e;
}

.drag__item-clear {
  background-color: lightgray;
  box-shadow: 2px 2px 5px rgba(144, 144, 144, 0.39);
  border: 1px solid gray;
  color: transparent;
}

.hidden {
  display: none;
}

.drag-rotate {
  transform: rotate(-3deg) skew(5deg);
}
</style>

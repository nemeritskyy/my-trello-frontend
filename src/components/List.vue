<template>
  <div>
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
    <div class="card__item" :id="'container-' + id"
         @dragenter.prevent="onDragEnter"
    >
      <button v-for="card in cards" :key="card.id"
              :id="`card-${card.id}`"
              class="card__item-row break-word"
              :style="{ backgroundColor: card.color }"
              draggable="true"
              @click="editCard(card.id)"
              @dragstart="onDragStart($event, card.id)"
              @dragover="onDragOver($event)"
              @dragend.prevent="onDragEnd">
        {{ card.title }}
        <button class="button_rmv material-symbols-outlined"
                @click.stop="removeCard(card.id)">delete
        </button>
      </button>

      <Modal v-if="showModal" @close="showModal = false" :formSchema="formSchema"/>
      <Modal v-if="cardModal" @close="handleModalClose" :formSchema="formCardSchema"/>
    </div>
    <div class="card__item-footer">
      <button @click="openModal" class="list-button__add">
        <span>Create Card</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from '@/components/Modal.vue';
import { ICard } from '@/common/interfaces/card';
import { IList } from '@/common/interfaces/list';
import { IDragItem } from '@/common/interfaces/dragItem';
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
      cardModal: false,
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
            name: 'description',
            label: 'Description',
            type: 'textarea',
            required: false,
            minLength: 3,
          },
          {
            name: 'color',
            label: 'Color',
            type: 'color',
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
      formCardSchema: {
        formName: 'Edit Card',
        fields: [
          {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
            minLength: 3,
            value: '',
          },
          {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            required: false,
            minLength: 3,
            value: '',
          },
          {
            name: 'color',
            label: 'Color',
            type: 'color',
            required: true,
            value: '',
          },
          {
            name: 'list_id',
            label: 'List ID',
            visible: false,
            value: this.id,
          },
        ],
        actionName: 'editCard',
        submitUrlPath: '',
        boardId: this.$route.params.board_id,
      },
    };
  },
  mounted() {
    const cardId = Number(this.$route.params.card_id);
    if (!this.cardModal && cardId && this.cards.some((card) => card.id === cardId)) {
      this.editCard(cardId);
    }
  },
  computed: {
    draggingElementDetails() {
      return this.$store.getters.draggingElementDetails;
    },
    updatedPosition: {
      get(): number {
        return this.$store.state.newPosition;
      },
    },
    listTitle: {
      get(): string {
        return this.title;
      },
    },
  },
  methods: {
    handleModalClose() {
      this.cardModal = false;
      this.updateRoute();
      this.$store.commit('clearEditableCard');
      console.log(this.$store.state.editableCard);
    },
    updateRoute() {
      this.$router.push(`/board/${this.$route.params.board_id}`);
    },
    updateDraggingElement(newDetails: Partial<IDragItem>) {
      this.$store.commit('updateDraggingElementDetails', newDetails);
    },
    setDraggingElement(newDetails: IDragItem | null) {
      this.$store.commit('setDraggingElementDetails', newDetails);
    },
    getNextPosition(): number {
      const lists = this.$store.state.board.lists?.find(
        (list: IList) => list.id === this.id,
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
    editCard(cardId: number) {
      this.formCardSchema.submitUrlPath = `/board/${this.$route.params.board_id}/card/${cardId}`;

      const boardId = this.$route.params.board_id;
      const targetPath = `/board/${boardId}/card/${cardId}`;

      if (this.$route.path !== targetPath) {
        this.$router.push(targetPath);
      }
      console.log(`CardID:${cardId}`);
      console.log(this.$store.state.board);
      this.$store.commit('setEditableCard', this.findCardById(cardId));
      this.formCardSchema.fields[0].value = this.$store.state.editableCard?.title;
      this.formCardSchema.fields[1].value = this.$store.state.editableCard?.description;
      this.formCardSchema.fields[2].value = this.$store.state.editableCard?.color;
      this.cardModal = true;
    },
    removeCard(cardId: number) {
      this.$store.dispatch('removeCard', {
        boardId: this.$route.params.board_id,
        cardId,
      });
    },
    findCardById(cardId: number) {
      return this.$store.state.board.lists
        .map((list: IList) => list.cards?.find((card: ICard) => card.id === cardId))
        .find((foundCard: ICard | undefined) => foundCard !== undefined) || null;
    },
    onDragStart(event: DragEvent, cardId: string) {
      const draggedItem = event.target as HTMLElement;
      this.updateDraggingElement(
        {
          id: Number(cardId),
          parentContainer: Number((draggedItem.parentElement as HTMLElement).id.substring(10)),
          newContainerId: Number((draggedItem.parentElement as HTMLElement).id.substring(10)),
          position: this.findCardById(Number(cardId)).position,
        },
      );
      if (draggedItem) {
        setTimeout(() => draggedItem.classList.add('drag__item-clear'), 0);
      }
    },
    onDragEnd(event: DragEvent) {
      const draggedHTMLItem = event.target as HTMLElement;
      if (!draggedHTMLItem) return;

      draggedHTMLItem.classList.remove('hidden', 'drag__item-clear');

      const {
        id,
        parentContainer,
        position,
        newContainerId,
        newPosition,
      } = this.draggingElementDetails;
      if (position == null || newPosition == null) return;

      const oldList = this.getListWithCardContainerId(parentContainer);
      const newList = this.getListWithCardContainerId(newContainerId);

      if (!oldList || !newList) return;

      oldList.cards = oldList.cards ?? [];
      newList.cards = newList.cards ?? [];
      const draggingCard = oldList.cards.find((card: ICard) => card.id === id);
      if (!draggingCard) return;

      // Remove card from old container
      oldList.cards = oldList.cards.filter((card: ICard) => card.id !== id);

      const updatedCards = [];

      if (parentContainer === newContainerId) {
        oldList.cards = oldList.cards
          .filter((card: ICard) => card.id !== draggingCard.id)
          .map((card: ICard) => {
            if (newPosition > position) {
              // Move down
              if (card.position > position && card.position <= newPosition) {
                const updatedCard = {
                  ...card,
                  position: card.position - 1,
                };
                updatedCards.push({
                  id: updatedCard.id,
                  position: updatedCard.position,
                  list_id: parentContainer,
                });
                return updatedCard;
              }
            } else if (newPosition < position) {
              // Move up
              if (card.position >= newPosition && card.position < position) {
                const updatedCard = {
                  ...card,
                  position: card.position + 1,
                };
                updatedCards.push({
                  id: updatedCard.id,
                  position: updatedCard.position,
                  list_id: parentContainer,
                });
                return updatedCard;
              }
            }
            return card;
          });

        // Update position for dragging card
        draggingCard.position = newPosition;
        oldList.cards.splice(newPosition, 0, draggingCard);

        updatedCards.push({
          id: draggingCard.id,
          position: newPosition,
          list_id: parentContainer,
        });
      } else {
        // If the card moved into new container
        // Update positions for other cards in the old container
        oldList.cards = oldList.cards.map((card: ICard) => {
          if (card.position > position) {
            const updatedCard = {
              ...card,
              position: card.position - 1,
            };
            updatedCards.push({
              id: updatedCard.id,
              position: updatedCard.position,
              list_id: parentContainer,
            });
            return updatedCard;
          }
          return card; // Without changes
        });

        // Add card into new container with new position
        const insertPosition = newPosition !== undefined ? newPosition : newList.cards.length;

        newList.cards.splice(insertPosition, 0, {
          ...draggingCard,
          position: insertPosition,
        });

        // Update positions in the new container
        newList.cards = newList.cards.map((card: ICard, index: number) => {
          if (card.position !== index) {
            const updatedCard = {
              ...card,
              position: index,
            };
            updatedCards.push({
              id: updatedCard.id,
              position: updatedCard.position,
              list_id: newContainerId,
            });
            return updatedCard;
          }
          return card; // Without changes
        });

        // Details for old container
        updatedCards.push({
          id: draggingCard.id,
          position,
          list_id: parentContainer,
        });

        // Details for new container
        updatedCards.push({
          id: draggingCard.id,
          position: insertPosition,
          list_id: newContainerId,
        });
      }

      this.$store.dispatch('updateCardsInAPI', {
        boardId: this.$route.params.board_id,
        cardsToUpdate: updatedCards,
      });

      this.setDraggingElement(null);
    },
    onDragEnter(event: DragEvent) {
      const container = event.currentTarget as HTMLElement;
      const draggedItem = document.getElementById(`card-${this.draggingElementDetails.id}`);
      if (!draggedItem) return;
      if (draggedItem.parentElement !== container) {
        // Join into new container
        this.updateDraggingElement(
          {
            newContainerId: Number(container.id.substring(10)),
            newPosition: container.children.length,
          },
        );
        draggedItem.parentElement?.removeChild(draggedItem);
        container.appendChild(draggedItem);
      }
    },
    onDragOver(event: DragEvent) {
      event.preventDefault();

      const targetItem = event.target as HTMLElement;
      if (!targetItem.id) return;

      const targetId = Number(targetItem.id.replace('card-', ''));
      if (!this.cards.some((el) => el.id === targetId)) return;

      const draggedItem = document.getElementById(`card-${this.draggingElementDetails.id}`);
      if (!draggedItem || draggedItem === targetItem) {
        return;
      }

      const rect = targetItem.getBoundingClientRect();
      const middleY = rect.top + rect.height / 2;
      const parent = targetItem.parentNode;
      if (!parent) return;

      const childrenArray = Array.from(parent.children);
      let newPosition = childrenArray.indexOf(targetItem);

      if (event.clientY > middleY) {
        newPosition += 1;
      }

      // If already on the same place
      const currentIndex = childrenArray.indexOf(draggedItem);
      if (newPosition === currentIndex) return;

      // Paste item into new place
      const referenceElement = newPosition < childrenArray.length
        ? childrenArray[newPosition] : null;
      parent.insertBefore(draggedItem, referenceElement);

      // Recalculate indexes after inserting
      const updatedChildrenArray = Array.from(parent.children);
      const updatedPosition = updatedChildrenArray.indexOf(draggedItem);

      this.setNewPosition(updatedPosition);
    },
    getListWithCardContainerId(listId: number) {
      return this.$store.state.board.lists?.find((list: IList) => list.id === listId);
    },
    setNewPosition(newPosition: number) {
      this.updateDraggingElement(
        {
          newPosition,
        },
      );
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
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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
  //border: 1px solid crimson;
  //border-radius: 8px;
  border-collapse: collapse;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 30px;
  min-width: 200px;
  max-width: 200px;
  row-gap: 16px;
}

.card__item-row {
  position: relative;
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #ffed83;
  border-radius: 5px;
  border: 1px solid transparent;
  cursor: text;
}

.list-button__add {
  width: 100%;
  display: flex;
  border-radius: 0px;
  background-color: #9BC53D;
  padding: 16px;
  align-items: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 0;
  cursor: pointer;
  text-transform: uppercase;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;

  &:hover {
    color: #FDE74C;
  }
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

  .button_rmv {
    visibility: hidden;
  }
}

.hidden {
  display: none;
}

.drag-rotate {
  transform: rotate(-3deg) skew(5deg);
}
</style>

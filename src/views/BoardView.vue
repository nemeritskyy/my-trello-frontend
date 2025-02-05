<template>
  <div class="board__container">
    <LabelEditable
      v-model="boardTitle"
      name="title"
      :id="labelId"
    />
    <div class="board__item">
      <ListComponent v-for="list in board && board.lists ? board.lists : []" :key="list.id"
      :title="list.title" :cards="list.cards" />
      <button @click="showModal = true" class="button__add">
          <span class="material-symbols-outlined">
          add_circle
          </span>
      </button>

      <Modal v-if="showModal" @close="showModal = false" :formSchema="formSchema" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from '@/components/Modal.vue';
import LabelEditable from '@/components/LabelEditable.vue';
import ListComponent from '../components/List.vue';

export default Vue.extend({
  name: 'BoardView',
  components: {
    ListComponent,
    LabelEditable,
    Modal,
  },
  data() {
    return {
      showModal: false,
      formSchema: {
        formName: 'Add New List',
        fields: [
          {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
            minLength: 3,
          },
          {
            name: 'position',
            label: 'Position',
            visible: false,
            value: (this.$store.state.board.lists?.length || 0) + 1,
          },
          {
            name: 'id',
            label: 'Board ID',
            visible: false,
            value: this.$route.params.board_id,
          },
        ],
        actionName: 'createList',
        submitUrlPath: `/board/${this.$route.params.board_id}/list`,
      },
    };
  },
  computed: {
    board() {
      return this.$store.state.board;
    },
    boardTitle: {
      get() {
        return this.$store.state.board.title || '';
      },
    },
    labelId: {
      get() {
        return this.$route.params.board_id || 'default-id';
      },
    },
  },
  created() {
    this.$store.dispatch('getBoard', this.$route.params.board_id)
      .catch((err: Error) => {
        console.error('Error getting board:', err);
      });
  },
});
</script>

<style>
.board__container {
  margin: 10px;
}
.board__item {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>

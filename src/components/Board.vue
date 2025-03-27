<template>
    <router-link :to="'/board/' + $props.board.id">
        <div class="desk__item">
            {{ $props.board.title }}
        </div>
    </router-link>
</template>

<script lang="ts">

import Vue from 'vue';
import { IBoard } from '@/common/interfaces/board';

export default Vue.extend({
  name: 'BoardComponent',
  props: {
    board: {
      type: Object as () => IBoard,
      required: true,
    },
  },
});
</script>

<style>
.desk__item {
  text-align: center;
  background-color: whitesmoke;
  padding: 16px;
  border-radius: 8px;
  border-collapse: collapse;
  box-shadow: grey 0 3px 8px;
  min-width: 200px;
  gap: 30px;
  color: brown;
  text-transform: uppercase;
}
.desk__item:hover {
  box-shadow: #23d5ab 0 3px 8px;
}
</style>

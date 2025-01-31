<template>
    <router-link :to="'/board/' + $props.board.id">
        <div class="desk__item">
            {{ $props.board.title }}
        </div>
    </router-link>
</template>

<script lang="ts">

import Vue from 'vue';
import { BoardIExtendedItem } from '@/common/interfaces/board';

export default Vue.extend({
  name: 'BoardComponent',
  props: {
    board: {
      type: Object as () => BoardIExtendedItem,
      required: true,
    },
  },
});
</script>

<style>
.desk__item {
  display: flex;
  align-items: center;
  background-color: lightpink;
  padding: 16px;
  border: 1px solid crimson;
  border-radius: 8px;
  border-collapse: collapse;
  box-shadow: 3px black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  min-width: 200px;
  gap: 30px;
  color: white;
}
</style>

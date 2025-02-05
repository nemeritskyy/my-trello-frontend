<template>
  <div>
    <label :for="id">
      <input
        ref="editableInput"
        :id="id"
        :value="inputValue"
        :name="name"
        class="label__editable"
        :class="{'editing': isEditing, 'not-editing': !isEditing}"
        @focus="onFocus"
        @blur="offFocus"
        @keyup.enter="offFocus"
        @input="onInput"
        type="text"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'EditableInput',
  props: {
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      inputValue: this.value,
    };
  },
  methods: {
    onFocus() {
      this.isEditing = true;
    },
    offFocus(event: Event) {
      if (this.isEditing) {
        this.isEditing = false;
        this.updateTitle();
      }
    },
    updateTitle() {
      this.$store.dispatch('updateBoardTitle', { boardId: this.id, fieldName: this.name, newValue: this.inputValue });
      this.$emit('update', this.inputValue);
      (this.$refs.editableInput as HTMLInputElement).blur();
    },
    onInput(event: Event) {
      this.inputValue = (event.target as HTMLInputElement).value;
    },
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal;
    },
  },
});
</script>

<style type="css">
.label__editable {
  font-size: 36px;
  margin-bottom: 10px;
  text-align: center;
}
.editing {
  border: 2px solid black;
  background-color: white;
  max-width: 300px;
}
.not-editing {
  border: 2px solid transparent;
  background: transparent;
  max-width: none;
}
</style>

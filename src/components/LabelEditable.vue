<template>
  <div>
    <label :for="id">
      <input
        ref="editableInput"
        :id="id"
        :api="api"
        :value="inputValue"
        :name="name"
        :class="[ customClass, { editing: isEditing, 'not-editing': !isEditing } ]"
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
      type: [String, Number],
      required: true,
    },
    api: {
      type: String,
      required: true,
    },
    customClass: {
      type: String,
      required: false,
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
      this.$store.dispatch(
        'updateTitle',
        { apiPath: this.api, fieldName: this.name, newValue: this.inputValue },
      );
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
  margin: 10px;
  text-align: center;
  max-width: 300px;
}
.label__editable:hover {
  max-width: 300px;
}
.editing {
  border: 2px solid black;
  background-color: white;
}
.not-editing {
  border: 2px solid transparent;
  background: transparent;
  max-width: none;
}
.not-editing:hover {
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.2);
}
</style>

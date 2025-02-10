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
        :minlength="minLength"
        @focus="onFocus"
        @blur="onBlur"
        @keyup.enter="onEnter"
        @input="onInput"
        type="text"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

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
    minLength: {
      type: Number,
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
      notyf: new Notyf({
        duration: 4000,
        position: { x: 'right', y: 'top' },
      }),
    };
  },
  methods: {
    onBlur(event: Event) {
      this.offFocus(event);
    },
    onEnter(event: KeyboardEvent) {
      const editableInput = event.target as HTMLInputElement;
      editableInput.blur();
    },
    onFocus() {
      this.isEditing = true;
    },
    offFocus(event: Event) {
      const editableInput = event.target as HTMLInputElement;
      if (this.isEditing && (this.inputValue.length >= this.minLength)) {
        editableInput.style.borderColor = 'transparent';
        this.isEditing = false;
        this.updateTitle();
      } else {
        editableInput.style.borderColor = 'red';
        this.notyf.error(`Minimal length for this input is ${this.minLength} symbol(s)`);
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

<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="field in formSchema.fields" :key="field.name" class="form-group">
      <label :for="field.name"
        >{{ field.label }}
        <input
          v-if="field.type !== 'textarea'"
          :type="field.type"
          :id="field.name"
          v-model="formData[field.name]"
          :required="field.required"
          :minlength="field.minLength"
          :maxlength="field.maxLength"
          :min="field.min"
          :max="field.max"
      /></label>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'MyForm',
  props: {
    formSchema: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: this.createInitialFormData(),
    };
  },
  methods: {
    createInitialFormData() {
      const data = {};
      this.formSchema.fields.forEach((field) => {
        data[field.name] = '';
      });
      return data;
    },
    async handleSubmit() {
      await this.$store.dispatch('createBoard', {
        submitUrlPath: this.formSchema.submitUrlPath,
        boardData: this.formData,
      });
      this.$emit('submit', this.formData);
    },
  },
};
</script>

<style type="css">
.form-group {
  margin-bottom: 15px;
}
</style>

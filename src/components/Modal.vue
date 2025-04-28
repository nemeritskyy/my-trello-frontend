<template>
  <transition name="modal">
    <div class="modal-mask" @click.self="$emit('close')" @keydown.esc="$emit('close')" tabindex="0"
     id="modal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>{{ formSchema.formName }}</h3>
          </div>

          <div class="modal-body">
            <MyForm :formSchema="formSchema" @submit="handleFormSubmit"/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import MyForm from './MyForm.vue';

export default {
  name: 'ModalDialog',
  components: { MyForm },
  props: {
    formSchema: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.focus();
    }
  },
  methods: {
    handleFormSubmit(formData) {
      this.$emit('close');
    },
  },
};
</script>

<style type="scss">
#modal {
  h3 {
    font-size: 32px;
  }

  label {
    text-transform: uppercase;
    display: flex;
    gap: 10px;
    background-color: rgb(231, 231, 231);
    padding: 10px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
  }

  input {
    height: 24px;
    padding-left: 10px;
  }
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-header h3 {
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}
</style>

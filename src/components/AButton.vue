<script>
export default {
  name: 'AButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    pending: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#2C4DB4',
    },
  },
  methods: {
    emitClick() {
      if (this.disabled || this.pending) return;
      this.$emit('click');
    },
  },
  computed: {
    buttonColor() {
      return {
        'background-color': this.color,
      };
    },
  },
};
</script>

<template>
  <button
    v-if="disabled"
    class="button button-disabled"
    @click="emitClick"
    :style="buttonColor"
  >
    <slot />
  </button>

  <button
    v-else-if="pending"
    class="button button-pending"
    @click="emitClick"
    :style="buttonColor"
  >
    <slot />
  </button>

  <button
    v-else
    class="button"
    @click="emitClick"
    :style="buttonColor"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  display: inline-block;
  border: 0;
  border-radius: 30px;
  color: white;
  transition: 0.5s background-color ease;
  padding: 0.5rem 1rem;
  outline: none;
  cursor: pointer;

  &-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &-pending {
    cursor: wait;
    opacity: 0.6;
  }
}
</style>

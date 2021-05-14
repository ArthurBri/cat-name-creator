<template>
  <div class="options">
    <div class="option">
      <p class="text-md text-pink-dark mb-1">Voyelles</p>
      <input
        @change="() => handleVowels"
        class="option-input"
        type="number"
        :max="length"
        min="0"
        placeholder="-"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

export default defineComponent({
  name: "Options",
  emits: ["optionsUpdate"],
  props: {
    length: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const handleVowels = (vowelsEvent: HTMLElementEvent<HTMLInputElement>) => {
      const { target } = vowelsEvent;
      if (target) {
        emit("optionsUpdate", { vowels: parseInt(target.value) });
      }
    };

    return { handleVowels };
  },
});
</script>

<style scoped>
.options {
  @apply flex mt-10;
}

.option-input {
  @apply rounded-md text-xl p-2 w-16 focus:ring-2 ring-gray-300 outline-none;
}
</style>

<template>
  <button class="generate-name" @click="handleNameGeneration">Générer</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import generateName from "../core/generateName";

export default defineComponent({
  name: "Generate",
  emits: ["catName"],
  props: {
    length: {
      type: Number,
      required: true,
    },
    fixedLetters: {
      type: Object,
    },
    options: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const handleNameGeneration = () => {
      emit(
        "catName",
        generateName(props.length, props.options?.vowels, props.fixedLetters)
      );
    };
    return { handleNameGeneration };
  },
});
</script>

<style scoped>
.generate-name {
  @apply rounded-md p-5 py-2 bg-pink-dark w-32 text-xl text-white outline-none focus:ring-2 ring-gray-400;
  touch-action: none;
}
</style>

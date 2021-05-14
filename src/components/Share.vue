<template>
  <button class="share-button" @click="handleShare">Partager</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Share",
  setup() {
    const handleShare = () => {
      alert("Mais cest genial !");
    };

    return { handleShare };
  },
});
</script>

<style scoped>
.share-button {
  @apply rounded-md p-3 py-2 bg-orange text-white outline-none focus:ring-2 ring-gray-400 h-10;
}
</style>

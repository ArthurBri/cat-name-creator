<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-2xl lg:text-5xl text-pink-dark text-center">
      Cat name creator
    </h1>
    <span class="hidden lg:flex mt-3"
      >Créez un nom unique pour votre chat !</span
    >
    <Kitty class="logo" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import Kitty from "../assets/images/kitty.svg";

export default defineComponent({
  name: "Header",
  components: { Kitty },
  setup: () => {
    const count = ref(0);
    return { count };
  },
});
</script>

<style scoped>
.logo {
  @apply mt-4 lg:mt-10 h-10 lg:h-20;
}
</style>

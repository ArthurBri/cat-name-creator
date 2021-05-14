<template>
  <div class="wrapper">
    <Header />
    <CatName
      :name="catName"
      :fixed-letters="fixedLetters"
      @remove-last-letter="handleLetterRemove"
      @add-letter="handleLetterAdd"
      @lock-letter="handleLockLetter"
    />
    <div class="actions">
      <Generate
        @cat-name="handleCatName"
        :fixed-letters="fixedLetters"
        :options="options"
        :length="nameLength"
      />
      <!--<Share />-->
    </div>
    <Options @options-update="handleOptions" :length="nameLength" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Header from "./components/Header.vue";
import CatName from "./components/CatName.vue";
import Generate from "./components/Generate.vue";
import Share from "./components/Share.vue";
import Options from "./components/Options.vue";

import generateName from "./core/generateName";
import { getRandomLetter } from "./utils";

type fixedLetters = {
  [key: number]: string;
};

type Options = {
  vowels?: number;
};

export default defineComponent({
  name: "App",
  components: {
    Header,
    CatName,
    Generate,
    Options,
    Share,
  },
  setup() {
    const nameLength = ref<number>(5);
    const fixedLetters = ref<fixedLetters>({});
    const options = ref<Options>({});
    const catName = ref(generateName(nameLength.value));

    const handleLetterRemove = () => {
      nameLength.value--;
      fixedLetters.value = Object.keys(fixedLetters.value).reduce(
        (acc, key) =>
          key !== nameLength.value.toString(10)
            ? { ...acc, [key]: fixedLetters.value[key as any] }
            : acc,
        {}
      );
      catName.value = catName.value.slice(0, catName.value.length - 1);
    };

    const handleLetterAdd = () => {
      nameLength.value++;
      catName.value = catName.value + getRandomLetter();
    };

    const handleCatName = (newCatName: string) => {
      catName.value = newCatName;
    };

    const handleLockLetter = (letter: { [key: number]: string }) => {
      const letterIndex = Object.keys(letter)[0];
      const letterValue = Object.values(letter)[0];

      if (letterValue) {
        fixedLetters.value = { ...fixedLetters.value, ...letter };
      } else {
        fixedLetters.value = Object.keys(fixedLetters.value).reduce(
          (acc, key) =>
            key !== letterIndex
              ? { ...acc, [key]: fixedLetters.value[key as any] }
              : acc,
          {}
        );
      }
    };

    const handleOptions = (newOptions: Options) => {
      options.value = { ...options.value, ...newOptions };
    };

    return {
      catName,
      handleCatName,
      handleLetterRemove,
      handleLetterAdd,
      handleLockLetter,
      handleOptions,
      nameLength,
      fixedLetters,
      options,
    };
  },
});
</script>

<style>
h1 {
  @apply font-bubble;
  letter-spacing: 0.2rem;
}

#app {
  @apply bg-pink h-screen py-10 lg:py-20;
  touch-action: none;
}

.wrapper {
  @apply flex flex-col items-center;
}

.actions {
  @apply flex flex-col gap-6 justify-center items-center;
}
</style>

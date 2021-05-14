<template>
  <div class="name" v-text="name.toUpperCase()" />
  <transition-group name="letters-transition" tag="div" class="letters">
    <div
      class="letter-wrapper"
      v-for="(letter, index) in uppercaseName"
      :key="letter + index"
    >
      <div
        class="letter"
        :class="
          isFixedLetter(index) ? 'text-pink-dark locked' : 'text-gray-800'
        "
        v-text="letter"
        contenteditable
        @input="handleLetterInput($event, index)"
      />
      <div
        class="unlock"
        v-if="isFixedLetter(index)"
        @click="unlockLetter(index)"
      >
        <IconLock class="h-5 stroke-current p-0.5" />
      </div>
      <div class="lock" v-else @click="lockLetter(index)">
        <IconLock class="h-5 stroke-current p-0.5" />
      </div>
    </div>
  </transition-group>
  <div class="name-length-wrapper">
    <div
      :class="{ invisible: uppercaseName.length < 2 }"
      @click="removeLastLetter"
      @keydown="handleKeydown($event, removeLastLetter)"
      class="remove-letter"
      tabindex="0"
      role="button"
    >
      <IconMinus class="stroke-current stroke-2" />
    </div>
    <div class="name-length">
      {{ uppercaseName.length }}
      {{ uppercaseName.length > 1 ? "lettres" : "lettre" }}
    </div>
    <div
      :class="{ invisible: uppercaseName.length > 14 }"
      @click="addLetter"
      @keydown="handleKeydown($event, addLetter)"
      class="add-letter"
      tabindex="0"
      role="button"
      aria-pressed="true"
    >
      <IconPlus class="stroke-current stroke-2" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { setCaretToEnd } from "../utils/dom-utils";
import IconPlus from "../assets/icons/plus.svg";
import IconMinus from "../assets/icons/minus.svg";
import IconLock from "../assets/icons/lock.svg";

export default defineComponent({
  name: "CatName",
  components: { IconPlus, IconMinus, IconLock },
  emits: ["addLetter", "removeLastLetter", "lockLetter"],
  props: {
    name: {
      type: String,
      required: true,
    },
    fixedLetters: {
      type: Object,
      required: false,
    },
  },
  setup(props, { emit }) {
    const uppercaseName = computed(() => props.name.toUpperCase().split(""));
    const removeLastLetter = () => {
      emit("removeLastLetter");
    };
    const addLetter = () => {
      emit("addLetter");
    };

    const handleLetterInput = (e: any, index: number) => {
      const letterInput = e.target.innerHTML;
      if (letterInput.length > 1) {
        e.target.innerHTML = e.target.innerHTML[0].toUpperCase();
      } else if (letterInput.length <= 1 && props.name[index] !== letterInput) {
        emit("lockLetter", { [index]: e.target.innerHTML });
        e.target.innerHTML = e.target.innerHTML.toUpperCase();
      } else {
        e.target.innerHTML = e.target.innerHTML.toUpperCase();
      }
      setCaretToEnd(e.target);
    };

    const unlockLetter = (index: number) => {
      emit("lockLetter", { [index]: "" });
    };

    const lockLetter = (index: number) => {
      const letter = document.getElementsByClassName("letter")[index];
      emit("lockLetter", { [index]: letter.innerHTML });
    };

    const isFixedLetter = (index: number) =>
      Object.keys(props.fixedLetters || {}).includes(index.toString(10));

    const handleKeydown = (e: any, callback: () => void) => {
      // 32 = Space, 13 = Enter
      if ([32, 13].includes(e.keyCode)) {
        callback();
      }
    };

    return {
      uppercaseName,
      removeLastLetter,
      addLetter,
      handleLetterInput,
      isFixedLetter,
      handleKeydown,
      unlockLetter,
      lockLetter,
    };
  },
});
</script>

<style scoped>
.name {
  @apply font-bubble text-xl mt-6 lg:hidden;
  letter-spacing: 0.2rem;
}

.letters {
  @apply flex m-auto h-auto items-center w-64 lg:w-full overflow-scroll;
}

.letters::before,
.letters::after {
  content: "";
  margin: auto;
}

.letter-wrapper {
  @apply relative flex flex-col justify-center items-center mb-6 lg:my-6;
}

.letter {
  @apply flex text-sm lg:text-3xl justify-center items-center rounded-lg shadow-md
  p-3 lg:p-6 m-1 mt-6 bg-white h-12 w-8 lg:w-16 lg:h-24 outline-none focus:ring-2 ring-gray-300 font-bubble;
}

.letter.locked {
  animation: pop 0.2s ease-in;
}

.remove-letter {
  @apply rounded-md w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0 flex justify-center items-center cursor-pointer focus:ring-2
  ring-gray-300 outline-none shadow-sm p-1 border-pink-dark bg-white text-pink-dark lg:mt-0;
}

.add-letter {
  @apply rounded-md w-6 h-6 lg:w-8 lg:h-8 flex-shrink-0 flex justify-center items-center cursor-pointer focus:ring-2
  ring-gray-300 outline-none shadow-sm p-1 border-pink-dark bg-white text-pink-dark lg:mt-0;
}

.name-length-wrapper {
  @apply flex items-center justify-center gap-4 lg:mt-4 mb-10 select-none;
}

.name-length {
  @apply text-gray-400 w-32 text-center text-xl;
}

.unlock {
  @apply rounded-md bg-pink-dark w-6 h-6 text-white flex justify-center items-center cursor-pointer mt-2;
}

.lock {
  @apply rounded-md w-6 h-6 text-pink-dark flex justify-center items-center
  cursor-pointer mt-2 hover:bg-pink-dark hover:text-white transition duration-200;
}

@keyframes pop {
  50% {
    transform: scale(1.1);
  }
}

.letters-transition-enter-from,
.letters-transition-leave-to {
  opacity: 0;
}

.letters-transition-leave-active {
  position: absolute;
}

.letters-transition-move {
  transition: transform 0.3s ease;
}
</style>

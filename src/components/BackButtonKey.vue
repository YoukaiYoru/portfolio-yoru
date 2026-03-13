<template>
<button
      type="button"
      class="relative top-3 right-17
       mb-2 flex items-center gap-2 text-sm tracking-[0.2em] text-slate-200 cursor-pointer transition-colors duration-200 hover:text-white focus:outline-none"
      @click="goHome"
>
            <span class=" [&_svg]:h-4.25 [&_svg]:w-4.25 [&_svg]:fill-current" v-html="buttonSvg"></span>
            <span class="text-lg  font-route">Back to home</span>
      </button>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import buttonSvg from "@assets/button.svg?raw";

const goHome = () => {
      window.location.href = "/";
};

const handleKeydown = (event) => {
      if (event.key.toLowerCase() === "b") {
            goHome();
      }
};

onMounted(() => {
      window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleKeydown);
});

</script>
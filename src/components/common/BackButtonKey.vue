<template>
<button
      type="button"
      class="hidden shrink-0 cursor-pointer items-center gap-2 text-sm tracking-[0.2em] text-slate-200 transition-colors duration-200 hover:text-white focus:outline-none md:flex"
      @click="goHome"
>
            <span class="[&_svg]:h-3.5 [&_svg]:w-3.5 sm:[&_svg]:h-4 sm:[&_svg]:w-4 md:[&_svg]:h-4.25 md:[&_svg]:w-4.25 [&_svg]:fill-current" v-html="buttonSvg"></span>
            <span class="text-sm sm:text-base md:text-lg font-route">Back to home</span>
      </button>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { navigate } from "astro:transitions/client";
import buttonSvg from "@assets/icons/button.svg?raw";

// client-router nav keeps transition:persist islands (music player) alive
const goHome = () => {
      navigate("/");
};

const handleKeydown = (event) => {
      if (event.key.toLowerCase() !== "b") return;
      // ignore while typing or while a dialog (audio modal) is open
      const t = event.target;
      const tag = t?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || t?.isContentEditable) return;
      if (document.querySelector('[role="dialog"]')) return;
      goHome();
};

onMounted(() => {
      window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleKeydown);
});

</script>

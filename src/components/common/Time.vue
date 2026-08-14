<template>
      <div class="flex shrink-0 items-center gap-2 text-sm tracking-[0.2em] text-slate-200">
            <span class="[&_svg]:h-3.5 [&_svg]:w-3.5 sm:[&_svg]:h-4 sm:[&_svg]:w-4 md:[&_svg]:h-4.25 md:[&_svg]:w-4.25 [&_svg]:fill-current" v-html="clockSvg"></span>
            <span class="text-sm sm:text-base md:text-lg font-route">{{ currentTime }}</span>
      </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import clockSvg from "@assets/icons/clock.svg?raw";

const currentTime = ref("");
let timerId;

const formatTime = () => {
      const now = new Date();
      currentTime.value = now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
      });
};

onMounted(() => {
      formatTime();
      timerId = window.setInterval(formatTime, 1000);
});

onBeforeUnmount(() => {
      if (timerId) {
            window.clearInterval(timerId);
      }
});
</script>

<template>
      <div class="relative top-3 ml-18 mb-2 flex items-center gap-2 text-sm tracking-[0.2em] text-slate-200">
            <span class=" [&_svg]:h-4.25 [&_svg]:w-4.25 [&_svg]:fill-current" v-html="clockSvg"></span>
            <span class="text-lg  font-route">{{ currentTime }}</span>
      </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import clockSvg from "@assets/clock.svg?raw";

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

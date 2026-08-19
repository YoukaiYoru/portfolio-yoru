<script setup lang="ts">
import { useLang } from '@lib/lang';
const { lang, toggleLang } = useLang();
</script>

<template>
  <button
    class="lang-toggle"
    @click="toggleLang"
    :aria-label="lang === 'es' ? 'Switch to English' : 'Cambiar a español'"
  >
    <span class="lang-toggle__label">{{ lang === 'es' ? 'EN' : 'ES' }}</span>
  </button>
</template>

<style scoped>
.lang-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border: 1px solid #43bbe8;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, rgba(67, 187, 232, 0.2), rgba(2, 11, 22, 0.92));
  color: #7fe6ff;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 0 8px rgba(29, 170, 231, 0.3);
  font-family: 'Route159-SemiBold', sans-serif;
}
.lang-toggle:hover {
  color: #fff;
  border-color: #7fe6ff;
  box-shadow: 0 0 16px rgba(29, 170, 231, 0.7), inset 0 0 8px rgba(67, 187, 232, 0.3);
  transform: scale(1.08);
}
.lang-toggle__label {
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  font-weight: 600;
  line-height: 1;
}
</style>

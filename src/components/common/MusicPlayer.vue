<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

interface Props {
  src?: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  src: '/audio/track.mp3',
  title: 'Anxious Heart',
});

const STORAGE_KEY = 'ff-player';

const audio = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const volume = ref(0.6);
const muted = ref(false);
const showSettings = ref(false);

const volumePct = computed(() => Math.round((muted.value ? 0 : volume.value) * 100));

function applyVolume() {
  const el = audio.value;
  if (!el) return;
  el.volume = volume.value;
  el.muted = muted.value;
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ volume: volume.value, muted: muted.value }));
  } catch {
    /* ignore */
  }
}

function restore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw) as { muted?: boolean };
    if (typeof data.muted === 'boolean') muted.value = data.muted;
  } catch {
    /* ignore */
  }
}

function tryAutoplay() {
  const el = audio.value;
  if (!el) return;
  el.play().catch(() => {
    const resume = () => {
      el.play().catch(() => {});
      window.removeEventListener('pointerdown', resume);
      window.removeEventListener('keydown', resume);
    };
    window.addEventListener('pointerdown', resume);
    window.addEventListener('keydown', resume);
  });
}

async function togglePlay() {
  const el = audio.value;
  if (!el) return;
  if (el.paused) {
    try {
      await el.play();
    } catch {
      /* autoplay blocked until user gesture; this IS the gesture so usually fine */
    }
  } else {
    el.pause();
  }
}

function seek(delta: number) {
  const el = audio.value;
  if (!el) return;
  const dur = el.duration;
  let t = el.currentTime + delta;
  if (Number.isFinite(dur) && dur > 0) {
    t = ((t % dur) + dur) % dur;
  } else if (t < 0) {
    t = 0;
  }
  el.currentTime = t;
}

function toggleMute() {
  muted.value = !muted.value;
  applyVolume();
  persist();
}

function onVolumeInput(e: Event) {
  volume.value = Number((e.target as HTMLInputElement).value) / 100;
  if (volume.value > 0) muted.value = false;
  applyVolume();
  persist();
}

function openSettings() {
  showSettings.value = true;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') showSettings.value = false;
}

function onDocClick(e: MouseEvent) {
  const trigger = (e.target as HTMLElement | null)?.closest('[data-audio-settings]');
  if (trigger) {
    e.preventDefault();
    openSettings();
  }
}

watch(volume, applyVolume);

function onPlay() { isPlaying.value = true; }
function onPause() { isPlaying.value = false; }
function onEnded() { isPlaying.value = false; }

onMounted(() => {
  restore();
  const el = audio.value;
  if (el) {
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onEnded);
    applyVolume();
    tryAutoplay();
  }
  document.addEventListener('click', onDocClick);
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  const el = audio.value;
  if (el) {
    el.removeEventListener('play', onPlay);
    el.removeEventListener('pause', onPause);
    el.removeEventListener('ended', onEnded);
  }
  document.removeEventListener('click', onDocClick);
  window.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <div class="ff-player">
    <audio ref="audio" :src="props.src" loop preload="metadata"></audio>

    <div class="ff-bar" :class="{ playing: isPlaying, muted }">
      <button class="ff-btn" :aria-label="isPlaying ? 'Pause music' : 'Play music'" @click="togglePlay">
        <svg v-if="isPlaying" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <rect x="6" y="5" width="4" height="14" fill="currentColor" />
          <rect x="14" y="5" width="4" height="14" fill="currentColor" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M7 5l12 7-12 7z" fill="currentColor" />
        </svg>
      </button>

      <span class="ff-eq" aria-hidden="true">
        <i></i><i></i><i></i><i></i>
      </span>

      <div class="ff-marquee">
        <div class="ff-marquee-track">
          <span>{{ props.title }}</span>
          <span aria-hidden="true">{{ props.title }}</span>
        </div>
      </div>
    </div>

    <div v-if="showSettings" class="ff-modal-backdrop" @click.self="showSettings = false">
        <div class="ff-modal" role="dialog" aria-modal="true" aria-label="Audio settings">
          <header class="ff-modal-head">
            <span>AUDIO</span>
            <button class="ff-x" aria-label="Close" @click="showSettings = false">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" fill="none" />
              </svg>
            </button>
          </header>

          <div class="ff-orb-wrap">
            <div class="ff-orb" :class="{ muted }">
              <div class="ff-orb-fill" :style="{ height: volumePct + '%' }"></div>
              <span class="ff-orb-val">{{ muted ? 'X' : volumePct }}</span>
            </div>
            <span class="ff-orb-label">{{ muted ? 'SILENCE' : 'VOLUME' }}</span>
          </div>

          <input class="ff-slider" type="range" min="0" max="100" :value="volumePct"
            :disabled="muted" aria-label="Volume" @input="onVolumeInput" />

          <div class="ff-seek">
            <button class="ff-seek-btn" aria-label="Back 10 seconds" @click="seek(-10)">&#171; 10s</button>
            <button class="ff-seek-btn" :aria-label="isPlaying ? 'Pause' : 'Play'" @click="togglePlay">
              {{ isPlaying ? 'PAUSE' : 'PLAY' }}
            </button>
            <button class="ff-seek-btn" aria-label="Forward 10 seconds" @click="seek(10)">10s &#187;</button>
          </div>

          <button class="ff-mute" :class="{ active: muted }" @click="toggleMute">
            {{ muted ? 'UNMUTE' : 'MUTE' }}
          </button>
        </div>
    </div>
  </div>
</template>

<style scoped>
.ff-player {
  --glow: #1daae7;
  --glow-soft: #0eadc3;
  --line: #1896eb;
  --panel: #040e1a;
}

.ff-bar {
  position: fixed;
  top: 6px;
  right: 6px;
  z-index: 80;
  display: flex;
  align-items: center;
  gap: 10px;
  width: min(280px, 60vw);
  height: 26px;
}
.ff-bar.muted {
  filter: grayscale(0.7) brightness(0.75);
}

@media (min-width: 768px) {
  .ff-bar { right: 6px; }
}

@media (max-width: 767px) {
  .ff-bar { top: 6px; right: 8px; left: 8.75rem; width: auto; }
  .ff-marquee-track { font-size: 11px; letter-spacing: 0.1em; }
}

@media (max-width: 359px) {
  .ff-bar { left: 4.25rem; }
}

@media (min-width: 1024px) {
  .ff-bar { right: 6px; }
}

.ff-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 24px;
  height: 24px;
  padding: 0;
  color: #7fe6ff;
  background: radial-gradient(circle at 35% 30%, rgba(127, 230, 255, 0.25), rgba(4, 14, 26, 0.92));
  border: 2px solid var(--glow);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.25s ease;
}
.ff-btn:hover {
  color: #fff;
  box-shadow: 0 0 16px rgba(29, 170, 231, 0.85);
}

.ff-eq {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 16px;
  flex: none;
}
.ff-eq i {
  display: block;
  width: 3px;
  height: 5px;
  background: #7fe6ff;
  box-shadow: 0 0 6px rgba(127, 230, 255, 0.8);
  animation: none;
}
.ff-bar.playing .ff-eq i {
  animation: ff-eq 0.9s ease-in-out infinite;
}
.ff-bar.playing .ff-eq i:nth-child(2) { animation-delay: 0.15s; }
.ff-bar.playing .ff-eq i:nth-child(3) { animation-delay: 0.3s; }
.ff-bar.playing .ff-eq i:nth-child(4) { animation-delay: 0.45s; }

@keyframes ff-eq {
  0%, 100% { height: 4px; }
  50% { height: 15px; }
}

.ff-marquee {
  position: relative;
  flex: 1 1 auto;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
.ff-marquee-track {
  display: inline-flex;
  white-space: nowrap;
  font-size: 14px;
  letter-spacing: 0.16em;
  color: #c8dff0;
  text-shadow: 0 0 8px rgba(29, 170, 231, 0.6);
  animation: ff-marquee 28s linear infinite;
}
.ff-marquee-track span { padding-right: 48px; }
.ff-bar:not(.playing) .ff-marquee-track {
  animation-play-state: paused;
}
@keyframes ff-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.ff-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(2, 8, 16, 0.7);
  backdrop-filter: blur(3px);
}
.ff-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 260px;
  padding: 20px;
  font-family: 'Optima', sans-serif;
  color: #c8dff0;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 6px;
  box-shadow: 0 0 22px rgba(29, 170, 231, 0.55), inset 0 0 30px rgba(0, 70, 214, 0.2);
}
.ff-modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: #4bcdff;
  font-size: 14px;
  letter-spacing: 0.18em;
}
.ff-x {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  color: var(--glow);
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.ff-x:hover {
  color: #fff;
  border-color: var(--glow);
  box-shadow: 0 0 10px rgba(29, 170, 231, 0.6);
}

.ff-orb-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.ff-orb {
  position: relative;
  width: 84px;
  height: 84px;
  border-radius: 50%;
  overflow: hidden;
  background: radial-gradient(circle at 35% 30%, rgba(127, 230, 255, 0.25), rgba(4, 14, 26, 0.9));
  border: 2px solid #1daae7;
  box-shadow: 0 0 18px rgba(29, 170, 231, 0.6), inset 0 0 16px rgba(29, 170, 231, 0.4);
  transition: all 0.25s ease;
}
.ff-orb.muted {
  filter: grayscale(0.8) brightness(0.6);
  border-color: #5a8aaa;
}
.ff-orb-fill {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: linear-gradient(180deg, #7fe6ff, #1daae7 60%, #0046d6);
  box-shadow: 0 0 18px rgba(127, 230, 255, 0.8);
  transition: height 0.15s ease;
}
.ff-orb-val {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.9);
}
.ff-orb-label {
  font-size: 12px;
  letter-spacing: 0.18em;
  color: #4bcdff;
}

.ff-slider {
  width: 100%;
  height: 4px;
  appearance: none;
  background: linear-gradient(90deg, #2b8fd4, #7fe6ff);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
.ff-slider:disabled {
  filter: grayscale(0.9) brightness(0.6);
  cursor: not-allowed;
}
.ff-slider::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  background: #fff;
  transform: rotate(45deg);
  box-shadow: 0 0 8px rgba(127, 230, 255, 0.9);
  cursor: pointer;
}
.ff-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border: none;
  background: #fff;
  box-shadow: 0 0 8px rgba(127, 230, 255, 0.9);
  cursor: pointer;
}

.ff-seek {
  display: flex;
  gap: 8px;
  width: 100%;
}
.ff-seek-btn {
  flex: 1;
  padding: 7px 4px;
  font-family: 'Optima', sans-serif;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: #c8dff0;
  background: linear-gradient(90deg, rgba(29, 170, 231, 0.15), transparent);
  border: 1px solid #1896eb;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.ff-seek-btn:hover {
  color: #fff;
  box-shadow: 0 0 12px rgba(29, 170, 231, 0.6);
}

.ff-mute {
  width: 100%;
  padding: 8px;
  font-family: 'Optima', sans-serif;
  font-size: 13px;
  letter-spacing: 0.14em;
  color: #c8dff0;
  background: linear-gradient(90deg, rgba(29, 170, 231, 0.15), transparent);
  border: 1px solid #1896eb;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.ff-mute:hover {
  color: #fff;
  box-shadow: 0 0 12px rgba(29, 170, 231, 0.6);
}
.ff-mute.active {
  color: #fff;
  background: linear-gradient(90deg, rgba(204, 51, 51, 0.4), transparent);
  border-color: #e05a5a;
  box-shadow: 0 0 12px rgba(224, 90, 90, 0.6);
}
</style>

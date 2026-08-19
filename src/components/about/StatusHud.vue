<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useLang } from '@lib/lang';

interface Props {
  birthday?: string;
  en?: number;
  enMax?: number;
  foc?: number;
  focMax?: number;
  skl?: number;
  careerLevel?: number;
  width?: string;
}

const props = withDefaults(defineProps<Props>(), {
  birthday: '',
  enMax: 100,
  foc: 100,
  focMax: 100,
  skl: 12,
  careerLevel: 2,
  width: 'min(900px, 120vw)',
});

const { lang, t } = useLang();

const root = ref<HTMLElement | null>(null);
const now = ref(new Date());
const dayBarWidth = 206;
const dayMs = 86400000;
let intervalId: number | undefined;
let tipElement: HTMLElement | null = null;

function getBirthdayParts(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  return { year, month, day };
}

function buildDate(year: number, month: number, day: number) {
  return new Date(year, month - 1, day);
}

const ageStats = computed(() => {
  const current = now.value;

  if (!props.birthday) {
    return {
      age: '--',
      totalDays: 365,
      elapsedDays: 0,
      remainingDays: 0,
      nextAge: 0,
      lastBirthday: current,
      nextBirthday: current,
      totalMs: 1,
      elapsedMs: 0,
    };
  }

  const birthday = getBirthdayParts(props.birthday);

  let age = current.getFullYear() - birthday.year;
  const hadBirthday =
    current.getMonth() > birthday.month - 1 ||
    (current.getMonth() === birthday.month - 1 && current.getDate() >= birthday.day);

  if (!hadBirthday) {
    age--;
  }

  let lastBirthday = buildDate(current.getFullYear(), birthday.month, birthday.day);
  if (current < lastBirthday) {
    lastBirthday = buildDate(current.getFullYear() - 1, birthday.month, birthday.day);
  }

  const nextBirthday = buildDate(lastBirthday.getFullYear() + 1, birthday.month, birthday.day);

  const totalMs = Math.max(1, nextBirthday.getTime() - lastBirthday.getTime());
  const elapsedMs = Math.min(totalMs, Math.max(0, current.getTime() - lastBirthday.getTime()));

  const totalDays = Math.max(1, Math.round(totalMs / dayMs));
  const elapsedDays = Math.min(totalDays, Math.max(0, Math.floor(elapsedMs / dayMs)));
  const remainingDays = Math.max(0, totalDays - elapsedDays);

  return {
    age,
    totalDays,
    elapsedDays,
    remainingDays,
    nextAge: age + 1,
    lastBirthday,
    nextBirthday,
    totalMs,
    elapsedMs,
  };
});

const dayProgress = computed(() => {
  const { elapsedDays = 0, totalDays = 1 } = ageStats.value as any;
  const frac = totalDays > 0 ? elapsedDays / totalDays : 0;
  const width = Math.max(2, Math.min(dayBarWidth, dayBarWidth * frac));
  return width;
});

const daysTooltip = computed(() => {
  if (!props.birthday) return t('hud.bdaypending');
  return `${ageStats.value.remainingDays} ${t('hud.daysleft')} ${ageStats.value.nextAge}`;
});

const energyStats = computed(() => {
  if (props.en !== undefined) {
    return {
      value: props.en,
      tooltip: `${t('hud.energy')} · ${props.en}/${props.enMax}`,
    };
  }

  const hour = now.value.getHours();
  const hourLabel = now.value.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (hour < 6) {
    return { value: 0, tooltip: `${t('hud.resting')} · ${hourLabel}` };
  }

  if (hour < 9) {
    return { value: 25 + ((hour - 6) * 15), tooltip: `${t('hud.waking')} · ${hourLabel}` };
  }

  if (hour < 12) {
    return { value: 70 + ((hour - 9) * 10), tooltip: `${t('hud.ready')} · ${hourLabel}` };
  }

  if (hour < 18) {
    return { value: 100, tooltip: `${t('hud.max')} · ${hourLabel}` };
  }

  if (hour < 21) {
    return { value: 85 - ((hour - 18) * 15), tooltip: `${t('hud.productive')} · ${hourLabel}` };
  }

  return { value: 40 - ((hour - 21) * 15), tooltip: `${t('hud.ending')} · ${hourLabel}` };
});

const focusTooltip = computed(() =>
  `${t('hud.focus')} · ${props.foc}/${props.focMax}`,
);

const skillsTooltip = computed(() =>
  `${props.skl} ${t('hud.skills')}`,
);

function updateNow() {
  now.value = new Date();
}

onMounted(() => {
  updateNow();
  intervalId = window.setInterval(updateNow, 60000);

  const element = root.value;
  if (!element) {
    return;
  }

  const tip = element.querySelector('.tip') as HTMLElement | null;
  if (!tip) {
    return;
  }
  tipElement = tip;

  document.body.appendChild(tip);

  const show = (target: Element) => {
    const text = target.getAttribute('data-tip');
    if (!text) {
      return;
    }

    tip.textContent = text;
    tip.classList.add('show');

    const targetRect = (target as SVGGraphicsElement).getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();
    const center = targetRect.left + targetRect.width / 2;
    const boundedCenter = Math.max(
      tipRect.width / 2 + 8,
      Math.min(window.innerWidth - tipRect.width / 2 - 8, center),
    );
    tip.style.left = `${boundedCenter}px`;
    tip.style.top = `${targetRect.top - 10}px`;
    tip.style.transform = 'translate(-50%,-100%)';
  };

  const hide = () => tip.classList.remove('show');

  element.querySelectorAll('.abbr').forEach((item) => {
    item.addEventListener('pointerenter', () => show(item));
    item.addEventListener('pointerleave', hide);
    item.addEventListener('focus', () => show(item));
    item.addEventListener('blur', hide);
  });
});

onUnmounted(() => {
  if (intervalId !== undefined) {
    window.clearInterval(intervalId);
  }
  tipElement?.remove();
  tipElement = null;
});
</script>

<template>
  <div ref="root" class="status-hud" :style="{ width: props.width }" :data-birthday="props.birthday">
    <div class="tip" role="tooltip"></div>

    <svg viewBox="0 0 540 640" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sh-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="sh-glowText" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="sh-panelFill" gradientUnits="userSpaceOnUse" cx="118" cy="235" r="250">
          <stop offset="0.35" stop-color="#004687" stop-opacity="0.85" />
          <stop offset="1" stop-color="#004687" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="sh-expFill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#2b8fd4" />
          <stop offset="1" stop-color="#7fe6ff" />
        </linearGradient>
        <radialGradient id="sh-borderGrad" gradientUnits="userSpaceOnUse" cx="118" cy="235" r="208">
          <stop offset="0" stop-color="#5fd4ff" stop-opacity="1" />
          <stop offset="0.4" stop-color="#5fd4ff" stop-opacity="0.72" />
          <stop offset="0.74" stop-color="#5fd4ff" stop-opacity="0.32" />
          <stop offset="1" stop-color="#5fd4ff" stop-opacity="0" />
        </radialGradient>
        <g id="sh-diamond">
          <rect x="-5" y="-5" width="10" height="10" transform="rotate(45)" fill="none" stroke="var(--glow)" stroke-width="1.4" />
        </g>
      </defs>

      <polygon points="348,15 518,15 518,560 418,560 118,235" fill="url(#sh-panelFill)" />

      <polygon
        points="348,15 518,15 518,560 418,560 118,235"
        fill="none"
        stroke="url(#sh-borderGrad)"
        stroke-width="2.4"
        stroke-linejoin="round"
        stroke-linecap="round"
        filter="url(#sh-glow)"
      />

      <g filter="url(#sh-glow)" fill="none" stroke="var(--glow-soft)" stroke-width="var(--line-w)" stroke-linejoin="round" stroke-linecap="round">
        <line x1="284" y1="360" x2="78" y2="600" />
        <line x1="250" y1="400" x2="495" y2="400" />
        <line x1="200" y1="458" x2="458" y2="458" />
        <line x1="150" y1="516" x2="422" y2="516" />
        <use href="#sh-diamond" x="495" y="400" />
        <use href="#sh-diamond" x="458" y="458" />
        <use href="#sh-diamond" x="422" y="516" />
        <use href="#sh-diamond" x="78" y="600" />
        <use href="#sh-diamond" x="104" y="578" transform="scale(.7)" transform-origin="104 578" />
      </g>

      <g>
        <rect x="200" y="270" width="240" height="12" rx="0" fill="none" stroke="var(--glow-soft)" stroke-width="1.2" />
        <rect class="js-day-bar" x="202" y="272" :width="dayProgress" height="8" rx="0" fill="url(#sh-expFill)" filter="url(#sh-glow)" />
      </g>

      <g>
        <text class="t-label" filter="url(#sh-glowText)" x="345" y="142" text-anchor="middle">{{ t('hud.age') }}</text>
        <text class="t-big js-age" filter="url(#sh-glowText)" x="340" y="238" text-anchor="middle" font-size="94">{{ ageStats.age }}</text>
        <text v-if="props.birthday" class="t-cap abbr js-dias" x="454" y="284" tabindex="0" :data-tip="daysTooltip">{{ t('hud.days') }}<title>{{ t('hud.daystitle') }}</title></text>
        <text v-if="props.birthday" x="340" y="320" text-anchor="middle" font-size="28" font-weight="500">
          <tspan class="js-day-cur" fill="var(--ink)">{{ ageStats.elapsedDays }}</tspan><tspan class="t-dim js-day-max">/{{ ageStats.totalDays }}</tspan>
        </text>
        <text v-else class="t-cap" x="340" y="315" text-anchor="middle">{{ t('hud.confirm') }}</text>

        <text class="t-stat abbr" x="246" y="396" text-anchor="end" tabindex="0" :data-tip="energyStats.tooltip">EN<title>{{ energyStats.tooltip }}</title></text>
        <text class="t-big" x="296" y="400" font-size="50">
          <tspan>{{ energyStats.value }}</tspan><tspan class="t-dim" font-size="32"> /{{ props.enMax }}</tspan>
        </text>

        <text class="t-stat abbr" x="194" y="454" text-anchor="end" tabindex="0" :data-tip="focusTooltip">FOC<title>{{ focusTooltip }}</title></text>
        <text class="t-big" x="244" y="458" font-size="46">
          <tspan>{{ props.foc }}</tspan><tspan class="t-dim" font-size="28"> /{{ props.focMax }}</tspan>
        </text>

        <text class="t-stat abbr" x="144" y="512" text-anchor="end" tabindex="0" :data-tip="skillsTooltip">SKL<title>{{ skillsTooltip }}</title></text>
        <text class="t-big" x="194" y="516" font-size="42">{{ props.skl }}</text>

        <text class="t-tiny" x="278" y="550" text-anchor="middle">{{ t('hud.career') }} {{ props.careerLevel }}</text>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.status-hud {
  --glow: #4bcdff;
  --glow-soft: #2a9fe0;
  --ink: #ffffff;
  --ink-dim: #949492;
  --line-w: 1.4;

  position: relative;
  font-family: 'Optima', sans-serif;
  color: var(--ink);
}

svg {
  display: block;
  width: 100%;
  height: auto;
}

.t-label {
  font-size: 24px;
  letter-spacing: 0.1em;
  fill: #a0ecea;
}

.t-stat {
  font-size: 23px;
  letter-spacing: 0.05em;
  fill: #4bcdff;
}

.t-big {
  fill: var(--ink);
}

.t-dim {
  fill: var(--ink-dim);
  filter: none;
}

.t-tiny {
  font-size: 19px;
  letter-spacing: 0.1em;
  fill: var(--ink);
}

.t-cap {
  font-size: 15px;
  letter-spacing: 0.18em;
  fill: var(--ink);
}

.abbr {
  cursor: help;
}

.abbr:hover,
.abbr:focus {
  filter: brightness(1.35);
  outline: none;
}

.tip {
  position: fixed;
  z-index: 10;
  pointer-events: none;
  background: rgba(8, 22, 40, 0.96);
  color: var(--ink);
  border: 1px solid var(--glow);
  border-radius: 4px;
  padding: 5px 9px;
  font-family: 'Optima', sans-serif;
  font-size: 12px;
  letter-spacing: 0.03em;
  max-width: min(18rem, calc(100vw - 1rem));
  white-space: normal;
  text-align: center;
  box-shadow: 0 0 12px rgba(95, 212, 255, 0.5);
  opacity: 0;
  transition: opacity 0.12s ease;
}

.tip::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--glow);
}

.tip.show {
  opacity: 1;
}
</style>

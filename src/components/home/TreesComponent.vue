<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';
import { PCFSoftShadowMap, NoToneMapping, SRGBColorSpace } from 'three';
import ComputerModel from './ComputerModel.vue';
import { Smoke } from '@tresjs/cientos'

const gl = {
  clearColor: '#000000',
  shadows: true,
  alpha: true,
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <div class="tres-container mask-b-from-80% mask-b-to-90% md:mask-l-from-30% md:mask-l-to-70% lg:mask-l-from-60% lg:mask-l-to-90%">
    <TresCanvas v-bind="gl" class="w-full h-full">
          <TresPerspectiveCamera :position="[0, 0.5, 2.2]" />
          
          <TresAmbientLight :intensity="0.4" color="#ffffff" />
          
          <TresSpotLight 
            :position="[-1.6, 4, 1]" 
            :intensity="120" 
            :angle="0.12" 
            :penumbra="1"
            :decay="2" 
            color="white" 
            cast-shadow
            :shadow-mapSize-width="2048"
            :shadow-mapSize-height="2048"
          />
          
          <Suspense>
            <Smoke
                color="white"
                texture="/textures/smoke.svg"
                :opacity="0.16"
                :position="[-0.5, 0.65, 0.2]"
                :spread-y="0.9"
                :spread-x="1.5"
                :scale="2"
                :segments="32"
              />
          </Suspense>

          <Suspense>
            <ComputerModel :position="[0, 0, 0]" :rotation="[0, Math.PI / 1.2, 0]" cast-shadow />
          </Suspense>

          <TresMesh :position="[0, 0, 0]" :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
            <TresPlaneGeometry :args="[6, 3]"  />
            <TresMeshStandardMaterial color="#121212" :roughness="0.85" :metalness="0.1" />
          </TresMesh>
    </TresCanvas>
  </div>
</template>

<style scoped>
.tres-container {
  width: 100%;
  height: 45vh;
  min-height: 220px;
  max-height: 100vh;
  display: flex;
  align-items: flex-start;
  position: relative;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 2.5rem;
  box-sizing: border-box;
  /* mask-image: linear-gradient(to bottom, #121212 90%, transparent 100%); */

}

@media (min-width: 640px) {
  .tres-container {
    height: 60vh;
    min-height: 260px;
    max-height: 100vh;
  }
}

@media (min-width: 768px) {
  /* matches Tailwind's md: breakpoint where index.astro switches to a
     side-by-side grid; the model must go static/side here too or it
     overlaps the fixed bottom menu at 768-1023px widths */
  .tres-container {
    width: 100%;
    height: 100vh;
    min-height: 320px;
    max-height: 100vh;
    position: static;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
  }
}

@media (min-width: 1024px) {
  .tres-container {
    width: 100%;
    height: 100vh;
    min-height: 400px;
    max-height: 100vh;
    position: static;
    align-items: center;
    justify-content: flex-end;
    margin: 0;
  }
}

@media (min-width: 1440px) {
  .tres-container {
    width: 100%;
    height: 100vh;
    min-height: 400px;
    max-height: 100vh;
  }
}

canvas, .tres-container :global(canvas) {
  width: 100%;
  height: 100%;
  min-height: 220px;
  max-height: 100vh;
  display: block;
}

</style>

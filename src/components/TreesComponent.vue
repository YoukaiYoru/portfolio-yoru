<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';
import { PCFSoftShadowMap, NoToneMapping, SRGBColorSpace } from 'three';
import ComputerModel from './ComputerModel.vue';
import { Smoke, MeshReflectionMaterial  } from '@tresjs/cientos'

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
  <div class="tres-container mask-b-from-80% mask-b-to-90%  md:mask-l-from-60% md:mask-l-to-90% ">
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
            <TresGroup>
              <Smoke 
                color="white"
                :opacity="0.08"
                :position="[-0.5, 1.8, 0.2]"
                :spread-y="2"
                :spread-x="1.5"
                :scale="2"
                :segments="32"
              />
              <ComputerModel :position="[0, 0, 0]" :rotation="[0, Math.PI / 1.2, 0]" cast-shadow />
            </TresGroup>
          </Suspense>

          <TresMesh :position="[0, 0, 0]" :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
            <TresPlaneGeometry :args="[6, 3]"  />
            <MeshReflectionMaterial
            :resolution="320"
        :blurSize="[0, 0]"
        :mix="0.1"
        :blur-mix-rough="0.8"
        :blur-mix-smooth="0.6"
        color="#121212"
        mirror="0"
      />
          </TresMesh>
    </TresCanvas>
  </div>
</template>

<style scoped>
.tres-container {
  width: 100vw;
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
    height: 100vh;
    min-height: 260px;
    max-height: 100vh;
  }
}

@media (min-width: 768px) {
  .tres-container {
    height: 100vh;
    min-height: 320px;
    max-height: 100vh;
  }
}

@media (min-width: 1024px) {
  .tres-container {
    width: 75vw;
    height: 100vh;
    min-height: 400px;
    max-height: 100vh;
    position: static;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 0;
    margin-left: auto;
    margin-right: 0;
    margin-top: 0;
  }
}

@media (min-width: 1440px) {
  .tres-container {
    width: 60vw;
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
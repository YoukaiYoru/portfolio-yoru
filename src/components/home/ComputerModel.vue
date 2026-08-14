<script setup lang="ts">
import { GLTFModel } from '@tresjs/cientos'

const path = '/models/ComputerLow.glb'
</script>

<template>
  <GLTFModel :path="path" />
</template>

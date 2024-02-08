<template>
  <router-view />
</template>

<script setup>
import {RouterView } from 'vue-router'
import useScalePage from './hooks/useScalePage'

const option = {
  layoutX:1920,
  layoutY:1080,
  layoutRatio: 16 / 9
}
useScalePage(option)


</script>

<style scoped>

</style>

<script setup>
import QrCode from '../components/QrCode.vue';
</script>

<template>
  <div class="about">
    <QrCode />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

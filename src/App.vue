<script setup>
import { RouterLink, RouterView } from 'vue-router'
import QrCode from '@/components/QrCode.vue';
</script>

<template>
  <header>
    <div class="d-flex justify-content-center">
      <img alt="File-transfer logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
      <h1 class="display-1">File transfer</h1>
    </div>

    <QrCode class="m-5" />

    <div class="wrapper">
      <nav>
        <RouterLink class="btn btn-outline-success" to="/download">File download</RouterLink>
        <RouterLink class="btn btn-outline-success" to="/upload">File upload</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.display-1 {
  color: hsla(160, 100%, 37%, 1);
}

.logo {
  max-width: 100px;
  max-height: 100px;
}
</style>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import QrCode from '@/components/QrCode.vue';
</script>

<template>
  <div class="container green">
    <div class="row my-5">
      <div class="d-flex justify-content-center align-items-center">
        <img alt="File-transfer logo" class="logo mx-3" src="@/assets/logo.png" width="125" height="125" />
        <h1 class="display-1">File transfer</h1>
      </div>
    </div>

    <div class="row my-5">
      <QrCode />
    </div>

    <div class="row my-5"></div>
    <div class="d-sm-flex justify-content-evenly my-5">
      <RouterLink class="btn btn-outline-success" to="/download">File download</RouterLink>
      <RouterLink class="btn btn-outline-success" to="/upload">File upload</RouterLink>
    </div>

    <RouterView />

  </div>
</template>

<style scoped>
.logo {
  max-width: 100px;
  max-height: 100px;
}
</style>
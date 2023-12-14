<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="green d-flex  flex-column mx-auto align-items-center">

    <!-- LOGO -->
    <div class="d-flex justify-content-around align-items-center">
      <h1 class="display-1">File transfer</h1>
      <img alt="File transfer logo" class="logo mx-3" src="@/logo.png" width="125" height="125" />
    </div>

    <!-- DOWONLOAD/UPLOAD -->
    <div class="d-flex my-5">
      <RouterLink class="btn btn-outline-success flex-fill" to="/download">File download</RouterLink>
      <RouterLink class="btn btn-outline-success flex-fill" to="/upload">File upload</RouterLink>
    </div>

    <!-- ROUTERVIEW -->
    <RouterView />

  </div>
</template>

<style scoped>
.logo {
  max-width: 75px;
  max-height: 75px;
}
</style>
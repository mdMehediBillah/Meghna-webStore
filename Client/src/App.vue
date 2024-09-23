<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-gray-100">
    <SiteNavigation />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import SiteNavigation from "./components/Navigation/SiteNavigation.vue";
</script>

<style scoped></style>

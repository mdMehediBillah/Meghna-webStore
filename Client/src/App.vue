<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-gray-100">
    <!-- Conditionally render SiteNavigation, hide on admin page -->
    <SiteNavigation v-if="!isAdminPage" />
    <RouterView />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import SiteNavigation from "./components/Navigation/SiteNavigation.vue";
import { computed } from "vue";

// Access the current route
const route = useRoute();

// Check if the current route is the admin page
const isAdminPage = computed(() => {
  return ["admin", "adminProducts", "adminCategories", "adminOrders"].includes(
    route.name
  );
});
</script>

<style scoped></style>

<template>
  <section class="bg-gray-800">
    <!-- Admin Panel Header -->
    <header class="container flex justify-between">
      <!-- Logo -->
      <router-link
        :to="{ name: 'home' }"
        class="text-2xl font-bold flex items-center gap-2"
      >
        <div>
          <img src="../assets/photos/logo.png" alt="logo" class="h-12" />
        </div>
      </router-link>

      <div class="text-gray-200">
        <h1 class="text-xl font-semibold text-center my-8">Admin Panel</h1>
      </div>
    </header>

    <!-- Main Content Section -->
    <main class="flex bg-gray-600 justify-between">
      <!-- Sidebar for Admin Navigation -->
      <div class="flex flex-col p-2 gap-2 w-3/12 bg-gray-700">
        <router-link
          to="/admin/products"
          class="text-gray-200 hover:text-rose-300 mb-2 ml-4 inline-block border-b-2 pb-2 border-gray-500 hover:border-rose-300 px-2 mt-12"
          active-class="border-rose-300 text-rose-300"
        >
          Manage Products
        </router-link>

        <router-link
          to="/admin/adminCategories"
          class="text-gray-200 hover:text-rose-300 mb-2 ml-4 inline-block border-b-2 pb-2 border-gray-500 hover:border-rose-300 px-2"
          active-class="border-rose-300 text-rose-300"
        >
          Manage Categories
        </router-link>

        <router-link
          to="/admin/orders"
          class="text-gray-200 hover:text-rose-300 mb-2 ml-4 inline-block border-b-2 pb-2 border-gray-500 hover:border-rose-300 px-2"
          active-class="border-rose-300 text-rose-300"
        >
          Manage Orders
        </router-link>
      </div>

      <!-- Dynamic Content -->
      <div class="w-full">
        <router-view />
      </div>
    </main>
  </section>
</template>

<script setup></script>

<style scoped>
/* Scoped styles if needed */
</style>

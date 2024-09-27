<template>
  <div>
    <!-- Show loading state if still loading -->
    <div v-if="isLoading" class="text-center text-gray-500 py-8">
      <p>Loading category...</p>
    </div>

    <!-- Ensure category exists before rendering -->
    <router-link v-if="category" :to="`/collections/${category._id}`">
      <figure class="relative">
        <img
          :src="category.image"
          alt="category image"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <figcaption
          class="bg-overlay rounded-lg p-3 text-center text-gray-800 font-medium absolute inset-0 flex justify-center top-4"
        >
          <h4>{{ category.name }}</h4>
        </figcaption>
      </figure>
    </router-link>

    <!-- Fallback message if category is not available -->
    <div v-else class="text-center text-gray-500 py-8">
      <p>No category available.</p>
    </div>
  </div>
</template>

<script setup>
// Define props
const props = defineProps({
  category: {
    type: Object,
    required: true, // Expecting a single category object
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
/* Add styles if needed */
</style>

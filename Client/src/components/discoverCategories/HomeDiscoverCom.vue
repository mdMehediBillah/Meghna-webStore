<template>
  <section class="container mt-20">
    <h3 class="font-semibold text-xl py-2 my-4 uppercase">
      Discover our top Categories
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div
        v-for="category in categories"
        :key="category._id"
        class="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-md hover:scale-105 transition-transform ease-in-out duration-300"
      >
        <router-link :to="`/collections/${category._id}`">
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
      </div>
    </div>

    <!-- Display a message if categories are empty or failed to load -->
    <div
      v-if="!isLoading && categories.length === 0"
      class="text-center text-gray-500 py-8"
    >
      <p>No categories available at the moment. Please try again later.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCategoriesProductStore } from "../../stores/categoriesProductStore.js";

// Use the categories product store
const categoriesProductStore = useCategoriesProductStore();
const { fetchCategories, allCategories, isLoading, error } =
  categoriesProductStore;

// State for categories
const categories = ref([]);

// Fetch categories when the component is mounted
const fetchCategoriesData = async () => {
  await fetchCategories();
  // After fetching, assign categories from the store to the local variable
  categories.value = allCategories;
};

onMounted(fetchCategoriesData);
</script>

<style scoped>
/* Add any styles if necessary */
</style>

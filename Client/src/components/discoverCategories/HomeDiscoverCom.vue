<template>
  <section class="container mt-20">
    <h3 class="font-semibold text-xl py-2 my-4">Discover our top Categories</h3>
    <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <div
        v-for="category in categories"
        :key="category._id"
        class="bg-white rounded-lg overflow-hidden relative cursor-pointer hover:shadow-md relative hover:scale-105 transition-transform ease-in-out duration-300"
      >
        <img
          :src="category.image"
          alt="category image"
          class="w-full h-full object-cover"
        />
        <div
          class="bg-overlay rounded-lg p-3 text-center text-gray-800 font-medium absolute inset-0"
        >
          <h4 class="pt-4">{{ category.name }}</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

// State for categories
const categories = ref([]);

// API base URL
const url = import.meta.env.VITE_API_URL || "http://localhost:8090";

// Function to fetch categories from the API
const fetchCategories = async () => {
  try {
    const response = await fetch(`${url}/api/v1/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    categories.value = data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Fetch categories when the component is mounted
onMounted(fetchCategories);
</script>

<style scoped></style>

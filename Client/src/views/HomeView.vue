<template>
  <main>
    <HomeHero />
    <WeeklyOffer />

    <!-- Categories Section -->
    <section class="container mt-20">
      <h3 class="font-semibold text-xl py-2 my-4 uppercase">
        Discover our top Categories
      </h3>

      <!-- Display loading spinner or message when fetching categories -->
      <div v-if="isLoading" class="text-center text-gray-500 py-8">
        <p>Loading categories...</p>
      </div>

      <!-- Display categories grid if not loading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
          v-for="category in categories"
          :key="category._id"
          class="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-md hover:scale-105 transition-transform ease-in-out duration-300"
        >
          <!-- Pass category data to the HomeDiscoverCom component -->
          <HomeDiscoverCom :category="category" />
        </div>
      </div>

      <!-- Display message if no categories are available -->
      <div
        v-if="!isLoading && categories.length === 0"
        class="text-center text-gray-500 py-8"
      >
        <p>No categories available at the moment. Please try again later.</p>
      </div>

      <!-- Display error message if an error occurred during fetching -->
      <div v-if="error" class="text-center text-red-500 py-8">
        <p>{{ error }}</p>
      </div>
    </section>

    <NewArrivalCom />
    <AboutUsCom />
    <HomeAboutTextCom />
    <FooterComponents />
  </main>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useProductStore } from "@/stores/useProductStore.js";
import HomeDiscoverCom from "@/components/discoverCategories/HomeDiscoverCom.vue";
import HomeHero from "@/components/HeroSection/HomeHero.vue";
import WeeklyOffer from "@/components/OfferCards/WeeklyOffer.vue";
import NewArrivalCom from "@/components/NewArrivals/NewArrivalCom.vue";
import AboutUsCom from "@/components/aboutUs/AboutUsCom.vue";
import HomeAboutTextCom from "@/components/aboutUs/HomeAboutTextCom.vue";
import FooterComponents from "@/components/footer/FooterComponents.vue";

// Use the product store
const productStore = useProductStore();

// Categories data and state management
const allCategories = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Fetch categories from the API
const fetchCategories = async () => {
  isLoading.value = true;
  error.value = null; // Reset error state before fetching
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/categories`
    );
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();
    allCategories.value = data; // Assuming the response is an array of categories
  } catch (err) {
    error.value = err.message; // Set error message if fetch fails
  } finally {
    isLoading.value = false;
  }
};

// Fetch products (assumed to be needed elsewhere in the app)
const { fetchProducts } = productStore;

// Reactive computed property for categories
const categories = computed(() => allCategories.value);

// Fetch products and categories on component mount
onBeforeMount(() => {
  fetchProducts(); // Fetch products
  fetchCategories(); // Fetch categories
});
</script>

<style scoped>
/* Add any specific styles here if necessary */
</style>

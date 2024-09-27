<template>
  <main>
    <HomeHero />
    <WeeklyOffer />

    <!-- Add the HomeDiscoverCom component here -->
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
          <!-- Pass the category data to the HomeDiscoverCom component -->
          <HomeDiscoverCom :category="category" :isLoading="isLoading" />
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

    <NewArrivalCom />
    <AboutUsCom />
    <HomeAboutTextCom />
    <FooterComponents />
  </main>
</template>

<script setup>
import { onBeforeMount, computed } from "vue";
import { useProductStore } from "@/stores/useProductStore.js";
import { useCategoriesProductStore } from "@/stores/categoriesProductStore.js";

import HomeDiscoverCom from "@/components/discoverCategories/HomeDiscoverCom.vue";
import HomeHero from "../components/HeroSection/HomeHero.vue";
import WeeklyOffer from "../components/OfferCards/WeeklyOffer.vue";
import NewArrivalCom from "@/components/NewArrivals/NewArrivalCom.vue";
import AboutUsCom from "@/components/aboutUs/AboutUsCom.vue";
import HomeAboutTextCom from "@/components/aboutUs/HomeAboutTextCom.vue";
import FooterComponents from "@/components/footer/FooterComponents.vue";

// Use the product store and categories store
const productStore = useProductStore();
const categoriesProductStore = useCategoriesProductStore();

// Destructure the product store state and getters
const { fetchProducts, isLoading, error, allProducts, discountedProducts } =
  productStore;
const { fetchCategories, allCategories } = categoriesProductStore;

// Reactive categories computed from the categories store
const categories = computed(() => allCategories);

// Fetch products and categories on component mount
onBeforeMount(() => {
  fetchProducts(); // Call this to restore all products after refresh
  fetchCategories(); // Fetch categories as well
});
</script>

<template>
  <div>
    <!-- Header Section -->
    <div class="container mt-10 flex justify-between items-center flex-wrap">
      <h3 class="font-semibold text-xl py-2">Weekly Offers</h3>
      <div class="flex gap-8 items-center">
        <router-link
          to="/offers"
          class="text-gray-700 bg-rose-200 py-1 px-4 rounded-md cursor-pointer hover:bg-green-600 hover:text-white transition-colors duration-300"
        >
          View All
        </router-link>
        <!-- Navigation Arrows -->
        <div class="flex gap-6 items-center">
          <span @click="prevPage">
            <i
              class="fas fa-chevron-left cursor-pointer bg-green-200 rounded-xl px-4 py-2 hover:bg-green-300"
              :class="{
                'opacity-50 cursor-not-allowed': currentPage === 1,
              }"
            ></i>
          </span>
          <span @click="nextPage">
            <i
              class="fas fa-chevron-right cursor-pointer bg-green-200 rounded-xl px-4 py-2 hover:bg-green-300"
              :class="{
                'opacity-50 cursor-not-allowed': currentPage === totalPages,
              }"
            ></i>
          </span>
        </div>
      </div>
    </div>

    <!-- Offers Section with Animation -->
    <div class="overflow-hidden container">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${(currentPage - 1) * 100}%)` }"
      >
        <!-- Loop through all new arrivals -->
        <div
          class="col-md-4 w-full flex-shrink-0 px-2"
          v-for="product in paginatedNewArrivals"
          :key="product._id"
          style="flex-basis: calc(100% / 6)"
        >
          <SingleCard :product="product" />
        </div>
      </div>
    </div>

    <!-- Loading and Error Handling -->
    <div v-if="isLoading" class="text-center mt-5">Loading...</div>
    <div v-if="error" class="text-red-500 text-center mt-5">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../../stores/useProductStore.js";
import SingleCard from "../Cards/SingleCard.vue";

const currentPage = ref(1); // Start at page 1
const productsPerPage = ref(6); // Number of offers per page

// Use the product store
const productStore = useProductStore();

// Destructure the state and getters
const { fetchProducts, isLoading, error, discountedProducts } = productStore;
console.log(discountedProducts);

// Fetch products when the component is mounted
onMounted(() => {
  fetchProducts();
});

// Computed property to calculate the total number of pages
const totalPages = computed(() => {
  return Math.ceil(discountedProducts.length / productsPerPage.value);
});

// Computed property to get the paginated new arrivals
const paginatedNewArrivals = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage.value;
  return discountedProducts.slice(start, start + productsPerPage.value);
});

// Function to move to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Function to move to the previous page
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>

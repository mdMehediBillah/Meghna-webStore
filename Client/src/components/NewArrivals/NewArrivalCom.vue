<template>
  <div>
    <!-- Header Section -->
    <div class="container mt-10 flex justify-between items-center flex-wrap">
      <h3 class="font-semibold text-xl py-2">New Arrivals</h3>
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
          <span class="mr-2" @click="nextPage">
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
        <!-- Loop through all offers -->
        <div
          class="col-md-4 w-full flex-shrink-0 px-2"
          v-for="offer in weeklyOffer"
          :key="offer.id"
          style="flex-basis: calc(100% / 6)"
        >
          <OfferSingleCard :offer="offer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import offerData from "../../../Data/newProductData.json";
import OfferSingleCard from "../Cards/OfferSingleCard.vue";

// Reactive Properties
const weeklyOffer = ref(offerData || []);
const currentPage = ref(1); // Start at page 1
const offersPerPage = ref(6); // Number of offers per page

// Computed property to calculate the total number of pages
const totalPages = computed(() => {
  return Math.ceil(weeklyOffer.value.length / offersPerPage.value);
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
/* Add custom styles if needed */
.overflow-hidden {
  overflow: hidden;
}

.flex {
  display: flex;
}

.transition-transform {
  transition: transform 0.5s ease-in-out;
}
</style>

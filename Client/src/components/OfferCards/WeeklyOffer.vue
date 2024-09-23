<template>
  <div>
    <!-- Header Section -->
    <div class="container mt-10 flex justify-between items-center flex-wrap">
      <h3 class="font-semibold text-xl py-2">Weekly Offer</h3>
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
          style="flex-basis: calc(100% / 5)"
        >
          <OfferSingleCard :offer="offer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
// import offerData from "../../../Data/db.json";
import OfferSingleCard from "../Cards/OfferSingleCard.vue";

// Reactive Properties
const weeklyOffer = ref([]);
const currentPage = ref(1); // Start at page 1
const offersPerPage = ref(5); // Number of offers per page
const url = import.meta.env.VITE_API_URL || "http://localhost:8090";

// Fetch weekly offers from the API
const fetchWeeklyOffers = async () => {
  try {
    const response = await fetch(`${url}/api/v1/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch weekly offers");
    }
    const data = await response.json();
    weeklyOffer.value = data;
  } catch (error) {
    console.error("Error fetching weekly offers:", error);
  }
};

// Fetch weekly offers when the component is mounted
onMounted(fetchWeeklyOffers);

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

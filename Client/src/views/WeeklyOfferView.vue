<template>
  <div>
    <div class="container mt-10 flex justify-between items-center flex-wrap">
      <h3 class="font-semibold text-xl py-2">Weekly Offers</h3>
      <!-- Display the offer validity dates -->
      <p class="text-gray-700">{{ offerValidityText }}</p>
      <div class="flex gap-8 items-center">
        <div class="flex gap-6 items-center">
          <span>Filter</span>
          <select
            @change="handleChange"
            v-model="filter"
            class="border border-gray-300 rounded-md p-2"
          >
            <option value="all">All</option>
            <option value="glutenFree">Gluten-Free</option>
            <option value="vegan">Vegan</option>
            <option value="bestSeller">Best Seller</option>
          </select>
        </div>
      </div>
    </div>
    <div
      class="grid lg:grid-cols-5 md:grid-cols-3 gap-4 container justify-between"
    >
      <div class="col-md-4" v-for="offer in filteredOffers" :key="offer.id">
        <OfferSingleCard :offer="offer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import offerData from "../../Data/db.json";
import OfferSingleCard from "../components/Cards/SingleCard.vue";

// Reactive properties
const router = useRouter();
const weeklyOffer = ref(offerData || []);
const filter = ref("all");

//onMounted
const route = useRoute();
onMounted(() => {
  filter.value = route.query.filter || "all";
});

// Computed property to filter offers
const filteredOffers = computed(() => {
  if (filter.value === "all") {
    return weeklyOffer.value;
  }

  return weeklyOffer.value.filter((offer) => {
    switch (filter.value) {
      case "glutenFree":
        return offer.glutenFree;
      case "vegan":
        return offer.vegan;
      case "bestSeller":
        return offer.bestSeller;
      default:
        return true;
    }
  });
});

// Method to handle filter change
const handleChange = () => {
  router.push({ query: { filter: filter.value } });
};

// Function to calculate the start and end of the current week
const getCurrentWeekRange = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  // Get the current week's Monday (start of the week)
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  // Get the current week's Sunday (end of the week)
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  // Format both dates to DD.MM.
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    return `${day}.${month}.`;
  };

  return {
    startOfWeek: formatDate(monday),
    endOfWeek: formatDate(sunday),
  };
};

// Calculate the current week's range
const { startOfWeek, endOfWeek } = getCurrentWeekRange();

// Computed property to generate the validity text
const offerValidityText = computed(() => {
  return `Offers valid from ${startOfWeek} - ${endOfWeek}`;
});
</script>

<style scoped></style>

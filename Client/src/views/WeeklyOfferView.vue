<template>
  <div>
    <div class="container mt-10 flex justify-between items-center flex-wrap">
      <h3 class="font-semibold text-xl py-2 uppercase">Weekly Offers</h3>
      <!-- Display the offer validity dates -->
      <p>{{ offerValidityText }}</p>
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

    <!-- Grid displaying filtered new arrivals -->
    <div
      class="grid lg:grid-cols-6 md:grid-cols-3 gap-4 container justify-between mb-24"
    >
      <div
        class="col-md-4"
        v-for="product in filteredOffers"
        :key="product._id"
      >
        <SingleCard :product="product" />
      </div>
    </div>
    <FooterComponents />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "../stores/useProductStore.js";
import FooterComponents from "@/components/footer/FooterComponents.vue";
import SingleCard from "../components/Cards/SingleCard.vue";

// Router for navigation and query updates
const router = useRouter();
const route = useRoute();

// Filter state
const filter = ref("all");

// Use the product store
const productStore = useProductStore();

// Destructure the state and getters
const { fetchProducts, isLoading, error, newArrivals, discountedProducts } =
  productStore;

// Fetch products when the component is mounted
onMounted(() => {
  fetchProducts();
  filter.value = route.query.filter || "all"; // Initialize filter from query if present
});

// Computed property to filter new arrivals based on the selected filter
const filteredOffers = computed(() => {
  if (filter.value === "all") {
    return discountedProducts;
  }

  return discountedProducts.filter((product) => {
    switch (filter.value) {
      case "glutenFree":
        return product.glutenFree;
      case "vegan":
        return product.vegan;
      case "bestSeller":
        return product.isBestSeller; // Ensure this field is in your product object
      default:
        return true;
    }
  });
});

// Method to handle filter change and update query params
const handleChange = () => {
  router.push({ query: { filter: filter.value } });
};

// Function to calculate the start and end of the current week
const getCurrentWeekRange = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

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

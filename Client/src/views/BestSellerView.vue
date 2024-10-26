<template>
  <section class="p-2">
    <div
      class="container mx-auto bg-cyan-700 flex justify-center p-4 rounded-lg"
    >
      <div class="flex flex-col py-12">
        <div class="rotate-[-10deg]">
          <span
            class="text-3xl font-semibold text-slate-800 bg-cyan-300 px-2 py-1 rounded-lg"
            >Best Seller</span
          >
        </div>
        <span class="z-20 pt-6 text-slate-100"
          >Explore our bestSeller products.</span
        >
      </div>
    </div>
    <!-- Header Section -->
    <div class="container mx-auto">
      <div class="mt-10 flex justify-between items-center flex-wrap">
        <h3 class="font-semibold text-xl py-2 uppercase mb-2">Best Sellers</h3>
        <!-- Display the offer validity dates -->
        <!-- <p>{{ offerValidityText }}</p> -->
        <div class="flex gap-8 items-center">
          <div class="flex gap-6 items-center">
            <span>Filter</span>
            <select
              @change="handleFilterChange"
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

      <!-- Conditional rendering based on filtered products -->
      <div v-if="filteredProducts.length === 0" class="text-center py-10">
        <p class="text-gray-500 text-xl">No products found</p>
      </div>

      <!-- Grid displaying filtered products -->
      <div
        v-else
        class="grid lg:grid-cols-6 md:grid-cols-3 gap-4 container justify-between mb-24"
      >
        <div
          class="col-md-4"
          v-for="product in filteredProducts"
          :key="product._id"
        >
          <SingleCard :product="product" />
        </div>
      </div>
    </div>
    <FooterComponents />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SingleCard from "../components/Cards/SingleCard.vue";
import FooterComponents from "@/components/footer/FooterComponents.vue";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const allProducts = ref([]);
const filter = ref(route.query.filter || "all");

const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/products`
    );
    allProducts.value = response.data;
  } catch (error) {
    console.error("Failed to fetch products", error);
  }
};

// Computed property to filter for best sellers only
const filteredBestSellers = computed(() => {
  return allProducts.value.filter((product) => product.isBestSeller);
});

const filteredProducts = computed(() => {
  if (filter.value === "all") return filteredBestSellers.value;

  return filteredBestSellers.value.filter((product) => {
    switch (filter.value) {
      case "glutenFree":
        return product.glutenFree;
      case "vegan":
        return product.vegan;
      case "bestSeller":
        return product.isBestSeller;
      default:
        return [];
    }
  });
});

// Watch for filter changes to update the query parameter
watch(filter, (newFilter) => {
  router.push({ query: { ...route.query, filter: newFilter } });
});

// Event handler for filter change
const handleFilterChange = (event) => {
  filter.value = event.target.value;
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped></style>

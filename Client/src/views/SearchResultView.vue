<template>
  <section>
    <div class="container mx-auto">
      <h2 class="text-2xl mb-4 mt-4">
        <span>Search Results for</span>
        <span class="font-semibold pl-2">"{{ searchQuery }}":</span>
        :
      </h2>

      <!-- Display filtered products if available -->
      <div
        v-if="filteredProducts.length > 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      >
        <div
          class="col-md-4 w-full flex-shrink-0 px-2"
          v-for="product in filteredProducts"
          :key="product._id"
          style="flex-basis: calc(100% / 6)"
        >
          <SingleCard :product="product" />
        </div>
      </div>

      <!-- If no products match the search query -->
      <div v-else>
        <p>No products found for "{{ searchQuery }}".</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import SingleCard from "../components/Cards/SingleCard.vue";

const route = useRoute();
const searchQuery = ref(route.query.q || ""); // Search query from the URL
const allProducts = ref([]); // All products fetched from the API
const filteredProducts = ref([]); // Filtered products based on the search query
const allCategories = ref([]); // Store all categories

// Fetch all categories from the API
const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/categories`
    );
    allCategories.value = response.data; // Store fetched categories
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }
};

// Fetch all products from the API
const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/products`
    );
    allProducts.value = response.data; // Store fetched products
    filterProducts(); // Apply filtering once data is fetched
  } catch (error) {
    console.error("Failed to fetch products", error);
  }
};

// Filter products based on search query
const filterProducts = () => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase();

  if (normalizedQuery) {
    filteredProducts.value = allProducts.value.filter((product) => {
      // Find matching category name by ID if product.category exists
      const categoryMatch = allCategories.value.find(
        (cat) =>
          cat._id === product.category &&
          cat.name.toLowerCase().includes(normalizedQuery)
      );

      return (
        product.brandName?.toLowerCase().includes(normalizedQuery) ||
        product.title?.toLowerCase().includes(normalizedQuery) ||
        categoryMatch || // Check if category name matches
        (product.isNewArrival && normalizedQuery === "new arrival") ||
        (product.isWeeklyOffer && normalizedQuery === "weekly offer") ||
        (product.isBestSeller && normalizedQuery === "best seller") ||
        (product.isVegan && normalizedQuery === "vegan") ||
        (product.isGlutenFree && normalizedQuery === "gluten-free")
      );
    });
  } else {
    filteredProducts.value = [];
  }
};

// Watch for changes in the route query parameter to refilter products
watch(
  () => route.query.q,
  (newQuery) => {
    searchQuery.value = newQuery || "";
    filterProducts(); // Filter products when the query changes
  }
);

// Fetch products and categories once the component is mounted
onMounted(() => {
  fetchProducts();
  fetchCategories();
});
</script>

<style scoped></style>

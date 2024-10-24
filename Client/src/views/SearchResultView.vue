<template>
  <section>
    <div class="container mx-auto">
      <h2 class="text-2xl font-semibold mb-4">
        Search Results for "{{ searchQuery }}":
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
  // Normalize the search query to be case-insensitive and trim any extra spaces
  const normalizedQuery = searchQuery.value.trim().toLowerCase();

  if (normalizedQuery) {
    // Filter the products based on the search query, checking multiple fields
    filteredProducts.value = allProducts.value.filter((product) => {
      // Check if the product matches the search query in multiple fields
      return (
        product.brandName.toLowerCase().includes(normalizedQuery) ||
        product.title.toLowerCase().includes(normalizedQuery) || // Check product name
        // product.description?.toLowerCase().includes(normalizedQuery) || // Optional: Check description
        product.category?.name?.toLowerCase().includes(normalizedQuery) // Check category.name if it exists
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

// Fetch products once the component is mounted
onMounted(fetchProducts);
</script>

<style scoped></style>

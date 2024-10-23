<template>
  <section class="p-2">
    <div
      class="container mx-auto bg-green-600 flex justify-center p-4 rounded-lg"
    >
      <div class="flex flex-col py-12">
        <div class="rotate-[-10deg]">
          <span
            class="text-3xl font-semibold text-slate-600 bg-yellow-300 px-3 py-1 rounded-lg"
            >Discover your Products</span
          >
        </div>
        <span class="z-20 pt-10 text-slate-100">
          Explore wide range of our products category.
        </span>
      </div>
    </div>
    <div
      class="mt-10 flex justify-between items-center flex-wrap container mx-auto px-4 rounded-lg"
    >
      <h3 class="font-semibold text-xl py-2 uppercase mb-2">
        Category Products
      </h3>
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
    <div>
      <!-- Display filtered products based on the selected category -->
      <div
        v-if="filteredProducts.length"
        class="grid lg:grid-cols-6 md:grid-cols-3 gap-4 container justify-between mb-24"
      >
        <SingleCard
          v-for="product in filteredProducts"
          :key="product._id"
          :product="product"
        />
      </div>
      <!-- Message if no products are available for the selected category -->
      <div v-else class="container mx-auto">
        <p>No products available for the selected category.</p>
      </div>
      <FooterComponents />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import FooterComponents from "@/components/footer/FooterComponents.vue";
import SingleCard from "../components/Cards/SingleCard.vue";
import { useRoute } from "vue-router";

// Get the route and params
const route = useRoute();
const { id } = route.params;
const allCategories = ref([]);
const products = ref([]); // Array to store all products
const isLoading = ref(false); // Reactive loading state
const error = ref(null); // Reactive error state

// State for selected category from URL params
const selectedCategory = ref(id || null);

// Fetch categories from the API
const fetchCategories = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/categories`
    );
    allCategories.value = response.data; // Assuming API returns an array of categories
  } catch (err) {
    error.value = err.message; // Set error message if fetch fails
  } finally {
    isLoading.value = false;
  }
};

// Fetch products from the API
const fetchProducts = async () => {
  if (products.value.length > 0) return; // Prevent unnecessary fetch

  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/products`
    );
    products.value = response.data; // Ensure reactive assignment
    console.log("Products fetched:", products.value); // Log fetched products
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to fetch products";
    console.error("Error fetching products:", error.value);
  } finally {
    isLoading.value = false;
  }
};

// Fetch products when the component is mounted
onMounted(async () => {
  console.log("Fetching products...");
  await fetchProducts(); // Fetch all products
});

// Watch for route changes to update selected category
watch(
  () => route.params.id,
  (newId) => {
    selectedCategory.value = newId; // Update selected category when URL changes
    console.log("Selected Category changed:", selectedCategory.value); // Log the selected category
  }
);

// Filter products based on the selected category ID
const filteredProducts = computed(() => {
  // Ensure products are loaded before filtering
  if (!products.value || products.value.length === 0) {
    console.log("No products loaded yet.");
    return [];
  }

  console.log("Filtering products for category:", selectedCategory.value);

  // Filter products based on the selected category
  return products.value.filter((product) => {
    return product.category === selectedCategory.value;
  });
});
</script>

<style scoped>
/* Add any custom styling */
</style>

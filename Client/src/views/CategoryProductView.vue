<template>
  <section class="p-2">
    <div
      class="container mx-auto bg-green-600 flex justify-center p-4 rounded-lg"
    >
      <div class="flex flex-col py-12">
        <div class="rotate-[-10deg]">
          <span
            class="text-3xl font-semibold text-slate-600 bg-yellow-300 px-3 py-1"
          >
            Discover your Products
          </span>
        </div>
        <span class="z-20 pt-10 text-slate-100">
          Explore a wide range of our products category.
        </span>
      </div>
    </div>
    <div
      class="mt-10 flex justify-between items-center flex-wrap container mx-auto px-4 rounded-lg"
    >
      <h3 class="font-semibold text-xl py-2 uppercase mb-2">
        {{ selectedCategoryName }}
      </h3>
      <div class="flex gap-8 items-center">
        <div class="flex gap-6 items-center">
          <span>Filter</span>
          <select
            v-model="filter"
            @change="handleChange"
            class="border border-gray-300 rounded-md p-2"
          >
            <option value="">All</option>
            <option
              v-for="category in allCategories"
              :key="category._id"
              :value="category._id"
            >
              {{ category.name }}
            </option>
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
const selectedCategory = ref(id || null); // State for selected category from URL params
const filter = ref("all"); // State for selected filter option

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
  isLoading.value = true; // Set loading state to true

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
    isLoading.value = false; // Reset loading state
  }
};

// Fetch products and categories when the component is mounted
onMounted(async () => {
  console.log("Fetching products and categories...");
  await fetchProducts(); // Fetch all products
  await fetchCategories(); // Fetch categories
});

// Watch for route changes to update selected category
watch(
  () => route.params.id,
  (newId) => {
    selectedCategory.value = newId; // Update selected category when URL changes
    console.log("Selected Category changed:", selectedCategory.value); // Log the selected category
  }
);

// Handle filter change
const handleChange = () => {
  // This function is called on change, but filter is already bound to v-model
  console.log("Filter changed to:", filter.value); // Log the selected filter
};

// Filter products based on the selected category and filter option
const filteredProducts = computed(() => {
  // Ensure products are loaded before filtering
  if (!products.value || products.value.length === 0) {
    console.log("No products loaded yet.");
    return [];
  }

  console.log("Filtering products for category:", selectedCategory.value);

  // Filter products based on the selected category
  let filtered = products.value.filter((product) => {
    return product.category === selectedCategory.value;
  });

  // Apply additional filtering based on the selected filter option
  if (filter.value !== "all") {
    filtered = filtered.filter((product) => product.type === filter.value);
  }

  return filtered;
});

// Compute the selected category name
const selectedCategoryName = computed(() => {
  const category = allCategories.value.find(
    (cat) => cat._id === selectedCategory.value
  );
  return category ? category.name : "Category"; // Default name if no category is found
});
</script>

<style scoped>
/* Add any custom styling */
</style>

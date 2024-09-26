<template>
  <div>
    <div class="flex items-center gap-2 container mx-auto my-8">
      <h3 class="uppercase font-semibold">Category</h3>
      <!-- Dropdown for selecting a category -->
      <select v-model="selectedCategory">
        <option
          v-for="category in categories"
          :key="category._id"
          :value="category._id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

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

    <!-- Message if no products found -->
    <div v-else>
      <p>No products available for the selected category.</p>
    </div>
    <FooterComponents />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useProductStore } from "../stores/useProductStore.js";
import FooterComponents from "@/components/footer/FooterComponents.vue";
import SingleCard from "../components/Cards/SingleCard.vue";

// State for selected category
const selectedCategory = ref(null);

// State for categories
const categories = ref([]);

// API base URL
const url = import.meta.env.VITE_API_URL || "http://localhost:8090";

// Fetch categories from the API
const fetchCategories = async () => {
  try {
    const response = await fetch(`${url}/api/v1/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    categories.value = data;

    // Set the first category as the selected category by default
    if (categories.value.length > 0) {
      selectedCategory.value = categories.value[0]._id; // Set default selection
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    categories.value = []; // Empty array if fetching fails
  }
};

// Use the product store
const productStore = useProductStore();

// Destructure actions and getters from the store
const { fetchProducts, allProducts } = productStore;

// Fetch categories and products when the component is mounted
onMounted(() => {
  fetchCategories(); // Fetch categories
  fetchProducts(); // Fetch products
});

// Filter products based on the selected category
const filteredProducts = computed(() => {
  // If no category is selected, show no products
  if (!selectedCategory.value) {
    return [];
  }
  // Filter products that belong to the selected category
  return allProducts.filter(
    (product) => product.category === selectedCategory.value
  );
});

// Watch for changes in selected category and log it
watch(selectedCategory, (newValue) => {
  console.log("Selected category:", newValue);
});
</script>

<style scoped>
/* Add any styles if necessary */
</style>

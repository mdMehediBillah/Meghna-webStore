<template>
  <section class="p-2">
    <div
      class="container mx-auto bg-orange-500 flex justify-center p-4 rounded-lg"
    >
      <div class="flex flex-col py-12 items-center">
        <div class="rotate-[-10deg]">
          <span
            class="text-3xl font-semibold text-slate-800 bg-yellow-300 px-2 py-1 rounded-lg text-center"
          >
            Strong Spices
          </span>
        </div>
        <span class="z-20 pt-6 text-slate-100 text-center">
          Explore our hot and authentic spices.
        </span>
      </div>
    </div>

    <!-- Header Section -->
    <div class="container mx-auto">
      <div class="mt-10 flex justify-between items-center flex-wrap">
        <h3 class="font-semibold text-xl py-2 uppercase mb-2">Spices</h3>
      </div>

      <!-- Error and Loading States -->
      <div v-if="isLoading" class="text-center py-10">
        <p class="text-gray-500 text-xl">Loading products...</p>
      </div>
      <div v-if="error" class="text-center py-10">
        <p class="text-red-500 text-xl">{{ error }}</p>
      </div>

      <!-- Conditional rendering based on filtered products -->
      <div
        v-if="!isLoading && filteredProducts.length === 0"
        class="text-center py-10"
      >
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
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import SingleCard from "../components/Cards/SingleCard.vue";
import FooterComponents from "@/components/footer/FooterComponents.vue";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const allProducts = ref([]);
const allCategories = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Fetch all products
const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/products`
    );
    allProducts.value = response.data;
    console.log("Fetched products:", allProducts.value);
  } catch (err) {
    error.value = "Failed to fetch products.";
    console.error("Error fetching products:", err);
  } finally {
    isLoading.value = false;
  }
};

// Fetch categories from the API
const fetchCategories = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/categories`
    );
    allCategories.value = response.data; // Assuming API returns an array of categories
    console.log("Fetched categories:", allCategories.value);
  } catch (err) {
    error.value = "Failed to fetch categories.";
    console.error("Error fetching categories:", err);
  } finally {
    isLoading.value = false;
  }
};

// Computed property to filter for spices category only
const filteredSpicesCategory = computed(() => {
  // Find the spices category
  const spicesCategory = allCategories.value.find(
    (cat) => cat.name === "Spices"
  );

  if (!spicesCategory) {
    console.warn("Spices category not found");
    return []; // Return empty if no spices category is found
  }

  // Filter products based on category ID
  const spicesProducts = allProducts.value.filter((product) => {
    return product.category === spicesCategory._id; // Match by category ID
  });

  console.log("Filtered spices products:", spicesProducts);
  return spicesProducts;
});

const filteredProducts = computed(() => filteredSpicesCategory.value);

onMounted(() => {
  fetchProducts();
  fetchCategories();
});
</script>

<style scoped></style>

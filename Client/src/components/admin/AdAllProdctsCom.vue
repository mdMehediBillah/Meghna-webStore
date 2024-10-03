<template>
  <section class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold mb-2 text-gray-200">Manage Products</h2>
      <div class="flex gap-2 items-center">
        <!-- Search and Filter Inputs -->
        <form @submit.prevent="searchProducts">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search products..."
            class="border border-gray-300 p-2 rounded-l-lg focus:outline-none"
          />
          <button
            class="bg-rose-500 text-white px-3 py-2 rounded-r-lg hover:bg-rose-600 transition-colors duration-300"
          >
            Search
          </button>
        </form>

        <span class="ml-4 text-gray-200">Filter</span>
        <select
          v-model="filterOption"
          @change="filterProducts"
          class="border p-2 rounded-lg bg-gray-200 focus:outline-none"
        >
          <option value="all">All</option>
          <option value="discounted">Discounted</option>
          <option value="newProducts">New Products</option>
          <option value="bestSeller">Best Seller</option>
        </select>
      </div>
      <!-- Add Product Button -->
      <router-link
        to="/product/add"
        class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
      >
        Add product
      </router-link>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="text-center">Loading products...</div>

    <!-- Error state -->
    <div v-if="error" class="text-red-500">
      {{ error }}
      <button @click="fetchProducts" class="text-blue-500 underline">
        Retry
      </button>
    </div>

    <!-- Products List -->
    <div v-if="!isLoading && filteredProducts.length > 0">
      <div class="flex flex-col w-full items-between">
        <div
          v-for="product in filteredProducts"
          :key="product._id"
          class="border p-2 rounded my-1 flex gap-4 items-end bg-gray-300 hover:bg-gray-100 transition-colors ease-in-out duration-300 justify-between w-full"
        >
          <div class="flex gap-4 items-end">
            <img
              :src="product.image || '../assets/photos/default-product.png'"
              :alt="product.name"
              class="h-12 object-cover rounded"
            />
            <div class="flex flex-col">
              <span class="text-lg font-semibold">{{ product.brandName }}</span>
              <span>{{ product.title }}</span>
            </div>
            <!-- Size and Price Details -->
            <div class="flex items-center justify-between mt-2">
              <ul>
                <li
                  v-for="size in product.sizes"
                  :key="size._id"
                  class="flex gap-2"
                >
                  <div class="flex items-center">
                    <!-- Display Discounted Price -->
                    <span
                      v-if="product.offer?.discountPercentage > 0"
                      class="text-red-600 font-semibold mr-2"
                    >
                      €{{
                        (
                          size.price -
                          (size.price * product.offer.discountPercentage) / 100
                        ).toFixed(2)
                      }}
                    </span>
                    <!-- Display Original Price with Line-through if Discounted -->
                    <span
                      v-if="product.offer?.discountPercentage > 0"
                      class="line-through text-gray-500 mr-2"
                    >
                      €{{ size.price.toFixed(2) }}
                    </span>
                    <!-- Display Original Price Only (No Discount) -->
                    <span v-else class="text-gray-800 font-semibold">
                      €{{ size.price.toFixed(2) }}
                    </span>
                  </div>
                </li>
              </ul>
              <!-- Discount Percentage Label -->
              <div
                v-if="product.offer?.discountPercentage > 0"
                class="ml-4 bg-gray-100 px-2 py-1 rounded-lg text-sm"
              >
                -{{ product.offer.discountPercentage }}%
              </div>

              <!-- "New Arrival" Label -->
              <div
                v-if="product.isNewArrival"
                class="text-white font-semibold px-2 py-1 text-xs bg-orange-600 ml-4 rounded-md text-sm"
              >
                New
              </div>

              <!-- "Best Seller" Label -->
              <div
                v-if="product.isBestSeller"
                class="text-white font-semibold px-2 py-1 rounded-md text-xs bg-cyan-600 text-sm ml-4"
              >
                Best Seller
              </div>
            </div>
          </div>

          <!-- Edit and Delete Buttons -->
          <div class="mt-4 flex space-x-2">
            <button
              class="fa-solid fa-pen-to-square text-gray-600 text-sm py-1 px-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              @click="router.push(`/product/update/${product._id}`)"
              aria-label="Edit offer"
              title="Edit offer"
            ></button>

            <button
              class="fa-solid fa-trash text-red-600 text-sm py-1 px-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              @click="deleteProduct(product._id)"
              aria-label="Delete offer"
              title="Delete offer"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <!-- No products available -->
    <div v-if="!isLoading && filteredProducts.length === 0" class="text-center">
      No products available.
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const router = useRouter();
const url = import.meta.env.VITE_API_URL; // API URL

// Data variables
const products = ref([]);
const filteredProducts = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Search and filter options
const searchQuery = ref("");
const filterOption = ref("all");

// Fetch products from API
const fetchProducts = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await axios.get(`${url}/api/v1/products`);
    products.value = response.data;
    filteredProducts.value = products.value; // Initialize filtered products
  } catch (err) {
    error.value = err.message || "Failed to load products.";
  } finally {
    isLoading.value = false;
  }
};

// Search products based on search query
const searchProducts = () => {
  const query = searchQuery.value.toLowerCase();
  filteredProducts.value = products.value.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.brandName.toLowerCase().includes(query)
  );
};

// Filter products based on the selected filter option
const filterProducts = () => {
  if (filterOption.value === "all") {
    filteredProducts.value = products.value;
  } else if (filterOption.value === "discounted") {
    filteredProducts.value = products.value.filter(
      (product) => product.offer?.discountPercentage > 0
    );
  } else if (filterOption.value === "bestSeller") {
    // Assuming "best" products have some identifiable property like 'isBestSeller'
    filteredProducts.value = products.value.filter(
      (product) => product.isBestSeller
    );
  } else if (filterOption.value === "newProducts") {
    // Assuming "new" products have some identifiable property like 'isNew'
    filteredProducts.value = products.value.filter(
      (product) => product.isNewArrival
    );
  }
};

// Function to delete the product
const deleteProduct = async (id) => {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      const response = await axios.delete(`${url}/api/v1/products/${id}`);
      if (response.status === 200) {
        alert("Product deleted successfully");
        fetchProducts(); // Refetch products to update the list
      } else {
        alert("Failed to delete the product.");
      }
    } catch (err) {
      console.error("Error deleting the product: ", err);
      alert("An error occurred while deleting the product. Please try again.");
    }
  }
};

// Fetch products when component is mounted
onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
/* Scoped styles if needed */
</style>

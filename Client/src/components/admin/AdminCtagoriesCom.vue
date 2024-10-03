<template>
  <section class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold mb-2 text-gray-200">Categories</h2>
      <div class="flex gap-2 items-center">
        <!-- Search and Filter Inputs -->
        <form @submit.prevent="searchCategories">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search categories..."
            class="border border-gray-300 p-2 rounded-l-lg focus:outline-none"
          />
          <button
            class="bg-rose-500 text-white px-3 py-2 rounded-r-lg hover:bg-rose-600 transition-colors duration-300"
          >
            Search
          </button>
        </form>
      </div>
      <!-- Add Category Button -->
      <router-link
        to=""
        class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
        @click="showModal = true"
      >
        Add Category
      </router-link>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="text-center">Loading categories...</div>

    <!-- Error state -->
    <div v-if="error" class="text-red-500">
      {{ error }}
      <button @click="fetchCategories" class="text-blue-500 underline">
        Retry
      </button>
    </div>

    <!-- Categories List -->
    <div v-if="!isLoading && filteredCategories.length > 0">
      <div class="flex flex-col w-full items-between">
        <div
          v-for="category in filteredCategories"
          :key="category._id"
          class="border p-2 rounded my-1 flex gap-4 items-end bg-gray-300 hover:bg-gray-100 transition-colors ease-in-out duration-300 justify-between w-full"
        >
          <div class="flex gap-4 items-end">
            <img
              :src="category.image || '../assets/photos/default-category.png'"
              :alt="category.name"
              class="h-12 object-cover rounded"
            />
            <div class="flex flex-col">
              <span class="text-lg font-semibold">{{ category.name }}</span>
            </div>
          </div>

          <!-- Edit and Delete Buttons -->
          <div class="mt-4 flex space-x-2">
            <button
              class="fa-solid fa-pen-to-square text-gray-600 text-sm py-1 px-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              @click="updateCategory(category._id)"
              aria-label="Edit category"
              title="Edit category"
            ></button>

            <button
              class="fa-solid fa-trash text-red-600 text-sm py-1 px-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              @click="deleteCategory(category._id)"
              aria-label="Delete category"
              title="Delete category"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <!-- No categories available -->
    <div
      v-if="!isLoading && filteredCategories.length === 0"
      class="text-center"
    >
      No categories available.
    </div>
    <!-- Add Category Modal -->
    <CategoryUpdateCom :isVisible="showModal" :closeModal="closeModal" />
  </section>
</template>

<script setup>
import CategoryUpdateCom from "./CategoryUpdateCom.vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const router = useRouter();

const showModal = ref(false);

// Function to close the modal
const closeModal = () => {
  showModal.value = false;
};
const url = import.meta.env.VITE_API_URL; // API URL

// Data variables
const categories = ref([]);
const filteredCategories = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Search query
const searchQuery = ref("");

// Fetch categories from API
const fetchCategories = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await axios.get(`${url}/api/v1/categories`);
    categories.value = response.data;
    filteredCategories.value = categories.value; // Initialize filtered categories
  } catch (err) {
    error.value = err.message || "Failed to load categories.";
  } finally {
    isLoading.value = false;
  }
};

// Search categories based on search query
const searchCategories = () => {
  const query = searchQuery.value.toLowerCase();
  filteredCategories.value = categories.value.filter((category) =>
    category.name.toLowerCase().includes(query)
  );
};

// Function to delete a category
const deleteCategory = async (id) => {
  if (confirm("Are you sure you want to delete this category?")) {
    try {
      const response = await axios.delete(`${url}/api/v1/categories/${id}`);
      if (response.status === 200) {
        alert("Category deleted successfully");
        fetchCategories(); // Refetch categories to update the list
      } else {
        alert("Failed to delete the category.");
      }
    } catch (err) {
      console.error("Error deleting the category: ", err);
      alert("An error occurred while deleting the category. Please try again.");
    }
  }
};

// Update category
const updateCategory = (id) => {
  router.push(`/category/update/${id}`);
};

// Fetch categories when the component is mounted
onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
/* Scoped styles if needed */
</style>

<template>
  <div class="add-category-form p-4 max-w-md mx-auto border rounded shadow">
    <h2 class="text-2xl font-semibold mb-4">Add New Category</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Category Name Input -->
      <div class="mb-4">
        <label
          for="categoryName"
          class="block text-sm font-medium text-gray-700"
          >Category Name</label
        >
        <input
          type="text"
          id="categoryName"
          v-model="categoryName"
          class="mt-1 p-2 block w-full border rounded shadow-sm focus:ring focus:border-blue-500"
          placeholder="Enter category name"
          required
        />
      </div>

      <!-- Image URL Input -->
      <div class="mb-4">
        <label for="imageUrl" class="block text-sm font-medium text-gray-700"
          >Image URL</label
        >
        <input
          type="text"
          id="imageUrl"
          v-model="imageUrl"
          class="mt-1 p-2 block w-full border rounded shadow-sm focus:ring focus:border-blue-500"
          placeholder="Enter image URL"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Add Category
      </button>
    </form>

    <!-- Feedback Message -->
    <p
      v-if="message"
      :class="{ 'text-green-500': isSuccess, 'text-red-500': !isSuccess }"
      class="mt-4"
    >
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// Form state
const categoryName = ref("");
const imageUrl = ref("");
const message = ref("");
const isSuccess = ref(false);

// API base URL
const url = import.meta.env.VITE_API_URL || "http://localhost:8090";

// Function to handle form submission
const handleSubmit = async () => {
  try {
    // Validate category name
    if (!categoryName.value.trim()) {
      message.value = "Category name is required.";
      isSuccess.value = false;
      return;
    }

    // Prepare form data for submission
    const formData = {
      name: categoryName.value.trim(),
      image: imageUrl.value.trim() || null, // Include image URL if provided
    };

    // Send POST request to add new category
    const response = await axios.post(`${url}/api/v1/categories`, formData);

    // Success handling
    message.value = "Category added successfully!";
    isSuccess.value = true;
    categoryName.value = ""; // Clear the category name field
    imageUrl.value = ""; // Clear the image URL field
  } catch (error) {
    console.error("Error adding category:", error);
    message.value = "Failed to add category. Please try again.";
    isSuccess.value = false;
  }
};
</script>

<style scoped>
.add-category-form {
  background-color: #f9fafb;
}
</style>

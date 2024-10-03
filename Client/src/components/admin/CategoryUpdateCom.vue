<template>
  <div class="modal" v-if="isVisible" role="dialog" aria-modal="true">
    <div class="modal-overlay" @click="close"></div>
    <div class="modal-content">
      <h3 class="text-lg font-semibold">Add Category</h3>
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

        <!-- Message for feedback -->
        <div
          v-if="message"
          :class="{ 'text-green-500': isSuccess, 'text-red-500': !isSuccess }"
          class="mb-2"
        >
          {{ message }}
        </div>

        <!-- Cancel and Submit Buttons -->
        <div class="flex gap-1">
          <button
            type="button"
            @click="close"
            class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300 ml-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Adding...</span>
            <span v-else>Add Category</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const props = defineProps(["isVisible", "closeModal"]); // Define props

// Form state
const categoryName = ref("");
const imageUrl = ref("");
const message = ref("");
const isSuccess = ref(false);

const isLoading = ref(false); // To track loading state

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
    close(); // Close the modal
  } catch (error) {
    console.error("Error adding category:", error);
    message.value = "Failed to add category. Please try again.";
    isSuccess.value = false;
  }
};

// Close modal
const close = () => {
  categoryName.value = "";
  imageUrl.value = ""; // Reset image URL
  message.value = ""; // Clear message
  props.closeModal(); // Call the onClose function passed from the parent
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 1001;
  width: 300px;
}
</style>

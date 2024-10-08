<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h3 class="text-lg font-semibold text-center mb-6">Update Category</h3>
      <form @submit.prevent="updateCategory">
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
            required
          />
        </div>

        <div class="mb-4">
          <label for="imageUrl" class="block text-sm font-medium text-gray-700"
            >Image URL</label
          >
          <input
            type="text"
            id="imageUrl"
            v-model="imageUrl"
            class="mt-1 p-2 block w-full border rounded shadow-sm focus:ring focus:border-blue-500"
          />
        </div>

        <div class="flex justify-between gap-2 pt-4">
          <button
            type="button"
            @click="closeModal"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";

// Define props for the component
const props = defineProps(["isVisible", "closeModal", "category"]);

// Define local state variables for the category name and image
const categoryName = ref("");
const imageUrl = ref("");

// Watch the `category` prop and update local state when it changes
watch(
  () => props.category,
  (newCategory) => {
    if (newCategory) {
      categoryName.value = newCategory.name || "";
      imageUrl.value = newCategory.image || "";
    }
  },
  { immediate: true }
); // Run immediately on component load

// API URL
const url = import.meta.env.VITE_API_URL || "http://localhost:8090";

// Function to handle updating the category
const updateCategory = async () => {
  try {
    const updatedCategory = {
      name: categoryName.value,
      image: imageUrl.value,
    };

    // Send a PUT request to update the category
    await axios.put(
      `${url}/api/v1/categories/${props.category._id}`,
      updatedCategory
    );

    alert("Category updated successfully");
    props.closeModal(); // Close the modal after a successful update
  } catch (err) {
    console.error("Error updating category:", err);
    alert("Failed to update category.");
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}
</style>

<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h3 class="text-lg font-semibold text-center mb-6">Update Product</h3>
      <form @submit.prevent="updateProduct">
        <div class="mb-4">
          <label
            for="productName"
            class="block text-sm font-medium text-gray-700"
            >Product Name</label
          >
          <input
            type="text"
            id="productName"
            v-model="productName"
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
const props = defineProps(["isVisible", "closeModal", "product"]);

// Define local state variables for the product name and image
const productName = ref("");
const imageUrl = ref("");

// Watch the `product` prop and update local state when it changes
watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      productName.value = newProduct.brandName || "";
      imageUrl.value = newProduct.image || "";
    }
  },
  { immediate: true }
); // Run immediately on component load

// API URL
const url = import.meta.env.VITE_API_URL || "http://localhost:8090";

// Function to handle updating the product
const updateProduct = async () => {
  try {
    const updatedProduct = {
      brandName: productName.value,
      image: imageUrl.value,
    };

    // Send a PUT request to update the product
    await axios.put(
      `${url}/api/v1/products/${props.product._id}`,
      updatedProduct
    );

    alert("Product updated successfully");
    props.closeModal(); // Close the modal after a successful update
  } catch (err) {
    console.error("Error updating product:", err);
    alert("Failed to update product.");
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

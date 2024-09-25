<template>
  <div
    class="relative cursor-pointer bg-gray-50 rounded-lg hover:shadow-md p-4 items-center mt-4 transition-transform ease-in-out duration-300 transform hover:scale-105"
  >
    <!-- "New Arrival" Label -->
    <div
      v-if="product.isNewArrival"
      class="absolute top-2 left-2 text-white font-semibold px-2 py-1 rounded-br-lg text-xs bg-orange-600"
    >
      New
    </div>

    <!-- "Best Seller" Label -->
    <div
      v-if="product.isBestSeller"
      class="absolute bottom-40 right-2 text-white font-semibold px-2 py-1 rounded-l-md text-xs bg-cyan-600"
    >
      Best Seller
    </div>

    <!-- Discount Percentage Label -->
    <div
      v-if="product.offer?.discountPercentage > 0"
      class="absolute top-2 right-2 text-white font-bold px-2 py-1 rounded-bl-lg text-sm bg-gray-600"
    >
      {{ product.offer.discountPercentage }}%
    </div>

    <!-- Product Image -->
    <img
      :src="product.image"
      alt="Product image"
      class="h-36 object-cover rounded-md mx-auto"
      @click="router.push(`/products/${product._id}`)"
    />

    <!-- Offer Details -->
    <div class="mt-4">
      <h5 class="font-semibold uppercase">{{ product.brandName }}</h5>
      <p class="line-clamp-1 text-gray-500">{{ product.title }}</p>

      <!-- Size and Price Details -->
      <div class="flex items-center justify-between mt-2">
        <ul>
          <li v-for="size in product.sizes" :key="size._id" class="flex gap-2">
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
        <!-- Cart Icon -->
        <button
          class="fa-solid fa-cart-shopping text-gray-600 text-sm py-1 px-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          aria-label="Add to cart"
          title="Add to cart"
        ></button>
      </div>

      <!-- Cart, Edit, and Delete Buttons -->
      <div class="mt-4 flex space-x-2">
        <!-- Edit Offer Icon -->
        <button
          class="fa-solid fa-pen-to-square text-gray-600 text-sm py-1 px-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          @click="router.push(`/product/update/${product._id}`)"
          aria-label="Edit offer"
          title="Edit offer"
        ></button>

        <!-- Delete Offer Icon -->
        <button
          class="fa-solid fa-trash text-red-600 text-sm py-1 px-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
          @click="deleteProduct(product._id)"
          aria-label="Delete offer"
          title="Delete offer"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

// Define the 'product' prop
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const url = import.meta.env.VITE_API_URL; // API URL

// Function to delete the product
const deleteProduct = async (id) => {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      const response = await fetch(`${url}/api/v1/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Product deleted successfully");
        router.go(); // Refresh the page
      } else {
        const errorData = await response.json();
        alert(`Failed to delete product: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting the product: ", error);
      alert("An error occurred while deleting the product. Please try again.");
    }
  }
};
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>

<template>
  <div
    class="relative cursor-pointer bg-gray-50 rounded-lg hover:shadow-md p-4 items-center mt-4 transition-transform ease-in-out duration-300 transform hover:scale-105"
  >
    <!-- "Best Seller" Label -->
    <div
      v-if="offer.bestSeller"
      class="absolute top-2 left-2 text-white font-bold px-2 py-1 rounded-br-lg text-sm bg-orange-600"
    >
      Best Seller
    </div>

    <!-- Product Image -->
    <img
      :src="offer.image"
      alt="offer image"
      class="h-48 w-full object-cover rounded-md"
      @click="router.push(`/products/${offer._id}`)"
    />

    <!-- Offer Details -->
    <div class="mt-4">
      <h5 class="font-semibold uppercase">{{ offer.brandName }}</h5>
      <p class="line-clamp-1 text-gray-500">{{ offer.title }}</p>

      <div class="flex items-center justify-between mt-2">
        <div>
          <ul>
            <li v-for="size in offer.sizes" :key="size._id" class="flex gap-2">
              <!-- Display size details -->
              <p>
                <strong>{{ size.value }} {{ size.unit }}</strong>
              </p>
              <!-- <p>Value: {{ size.value }} {{ size.unit }}</p> -->
              <p>${{ size.price.toFixed(2) }}</p>
            </li>
          </ul>
          <!-- Discounted Price and Original Price -->
          <!-- <p v-if="offer.offerPrice">
            <span class="text-red-500 font-bold mr-2"
              >${{ offer.offerPrice }}</span
            >
            <span class="line-through text-gray-500">${{ offer.price }}</span>
            <span
              class="text-white font-semibold ml-2 bg-gray-600 rounded-bl-lg px-2 absolute top-2 right-2 py-1 text-sm"
            >
              -{{ discountPercentage }}%
            </span>
          </p> -->
          <!-- Regular Price -->
          <!-- <p v-else>${{ offer.price }}</p> -->
        </div>

        <!-- Cart Icon with Tooltip -->
        <div>
          <button
            class="fa-solid fa-cart-shopping text-gray-600 text-sm py-1 px-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            aria-label="Add to cart"
            title="Add to cart"
          ></button>
          <!-- Edit Offer Icon -->
          <button
            class="fa-solid fa-pen-to-square text-gray-600 text-sm py-1 px-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            @click="router.push(`/product/update/${offer._id}`)"
            aria-label="Edit offer"
            title="Edit offer"
          ></button>
          <!-- delete Offer Icon -->
          <button
            class="fa-solid fa-trash text-red-00 text-sm py-1 px-2 rounded-lg hover:bg-gray-200 transition-colors duration-300 rounded-lg"
            @click="deleteProduct(offer._id)"
            aria-label="Edit offer"
            title="Edit offer"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useRouter } from "vue-router";

// Define the 'offer' prop
const props = defineProps({
  offer: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

// Computed property to calculate the discount percentage
// const discountPercentage = computed(() => {
//   if (props.offer.price && props.offer.offerPrice) {
//     return Math.round(
//       ((props.offer.price - props.offer.offerPrice) / props.offer.price) * 100
//     );
//   }
//   return 0;
// });

const url = import.meta.env.VITE_API_URL; // API URL

// Function to delete the offer
// Function to delete the product
const deleteProduct = async (id) => {
  try {
    // Replace with your API base URL
    const response = await fetch(`${url}/api/v1/products/${id}`, {
      method: "DELETE",
    });

    // Check if the response is successful
    if (response.ok) {
      alert("Product deleted successfully");
      // Refresh the current page or navigate as needed
      router.go();
      // Alternatively, use router.push("/products"); to redirect to a products list page
    } else {
      // If the deletion was not successful, display an error message
      const errorData = await response.json();
      alert(`Failed to delete product: ${errorData.message}`);
    }
  } catch (error) {
    // Log the error and show an alert in case of a network or server issue
    console.error("Error deleting the product: ", error);
    alert("An error occurred while deleting the product. Please try again.");
  }
};
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>

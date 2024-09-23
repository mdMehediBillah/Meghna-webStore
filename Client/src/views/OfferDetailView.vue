<template>
  <div>
    <h1>Offer Detail View</h1>
    <div class="container mx-auto mt-6">
      <div v-if="offer" class="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
        <div>
          <img :src="offer.image" alt="offer image" class="w-full h-auto" />
        </div>
        <div>
          <h2 class="text-2xl font-semibold">{{ offer.name }}</h2>
          <p class="mt-4">{{ offer.description }}</p>
          <!-- Add more offer details here as needed -->
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

// State variables
const offer = ref(null);
const loading = ref(true);

// Get the id from the route params
const route = useRoute();
const { id } = route.params;
console.log(id);

// API base URL
const url = import.meta.env.VITE_API_URL || "http://localhost:8090";

// Fetch the offer data
const fetchOffer = async () => {
  try {
    loading.value = true; // Start the loading spinner
    const response = await axios.get(`${url}/api/v1/products/${id}`);
    offer.value = response.data;
  } catch (error) {
    console.error("Error fetching the product:", error);
    console.log("Error response:", error.response);
    console.log("Error status:", error.response?.status);
    console.log("Error data:", error.response?.data);
    updateProduct.value = null; // Handle the error state
  } finally {
    loading.value = false; // Stop the loading spinner
  }
};

onBeforeMount(() => {
  fetchOffer();
});
</script>

<style scoped>
/* Add some basic styles for the layout */
.container {
  padding: 1rem;
}

img {
  object-fit: cover;
  max-height: 500px;
}
</style>

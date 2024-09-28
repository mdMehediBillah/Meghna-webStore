<template>
  <section>
    <div class="container mx-auto">
      <div class="container mx-auto mt-6 mb-24">
        <!-- Show loading message while fetching data -->
        <div v-if="isLoading" class="text-center py-4">
          <p>Loading...</p>
        </div>

        <!-- Display product details if available -->
        <div
          v-else-if="product"
          class="grid lg:grid-cols-2 md:grid-cols-1 gap-2"
        >
          <!-- Product Image and Labels Container -->
          <div class="flex justify-end">
            <img
              :src="product.image"
              :alt="product.brandName"
              class="h-[400px] object-cover rounded-md"
            />
          </div>

          <!-- Product Details -->
          <div>
            <h1
              class="uppercase text-md font-semibold my-4 border-b-2 border-gray-300 pb-2"
            >
              Product Details
            </h1>
            <h2 class="text-2xl font-semibold">{{ product.brandName }}</h2>
            <p class="mt-2">{{ product.title }}</p>

            <!-- Size and Price Details -->
            <div class="mt-2">
              <ul>
                <li
                  v-for="size in product.sizes"
                  :key="size._id"
                  class="flex gap-6 items-center"
                >
                  <span
                    class="text-gray-800 font-semibold bg-gray-200 py-1 px-4 border border-gray-300 rounded-lg"
                  >
                    {{ size.value }}
                    {{ size.unit }}
                  </span>
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
              <!-- Product Labels -->
              <div class="flex mt-4 gap-1">
                <!-- "Best Seller" Label -->
                <div
                  v-if="product.isBestSeller"
                  class="text-gray-800 font-semibold px-3 py-1 rounded-md bg-gray-50 border border-gray-300"
                >
                  Best Seller
                </div>

                <!-- "New Arrival" Label -->
                <div
                  v-if="product.isNewArrival"
                  class="text-gray-800 font-semibold px-3 py-1 rounded-md bg-gray-50 border border-gray-300"
                >
                  New Ariival
                </div>

                <!-- Discount percentage label -->
                <div
                  v-if="product.offer?.discountPercentage > 0"
                  class="text-gray-800 font-semibold px-3 py-1 rounded-md bg-gray-50 border border-gray-300"
                >
                  {{ product.offer.discountPercentage }}% Off
                </div>
              </div>

              <div class="flex flex-col mt-8 gap-2">
                <span>Only {{ product.stock }} items left of this product</span>
                <!-- Cart Icon -->
                <div>
                  <button
                    class="bg-green-600 text-gray-50 py-2 px-20 rounded-lg hover:bg-rose-500 transition-colors duration-300"
                    aria-label="Add to cart"
                    title="Add to cart"
                    @click="addItemToCart(product)"
                  >
                    <i class="fa-solid fa-cart-shopping"></i>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            <p class="mt-2">{{ product.description }}</p>
            <!-- Add more product details here as needed -->
          </div>
        </div>

        <!-- Display an error message if product not found -->
        <div v-else class="text-center py-4 text-red-500">
          <p>Product not found or an error occurred.</p>
        </div>
      </div>
    </div>
    <FooterComponents />
  </section>
</template>
<script setup>
import { computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import FooterComponents from "@/components/footer/FooterComponents.vue";
import { useProductStore } from "@/stores/useProductStore.js";

// Get the product ID from the route params
const route = useRoute();
const { id } = route.params;

// Use the product store
const productStore = useProductStore();
const { fetchProducts, isLoading, productById } = productStore;

// Computed property to get the product by ID from the store
const product = computed(() => productById(id));

// Fetch the products when the component is mounted
onBeforeMount(async () => {
  await fetchProducts();
});

// Add the product to the cart
import { useCartStore } from "@/stores/cartStore.js"; // Import the cart store

// Get the cart store instance
const cartStore = useCartStore();

// Method to add product to the cart
const addItemToCart = (item) => {
  console.log("Current cart items:", cartStore.cartItems); // Debugging line
  const existingItem = cartStore.cartItems.find(
    (cartItem) => cartItem.id === id
  );
  console.log(id); // Debugging line

  if (existingItem) {
    console.log("Item already in cart. Increasing quantity."); // Debugging line
    existingItem.quantity += 1; // Increase quantity if item already exists
  } else {
    console.log("Adding new item to cart."); // Debugging line
    cartStore.cartItems.push({ ...item, quantity: 1 }); // Add new item with quantity 1
    disableButton();
  }
};

// Disable the add to cart button after adding the item
const disableButton = () => {
  const button = document.querySelector("button");
  button.disabled = true;
  button.textContent = "Added to cart";
};
</script>

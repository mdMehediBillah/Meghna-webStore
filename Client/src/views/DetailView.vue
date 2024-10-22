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
          v-else-if="productForDetail"
          class="grid lg:grid-cols-2 md:grid-cols-1 gap-2"
        >
          <!-- Product Image and Labels Container -->
          <div class="flex justify-end">
            <img
              :src="productForDetail.image"
              :alt="productForDetail.brandName"
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
            <h2 class="text-2xl font-semibold">
              {{ productForDetail.brandName }}
            </h2>
            <p class="mt-2">{{ productForDetail.title }}</p>

            <!-- Size and Price Details -->
            <div class="mt-2">
              <ul>
                <li
                  v-for="size in productForDetail.sizes"
                  :key="size._id"
                  class="flex gap-6 items-center"
                >
                  <span
                    class="text-gray-800 font-semibold bg-gray-200 py-1 px-4 border border-gray-300 rounded-lg"
                  >
                    {{ size.value }} {{ size.unit }}
                  </span>
                  <div class="flex items-center">
                    <!-- Display Discounted Price -->
                    <span
                      v-if="productForDetail.offer?.discountPercentage > 0"
                      class="text-red-600 font-semibold mr-2"
                    >
                      €{{
                        (
                          size.price -
                          (size.price *
                            productForDetail.offer.discountPercentage) /
                            100
                        ).toFixed(2)
                      }}
                    </span>
                    <!-- Display Original Price with Line-through if Discounted -->
                    <span
                      v-if="productForDetail.offer?.discountPercentage > 0"
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
                  v-if="productForDetail.isBestSeller"
                  class="text-gray-800 font-semibold px-3 py-1 rounded-md bg-gray-50 border border-gray-300"
                >
                  Best Seller
                </div>

                <!-- "New Arrival" Label -->
                <div
                  v-if="productForDetail.isNewArrival"
                  class="text-gray-800 font-semibold px-3 py-1 rounded-md bg-gray-50 border border-gray-300"
                >
                  New Arrival
                </div>

                <!-- Discount percentage label -->
                <div
                  v-if="productForDetail.offer?.discountPercentage > 0"
                  class="text-gray-800 font-semibold px-3 py-1 rounded-md bg-gray-50 border border-gray-300"
                >
                  {{ productForDetail.offer.discountPercentage }}% Off
                </div>
              </div>

              <div class="flex flex-col mt-8 gap-2">
                <span
                  >Only {{ productForDetail.stock }} items left of this
                  product</span
                >

                <!-- Cart Icon -->
                <div>
                  <button
                    class="bg-green-600 text-gray-50 py-2 px-20 rounded-lg hover:bg-rose-500 transition-colors duration-300"
                    :disabled="isAddedToCart"
                    aria-label="Add to cart"
                    title="Add to cart"
                    @click="addItemToCart(productForDetail)"
                  >
                    <i class="fa-solid fa-cart-shopping"></i>
                    {{ isAddedToCart ? "Added to cart" : "Add to cart" }}
                  </button>
                </div>
              </div>
            </div>

            <p class="mt-2">{{ productForDetail.description }}</p>
          </div>
        </div>

        <!-- Display an error message if product not found -->
        <div v-else class="text-center py-4 text-red-500">
          <p>Product not found or an error occurred.</p>
        </div>
      </div>
    </div>

    <!-- "You may also like" section -->
    <section class="container mx-auto">
      <div>
        <h3 class="uppercase">You may also like</h3>
        <div
          v-if="filteredMayLikeProducts.length === 0"
          class="text-center py-10"
        >
          <p class="text-gray-500 text-xl">No products found</p>
        </div>

        <div
          v-else
          class="grid lg:grid-cols-6 md:grid-cols-3 gap-4 container justify-between mb-24"
        >
          <div
            class="col-md-4"
            v-for="product in filteredMayLikeProducts"
            :key="product._id"
          >
            <SingleCard :product="product" />
          </div>
        </div>
      </div>
    </section>

    <FooterComponents />
  </section>
</template>

<script setup>
import SingleCard from "../components/Cards/SingleCard.vue";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import FooterComponents from "@/components/footer/FooterComponents.vue";
import { useProductStore } from "@/stores/useProductStore.js";
import { useCartStore } from "@/stores/cartStore.js";

// Get the product ID from the route params
const route = useRoute();
const { id } = route.params;

// Use the product store
const productStore = useProductStore();
const { fetchProducts, isLoading, productById, allProducts } = productStore;

// Fetch the products when the component is mounted
onBeforeMount(async () => {
  await fetchProducts();
});

// Computed property to get the product by ID from the store
const productForDetail = computed(() => productById(id));

// Get the cart store instance
const cartStore = useCartStore();
const isAddedToCart = ref(false); // Track the cart button state

// Method to add product to the cart
const addItemToCart = (item) => {
  const existingItem = cartStore.cartItems.find(
    (cartItem) => cartItem.id === id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartStore.cartItems.push({ ...item, quantity: 1 });
  }

  isAddedToCart.value = true;
};

// Computed property for filtered "You may also like" products
const filteredMayLikeProducts = computed(() => {
  // Check if productForDetail is available before filtering
  if (productForDetail.value) {
    return allProducts.filter((product) => {
      // Return products from the same category, excluding the current product
      return (
        product.category === productForDetail.value.category &&
        product._id !== id
      );
    });
  }
  return [];
});
</script>

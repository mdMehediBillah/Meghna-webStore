<template>
  <div class="container mx-auto my-8">
    <h1 class="text-2xl font-bold mb-4">Your Shopping Cart</h1>

    <!-- Check if the cart has items -->
    <div v-if="cartItems.length > 0">
      <!-- Display list of cart items -->
      <ul>
        <li
          v-for="item in cartItems"
          :key="item.id"
          class="flex justify-between items-center border-b py-4"
        >
          <!-- Product details -->
          <div class="flex items-center gap-4">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-24 h-24 object-cover rounded-md relative"
            />
            <div>
              <h2 class="text-md font-semibold">{{ item.title }}</h2>

              <!-- Show remaining stock -->
              <p class="text-gray-500">
                Only {{ item.stock - item.quantity }} items left
              </p>

              <ul>
                <li
                  v-for="size in item.sizes"
                  :key="size._id"
                  class="flex flex-col gap-2"
                >
                  <div class="flex items-center">
                    <!-- Display Discounted Price -->
                    <span
                      v-if="item.offer?.discountPercentage > 0"
                      class="text-red-600 font-semibold mr-2"
                    >
                      €{{
                        (
                          size.price -
                          (size.price * item.offer.discountPercentage) / 100
                        ).toFixed(2)
                      }}
                    </span>
                    <!-- Display Original Price with Line-through if Discounted -->
                    <span
                      v-if="item.offer?.discountPercentage > 0"
                      class="line-through text-gray-500 mr-2"
                    >
                      €{{ size.price.toFixed(2) }}
                    </span>
                    <!-- Display Original Price Only (No Discount) -->
                    <span v-else class="text-gray-800 font-semibold">
                      Price: €{{ size.price.toFixed(2) }}
                    </span>
                  </div>
                  <div class="flex gap-4 items-center">
                    <div class="my-2">
                      <span
                        class="text-gray-800 font-semibold bg-gray-100 py-1 px-2 border border-gray-300 rounded-lg"
                      >
                        {{ size.value }} {{ size.unit }}
                      </span>
                    </div>
                    <div class="flex items-center gap-6">
                      <p class="text-gray-700">Quantity: {{ item.quantity }}</p>
                      <div class="flex items-center gap-2">
                        <i
                          class="fa-solid fa-plus p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition text-xs font-bold"
                          @click="increaseQuantity(item)"
                        ></i>
                        <i
                          class="fa-solid fa-minus p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition text-xs font-bold"
                          @click="decreaseQuantity(item)"
                        ></i>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Remove button -->
          <button
            @click="removeFromCart(item.id)"
            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Remove
          </button>
        </li>
      </ul>

      <!-- Total price -->
      <div class="mt-6 text-right">
        <h3 class="text-lg font-semibold">
          Total: €{{ cartTotal.toFixed(2) }}
        </h3>
      </div>
    </div>

    <!-- Show message if the cart is empty -->
    <div v-else>
      <p class="text-gray-500">Your cart is empty</p>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cartStore";
import { computed } from "vue";

// Access the cart store
const cartStore = useCartStore();

// Reactive computed property to get cart items
const cartItems = computed(() => cartStore.cartItems);

// Computed property for calculating the total price
const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    // Calculate total for each size based on quantity and discount if available
    const itemTotal = item.sizes.reduce((sizeTotal, size) => {
      const price = item.offer?.discountPercentage
        ? size.price - (size.price * item.offer.discountPercentage) / 100
        : size.price;
      return sizeTotal + price * item.quantity; // Assuming the quantity is applied to the item, not size
    }, 0);
    return total + itemTotal;
  }, 0);
});

// Function to increase quantity
const increaseQuantity = (item) => {
  item.quantity += 1;
};

// Function to decrease quantity
const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity -= 1; // Prevent quantity going below 1
  }
};

// Remove item from the cart
const removeFromCart = (id) => {
  cartStore.cartItems = cartStore.cartItems.filter((item) => item.id !== id);
};
</script>

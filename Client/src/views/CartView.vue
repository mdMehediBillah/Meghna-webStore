<template>
  <div class="container mx-auto my-8">
    <h1 class="text-2xl font-bold mb-4">Your Shopping Cart</h1>

    <!-- Check if the cart has items -->
    <div v-if="cartItems.length > 0" class="flex gap-4 justify-between">
      <!-- Display list of cart items -->
      <ul>
        <li
          v-for="item in cartItems"
          :key="item._id"
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
              <h2 class="text-md font-semibold mb-1">{{ item.title }}</h2>

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
                    <div class="my-1">
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
                          class="fa-solid fa-minus p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition text-xs font-bold"
                          @click="decreaseQuantity(item)"
                        ></i>
                        <i
                          class="fa-solid fa-plus p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 transition text-xs font-bold"
                          @click="increaseQuantity(item)"
                        ></i>
                      </div>
                    </div>
                    <div>
                      <p class="text-gray-700">
                        Total: €{{ (size.price * item.quantity).toFixed(2) }}
                      </p>
                    </div>
                    <!-- Remove button -->
                    <div>
                      <i
                        class="fa-solid fa-trash p-2 rounded-full bg-red-200 cursor-pointer hover:bg-red-500 transition text-xs"
                        @click="removeItem(item._id)"
                      ></i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>

      <div class="min-w-[360px]">
        <!-- Shipping status text -->
        <p
          class="text-sm px-4 py-1 rounded text-center"
          :class="progressPercentage >= 100 ? 'text-cyan-600' : 'text-gray-600'"
        >
          {{
            progressPercentage >= 100
              ? "Free shipping unlocked!"
              : `Spend €${(40 - cartTotal).toFixed(2)} more for free shipping`
          }}
        </p>
        <div class="w-full bg-gray-300 rounded h-2 mt-1">
          <!-- Progress bar -->
          <div
            class="h-2 rounded"
            :style="{ width: `${progressPercentage}%` }"
            :class="progressPercentage >= 100 ? 'bg-cyan-500' : 'bg-red-500'"
          ></div>
        </div>

        <!-- Cart Summary -->
        <ul class="bg-gray-700 p-3 rounded shadow-md border-2 text-gray-50">
          <li
            v-for="item in cartItems"
            :key="item._id"
            class="flex justify-between border-b py-1 gap-4"
          >
            <div class="flex gap-4">
              <h2 class="text-[16px] mb-1">{{ item.title }}</h2>
            </div>
            <div v-for="size in item.sizes" :key="size._id">
              <p class="font-semibold">
                €{{ (size.price * item.quantity).toFixed(2) }}
              </p>
            </div>
          </li>

          <div
            class="flex gap-4 justify-between mt-6 text-yellow-300 font-semibold"
          >
            <h2 class="text-[16px] mb-1">Product Cost</h2>
            <p class="">€{{ cartTotal.toFixed(2) }}</p>
          </div>

          <div class="flex gap-4 justify-between mt-2">
            <h2 class="text-[16px] mb-1">Shipping Cost</h2>
            <p class="font-semibold">€{{ shippingCost.toFixed(2) }}</p>
          </div>
          <p
            class="text-sm bg-cyan-800 px-4 py-1 rounded text-center"
            :class="
              shippingCost > 0
                ? 'bg-yellow-100 text-gray-600'
                : 'bg-green-300 text-gray-800'
            "
          >
            {{
              shippingCost > 0
                ? "Free shipping over 40 euro purchase"
                : "Free shipping"
            }}
          </p>
        </ul>

        <!-- Total price -->
        <div
          class="mt-4 text-right text-lg font-semibold bg-rose-600 px-2 py-1 text-gray-50 rounded cursor-pointer hover:bg-green-600 transition flex justify-between items-center"
        >
          <h3 class="">Total Cost:</h3>
          <h3>€{{ (cartTotal + shippingCost).toFixed(2) }}</h3>
        </div>
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
    const itemTotal = item.sizes.reduce((sizeTotal, size) => {
      const price = item.offer?.discountPercentage
        ? size.price - (size.price * item.offer.discountPercentage) / 100
        : size.price;
      return sizeTotal + price * item.quantity;
    }, 0);
    return total + itemTotal;
  }, 0);
});

// Function to increase quantity
const increaseQuantity = (item) => {
  cartStore.increaseQuantity(item._id); // Call store action
};

// Function to decrease quantity
const decreaseQuantity = (item) => {
  cartStore.decreaseQuantity(item._id); // Call store action
};

// Method to remove an item from the cart
const removeItem = (id) => {
  console.log("Removing item with ID:", id);
  if (!id) {
    console.error("ID is undefined or invalid.");
    return;
  }
  cartStore.removeItemFromCart(id); // Call store action
};

// Computed property to conditionally add shipping cost
const shippingCost = computed(() => {
  return cartTotal.value >= 40 ? 0 : 6.99; // No shipping cost for orders above €40
});

// Define free shipping threshold
const freeShippingThreshold = 40;

// Calculate the progress percentage toward free shipping
const progressPercentage = computed(() => {
  return Math.min((cartTotal.value / freeShippingThreshold) * 100, 100);
});
</script>

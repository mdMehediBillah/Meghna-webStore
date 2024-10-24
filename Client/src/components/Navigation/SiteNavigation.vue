<template>
  <header class="sticky top-0 bg-gray-50 shadow z-50 px-4">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-gray-600 py-4 justify-between"
    >
      <!-- Logo -->
      <router-link
        :to="{ name: 'home' }"
        class="text-2xl font-bold flex items-center gap-2"
      >
        <div>
          <img src="../../assets/photos/logo.png" alt="logo" class="h-12" />
        </div>
        <span class="text-3xl"></span>
      </router-link>

      <!-- Search form -->
      <form
        class="flex items-center bg-gray-200 rounded-xl py-1 px-4 gap-2 sm:w-full md:w-1/2 lg:w-1/3"
        @submit.prevent="performSearch"
      >
        <div>
          <i class="fa-solid fa-magnifying-glass cursor-pointer"></i>
        </div>
        <div>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search for products..."
            class="border-none bg-transparent rounded-lg p-2 active:outline-none focus:outline-none w-full"
          />
        </div>
      </form>

      <!-- Language and user/cart icons -->
      <div class="flex gap-4 items-center">
        <!-- Language Selector -->
        <div class="flex items-center gap-1 text-gray-600 relative">
          <img
            :src="currentLangIcon"
            :alt="`language-icon-${selectedLanguage}`"
            class="w-6"
          />
          <select
            v-model="selectedLanguage"
            class="text-sm font-semibold bg-transparent border-none active:outline-none focus:outline-none cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="de">DE</option>
          </select>
        </div>

        <!-- User and Cart icons -->
        <div class="relative">
          <!-- User Icon with Hover Effects -->
          <i
            class="fa-solid fa-circle-user text-2xl transition ease-in-out delay-125 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer"
            @click="showDropdown = !showDropdown"
          ></i>

          <!-- Dropdown for Login and Admin -->
          <div
            v-if="showDropdown"
            class="absolute bg-gray-200 px-2 py-1 mt-2 rounded shadow-md z-50 bottom-[-72px] right-[-20px]"
            @mouseenter="showDropdown = true"
            @mouseleave="showDropdown = false"
          >
            <span
              class="cursor-pointer block hover:bg-rose-300 p-1 rounded font-semibold"
              >Login</span
            >
            <router-link :to="{ name: 'admin' }">
              <span
                class="cursor-pointer block hover:bg-rose-300 p-1 rounded font-semibold"
                >Admin</span
              >
            </router-link>
          </div>
        </div>

        <!-- Cart Icon with item count -->
        <router-link :to="{ name: 'cart' }" class="relative">
          <div class="relative">
            <!-- Cart Icon -->
            <i
              class="fa-solid fa-cart-shopping text-xl text-gray-600 transition ease-in-out delay-125 hover:-translate-y-1 hover:scale-110 duration-300"
              aria-label="Go to cart"
            ></i>

            <!-- Cart Item Count -->
            <span
              v-if="cartItemCount >= 0"
              class="text-xs font-semibold absolute top-[-8px] right-[-12px] bg-red-500 text-white rounded-full px-1.5 py-0.5"
            >
              {{ cartItemCount }}
            </span>
          </div>
        </router-link>
      </div>
    </nav>

    <!-- Category menu -->
    <div
      class="flex container items-center gap-8 text-xs font-medium justify-center pt-2 mb-2 flex-wrap"
    >
      <div class="flex items-center gap-2 text-gray-600">
        <router-link
          to="/products"
          class="cursor-pointer hover:underline transition-colors duration-300"
        >
          <span class="uppercase hover:text-red-600">All Products</span>
        </router-link>
      </div>
      <div class="flex items-center gap-2 text-gray-600">
        <router-link
          to="/categories"
          class="cursor-pointer hover:underline transition-colors duration-300"
        >
          <span class="uppercase hover:text-red-600">Categories</span>
        </router-link>
      </div>
      <div class="flex items-center gap-2 text-gray-600">
        <router-link
          to="/spices"
          class="cursor-pointer hover:underline transition-colors duration-300"
        >
          <span class="uppercase hover:text-red-600">Spices</span>
        </router-link>
      </div>
      <div class="flex items-center gap-2 text-gray-600">
        <router-link
          to="/fruits-vegetables"
          class="cursor-pointer hover:underline transition-colors duration-300"
        >
          <span class="uppercase hover:text-red-600">Fruits & Vegetables</span>
        </router-link>
      </div>
      <div class="flex items-center gap-2 text-gray-600">
        <router-link
          to="/frozen-products"
          class="cursor-pointer hover:underline transition-colors duration-300"
        >
          <span class="uppercase hover:text-red-600">Frozen Products</span>
        </router-link>
      </div>
      <div class="flex items-center gap-2 text-gray-600">
        <router-link
          to="/bestSellers"
          class="cursor-pointer hover:underline transition-colors duration-300"
        >
          <span class="uppercase hover:text-red-600">BestSellers</span>
        </router-link>
      </div>

      <div class="flex items-center gap-2 text-gray-600">
        <router-link
          to="/newArrivals"
          class="cursor-pointer hover:underline transition-colors duration-300"
        >
          <span class="uppercase hover:text-red-600">New Arrivals</span>
        </router-link>
      </div>
      <div class="flex items-center gap-2 text-gray-600">
        <router-link
          to="/offers"
          class="cursor-pointer hover:underline transition-colors duration-300"
        >
          <span class="uppercase hover:text-red-600">Weekly Deals</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import engIcon from "../../assets/photos/eng-lan-icon.png";
import gerIcon from "../../assets/photos/ger-lan-icon.png";

// Define the selected language as a reactive property
const selectedLanguage = ref("en");

// Define a computed property for the language icon
const currentLangIcon = computed(() => {
  return selectedLanguage.value === "en" ? engIcon : gerIcon;
});

// Handle language change
watch(selectedLanguage, (newLang) => {
  console.log("Language changed to:", newLang);
  // Additional logic to handle language change can be added here
});

// Define the cart item count

import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems);
const cartItemCount = computed(() => cartStore.cartItemCount);

// Define a reactive user property to show/hide the user dropdown

const showDropdown = ref(false); // Controls visibility of the user dropdown
import { useRouter } from "vue-router";

const searchQuery = ref(""); // Reactive property for the search input
const router = useRouter();

// Method to handle search
const performSearch = () => {
  if (searchQuery.value.trim()) {
    // Navigate to the search results page with the search query as a route parameter
    router.push({ name: "searchResults", query: { q: searchQuery.value } });
  }
};
</script>

<style scoped></style>

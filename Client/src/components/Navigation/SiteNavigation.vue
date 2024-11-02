<template>
  <header class="sticky top-0 bg-gray-50 shadow z-50 px-4">
    <nav
      class="container flex flex-col gap-2 md:flex-row items-center justify-between text-gray-600 py-4"
    >
      <!-- Logo -->
      <router-link
        :to="{ name: 'home' }"
        class="text-2xl font-bold flex items-center gap-2"
      >
        <img src="../../assets/photos/logo.png" alt="logo" class="h-12" />
      </router-link>
      <!-- Left section: Logo & Hamburger (for mobile) -->
      <div class="flex justify-between w-full gap-2 px-[2px]">
        <div class="flex items-center gap-4">
          <!-- Hamburger menu (visible only on mobile) -->
          <button
            class="sm:hidden"
            @click="toggleMobileMenu = !toggleMobileMenu"
          >
            <i class="fa-solid fa-bars text-2xl cursor-pointer"></i>
          </button>
        </div>
        <!-- Middle section: Search form -->
        <form
          class="flex items-center bg-gray-200 rounded-xl py-1 px-4 gap-2 sm:hidden md:flex w-48 md:w-1/2 lg:w-1/3"
          @submit.prevent="performSearch"
        >
          <i class="fa-solid fa-magnifying-glass cursor-pointer"></i>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search ..."
            class="border-none bg-transparent rounded-lg p-2 active:outline-none focus:outline-none hidden md:block"
          />
        </form>
        <!-- Right section: Language, User, Cart Icons -->
        <div class="flex gap-4 items-center">
          <!-- Language Selector -->
          <div class="hidden sm:flex items-center gap-1 text-gray-600">
            <img
              :src="currentLangIcon"
              :alt="`language-icon-${selectedLanguage}`"
              class="w-6"
            />
            <select
              v-model="selectedLanguage"
              class="text-sm font-semibold bg-transparent border-none"
            >
              <option value="en">EN</option>
              <option value="de">DE</option>
            </select>
          </div>
          <!-- User Icon with Dropdown -->
          <div class="relative hidden md:block">
            <i
              class="fa-solid fa-circle-user text-2xl cursor-pointer"
              @click="showUserDropdown = !showUserDropdown"
            ></i>
            <div
              v-if="showUserDropdown"
              class="absolute bg-gray-200 px-2 py-1 mt-2 rounded shadow-md z-50"
              @mouseenter="showUserDropdown = true"
              @mouseleave="showUserDropdown = false"
            >
              <span class="cursor-pointer block hover:bg-rose-300 p-1 rounded"
                >Login</span
              >
              <router-link :to="{ name: 'admin' }">
                <span class="cursor-pointer block hover:bg-rose-300 p-1 rounded"
                  >Admin</span
                >
              </router-link>
            </div>
          </div>
          <!-- Cart Icon with item count -->
          <router-link :to="{ name: 'cart' }" class="relative">
            <i class="fa-solid fa-cart-shopping text-xl text-gray-600"></i>
            <span
              v-if="cartItemCount >= 0"
              class="text-xs font-semibold absolute top-[-8px] right-[-12px] bg-red-500 text-white rounded-full px-1.5 py-0.5"
            >
              {{ cartItemCount }}
            </span>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu for Categories (Toggled with Hamburger) -->
    <div v-if="toggleMobileMenu" class="sm:hidden bg-gray-100 py-2">
      <router-link
        to="/"
        class="block py-1 px-4 text-gray-600 hover:bg-gray-200"
        >User</router-link
      >
      <router-link
        to="/products"
        class="block py-1 px-4 text-gray-600 hover:bg-gray-200"
        >All Products</router-link
      >
      <router-link
        to="/spices"
        class="block py-1 px-4 text-gray-600 hover:bg-gray-200"
        >Spices</router-link
      >
      <router-link
        to="/fruits-vegetables"
        class="block py-1 px-4 text-gray-600 hover:bg-gray-200"
        >Fruits & Vegetables</router-link
      >
      <router-link
        to="/frozen-products"
        class="block py-1 px-4 text-gray-600 hover:bg-gray-200"
        >Frozen Products</router-link
      >
      <router-link
        to="/bestSellers"
        class="block py-1 px-4 text-gray-600 hover:bg-gray-200"
        >BestSellers</router-link
      >
      <router-link
        to="/newArrivals"
        class="block py-1 px-4 text-gray-600 hover:bg-gray-200"
        >New Arrivals</router-link
      >
      <router-link
        to="/offers"
        class="block py-1 px-4 text-gray-600 hover:bg-gray-200"
        >Weekly Deals</router-link
      >
    </div>

    <!-- Desktop Category Menu -->
    <div
      class="hidden md:flex container items-center gap-8 text-xs font-medium justify-center pt-2 mb-2 flex-wrap"
    >
      <router-link
        to="/products"
        class="uppercase text-gray-600 hover:text-red-600"
        >All Products</router-link
      >
      <router-link
        to="/spices"
        class="uppercase text-gray-600 hover:text-red-600"
        >Spices</router-link
      >
      <router-link
        to="/fruits-vegetables"
        class="uppercase text-gray-600 hover:text-red-600"
        >Fruits & Vegetables</router-link
      >
      <router-link
        to="/frozen-products"
        class="uppercase text-gray-600 hover:text-red-600"
        >Frozen Products</router-link
      >
      <router-link
        to="/bestSellers"
        class="uppercase text-gray-600 hover:text-red-600"
        >BestSellers</router-link
      >
      <router-link
        to="/newArrivals"
        class="uppercase text-gray-600 hover:text-red-600"
        >New Arrivals</router-link
      >
      <router-link
        to="/offers"
        class="uppercase text-gray-600 hover:text-red-600"
        >Weekly Deals</router-link
      >
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import engIcon from "../../assets/photos/eng-lan-icon.png";
import gerIcon from "../../assets/photos/ger-lan-icon.png";
import { useCartStore } from "../../stores/cartStore";

const store = useCartStore();
const cartItemCount = computed(() => store.cartItemCount);
const selectedLanguage = ref("en");
const currentLangIcon = computed(() =>
  selectedLanguage.value === "en" ? engIcon : gerIcon
);
const showUserDropdown = ref(false);
const toggleMobileMenu = ref(false); // Toggle state for mobile menu

const searchQuery = ref("");
const router = useRouter();
const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: "searchResults", query: { q: searchQuery.value } });
  }
};
</script>

<style scoped></style>

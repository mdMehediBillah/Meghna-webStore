<template>
  <header class="sticky top-0 bg-gray-50 shadow z-50">
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
      >
        <div>
          <i class="fa-solid fa-magnifying-glass cursor-pointer"></i>
        </div>
        <div>
          <input
            type="text"
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
        <router-link :to="{ name: 'home' }">
          <i
            class="fa-solid fa-circle-user text-2xl transition ease-in-out delay-125 hover:-translate-y-1 hover:scale-110 duration-300"
          ></i>
        </router-link>
        <router-link :to="{ name: 'about' }">
          <i
            class="fa-solid fa-cart-shopping text-xl transition ease-in-out delay-125 hover:-translate-y-1 hover:scale-110 duration-300"
          ></i>
        </router-link>

        <!-- Add product button -->
        <router-link :to="{ name: 'addProduct' }">
          <div>
            <span class="cursor-pointer">Add</span>
          </div>
        </router-link>

        <!-- Add category button -->
        <router-link :to="{ name: 'addCategory' }">
          <div>
            <span class="cursor-pointer">Category</span>
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
</script>

<style lang="scss" scoped></style>

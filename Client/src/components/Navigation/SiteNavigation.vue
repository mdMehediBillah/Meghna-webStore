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
          <!-- User Icon with Click Effects -->
          <i
            class="fa-solid fa-circle-user text-2xl transition ease-in-out delay-125 hover:-translate-y-1 hover:scale-110 duration-300 cursor-pointer"
            @click="showUserDropdown = !showUserDropdown"
          ></i>

          <!-- Dropdown for Login and Admin -->
          <div
            v-if="showUserDropdown"
            class="absolute bg-gray-200 px-2 py-1 mt-2 rounded shadow-md z-50"
            @mouseenter="showUserDropdown = true"
            @mouseleave="showUserDropdown = false"
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
          <i
            class="fa-solid fa-cart-shopping text-xl text-gray-600 transition ease-in-out delay-125 hover:-translate-y-1 hover:scale-110 duration-300"
            aria-label="Go to cart"
          ></i>
          <span
            v-if="cartItemCount >= 0"
            class="text-xs font-semibold absolute top-[-8px] right-[-12px] bg-red-500 text-white rounded-full px-1.5 py-0.5"
          >
            {{ cartItemCount }}
          </span>
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
      <!-- Category Dropdown -->
      <div
        class="relative"
        :class="showCategoryDropdown ? 'text-blue-600' : 'text-gray-600'"
      >
        <span
          class="uppercase hover:text-red-600 cursor-pointer"
          @mouseenter="toggleCategoryDropdown(true)"
          @mouseleave="toggleCategoryDropdown(false)"
        >
          Categories
        </span>

        <!-- Dropdown for Categories -->
        <div
          v-if="showCategoryDropdown && allCategories.length > 0"
          class="absolute bg-slate-200 left-1/2 transform -translate-x-1/2 shadow-md rounded px-4 py-2 z-50 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-w-[1000px] min-w-[300px] sm:w-[200px] md:w-[700px] lg:w-[400px] xl:w-[600px] 2xl:w-[800px] 3xl:w-[1000px]"
          @mouseenter="toggleCategoryDropdown(true)"
          @mouseleave="toggleCategoryDropdown(false)"
        >
          <router-link
            v-for="category in allCategories"
            :key="category?._id"
            :to="`/category/${category._id}`"
            class="block hover:bg-slate-500 px-2 py-1 rounded transition-colors duration-300 hover:text-slate-100"
          >
            {{ category?.name || "Unnamed Category" }}
          </router-link>
        </div>
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import engIcon from "../../assets/photos/eng-lan-icon.png";
import gerIcon from "../../assets/photos/ger-lan-icon.png";
import { useCartStore } from "../../stores/cartStore";
const store = useCartStore();
// Access the cart item count directly from the store's getter
const cartItemCount = computed(() => store.cartItemCount);

const selectedLanguage = ref("en");
const currentLangIcon = computed(() =>
  selectedLanguage.value === "en" ? engIcon : gerIcon
);
const showUserDropdown = ref(false); // For User/Admin dropdown
const showCategoryDropdown = ref(false); // For Category dropdown
// const cartItemCount = ref(0);
const searchQuery = ref("");
const allCategories = ref([]);
const router = useRouter();

// Fetch all categories only once when component mounts
const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/categories`
    );
    allCategories.value = response.data || []; // Fallback to empty array if data is null
  } catch (error) {
    console.error("Failed to fetch categories", error);
    allCategories.value = []; // Ensure it remains an array on error
  }
};

// Handle dropdown toggle
const toggleCategoryDropdown = (isVisible) => {
  showCategoryDropdown.value = isVisible;
};

// Search function
const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: "searchResults", query: { q: searchQuery.value } });
  }
};

const moveToCategory = (categoryId) => {
  router.push({ name: "category", params: { id: categoryId } });
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped></style>

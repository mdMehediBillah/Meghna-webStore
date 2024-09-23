// src/stores/useProductStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchProducts() {
      if (this.products.length > 0) return; // Prevent unnecessary fetch

      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/products` // Use environment variable
        );
        this.products = response.data; // Assuming API returns an array of products
      } catch (error) {
        this.error =
          error.response?.data?.message || "Failed to fetch products"; // Detailed error
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },

  getters: {
    allProducts: (state) => state.products,
    newArrivals: (state) =>
      state.products.filter((product) => product.isNewArrival),
    discountedProducts: (state) =>
      state.products.filter(
        (product) => product.offer && product.offer.discountPercentage > 0
      ),
    bestSellers: (state) =>
      state.products.filter((product) => product.isBestSeller), // Assuming you have an 'isBestSeller' property
    riceCategoryProducts: (state) =>
      state.products.filter((product) => product.category === "Rice"), // Adjust the category condition as needed
  },
});

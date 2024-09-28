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
          `${import.meta.env.VITE_API_URL}/api/v1/products`
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

    // Updated getter to use _id (assuming your products have _id instead of id)
    productById: (state) => (id) =>
      state.products.find((product) => product._id === id),

    newArrivals: (state) =>
      state.products.filter((product) => product.isNewArrival),

    discountedProducts: (state) =>
      state.products.filter(
        (product) => product.offer && product.offer.discountPercentage > 0
      ),

    bestSellers: (state) =>
      state.products.filter((product) => product.isBestSeller),

    // Category-specific filtering can be done like this
    riceCategoryProducts: (state) =>
      state.products.filter((product) => product.category === "Rice"),

    // Example for filtering gluten-free or vegan products
    glutenFreeProducts: (state) =>
      state.products.filter((product) => product.glutenFree),

    veganProducts: (state) => state.products.filter((product) => product.vegan),
  },
});

import { defineStore } from "pinia";
import { useProductStore } from "@/stores/useProductStore"; // Import the product store

export const useHomeStore = defineStore("homeStore", {
  state: () => ({}), // No state needed since we're using data from other stores

  actions: {
    async fetchHomeData() {
      const productStore = useProductStore(); // Access product store

      // Check if products are already fetched, if not, fetch them
      if (productStore.products.length === 0) {
        await productStore.fetchProducts(); // Fetch product data from productStore
      }

      // Now you can access productStore data and getters
      // Example: productStore.newArrivals, productStore.discountedProducts
    },
  },

  getters: {
    // Example: Create getters that access productStore getters
    homeNewArrivals() {
      const productStore = useProductStore(); // Access product store
      return productStore.newArrivals; // Use the 'newArrivals' getter from productStore
    },
    homeDiscountedProducts() {
      const productStore = useProductStore(); // Access product store
      return productStore.discountedProducts; // Use the 'discountedProducts' getter from productStore
    },
  },
});

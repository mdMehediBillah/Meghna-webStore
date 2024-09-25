import { ref } from "vue";
import { defineStore } from "pinia";

export const useCategoriesProductStore = defineStore(
  "categoriesProduct",
  () => {
    const allCategories = ref([]); // Make this reactive
    const productsByCategory = ref([]); // Correctly initialize as ref
    const isLoading = ref(false);
    const error = ref(null);

    // Fetch all categories
    const fetchCategories = async () => {
      isLoading.value = true;
      error.value = null; // Reset error state before fetching
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/categories`
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        allCategories.value = data; // Assuming the response is an array of categories
      } catch (err) {
        error.value = err.message; // Set error message if fetch fails
      } finally {
        isLoading.value = false;
      }
    };

    // Fetch products by category ID
    const fetchProductsByCategoryId = async (categoryId) => {
      isLoading.value = true;
      productsByCategory.value = []; // Reset products before fetching new ones
      error.value = null; // Reset error state before fetching
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/products?category=${categoryId}`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json(); // Assume this is an array of products
        productsByCategory.value = data; // Store products in state
      } catch (err) {
        error.value = err.message; // Set error message if fetch fails
        productsByCategory.value = []; // Reset on error
      } finally {
        isLoading.value = false;
      }
    };

    return {
      fetchCategories,
      allCategories,
      fetchProductsByCategoryId,
      productsByCategory,
      isLoading,
      error,
    };
  }
);

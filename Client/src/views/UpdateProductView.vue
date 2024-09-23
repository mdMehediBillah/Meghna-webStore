<template>
  <div class="container mx-auto mt-8 p-4 max-w-lg bg-white shadow-md rounded">
    <h2 class="text-xl font-semibold mb-4">
      {{ isEditMode ? "Edit" : "Create" }} Product
    </h2>
    <form @submit.prevent="handleSubmit">
      <!-- Product Brand Name -->
      <div class="mb-4">
        <label for="brandName" class="block text-gray-700 font-semibold mb-2">
          Brand Name
        </label>
        <input
          type="text"
          id="brandName"
          v-model="form.brandName"
          placeholder="Enter brand name"
          class="w-full p-2 border rounded"
          required
        />
      </div>

      <!-- Product Title -->
      <div class="mb-4">
        <label for="title" class="block text-gray-700 font-semibold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          placeholder="Enter product title"
          class="w-full p-2 border rounded"
          required
        />
      </div>

      <!-- Product Description -->
      <div class="mb-4">
        <label for="description" class="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Enter product description"
          class="w-full p-2 border rounded"
        ></textarea>
      </div>

      <!-- Product Category -->
      <div class="mb-4">
        <label for="category" class="block text-gray-700 font-semibold mb-2">
          Category
        </label>
        <select
          id="category"
          v-model="form.category"
          class="w-full p-2 border rounded"
          required
        >
          <option value="" disabled>Select a category</option>
          <option
            v-for="category in categories"
            :key="category._id"
            :value="category._id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Product Sizes with Prices -->
      <div class="mb-4">
        <label for="sizes" class="block text-gray-700 font-semibold mb-2"
          >Sizes with Prices</label
        >
        <div class="grid grid-cols-1 gap-2">
          <div
            v-for="(size, index) in form.sizes"
            :key="index"
            class="flex items-center gap-2"
          >
            <input
              type="number"
              v-model.number="size.value"
              placeholder="Size"
              class="p-2 border rounded w-full"
              required
            />
            <select
              v-model="size.unit"
              class="p-2 border rounded w-24"
              required
            >
              <option value="" disabled>Unit</option>
              <option v-for="unit in sizeUnits" :key="unit" :value="unit">
                {{ unit }}
              </option>
            </select>
            <input
              type="number"
              step="0.01"
              v-model.number="size.price"
              placeholder="Price (euro)"
              class="p-2 border rounded w-full"
              required
              min="0"
            />
            <i
              class="fa-solid fa-trash bg-gray-200 text-red-500 py-2 px-2 rounded cursor-pointer"
              @click="removeSize(index)"
            ></i>
          </div>
        </div>
        <button
          type="button"
          @click="addSize"
          class="bg-gray-500 text-white py-1 px-4 my-2 rounded"
        >
          Add Size
        </button>
      </div>

      <!-- Stock Input -->
      <div class="mb-4">
        <label for="stock" class="block text-gray-700 font-semibold mb-2"
          >Stock</label
        >
        <input
          type="number"
          id="stock"
          v-model.number="form.stock"
          placeholder="Enter stock quantity"
          class="w-full p-2 border rounded"
          required
        />
      </div>

      <!-- Product Image -->
      <div class="mb-4">
        <label for="image" class="block text-gray-700 font-semibold mb-2"
          >Image URL</label
        >
        <div class="flex justify-between">
          <input
            type="text"
            id="image"
            v-model="form.image"
            placeholder="Enter image URL"
            class="w-full p-2 border rounded"
          />
          <!-- Image Preview -->
          <div v-if="form.image" class="mt-2">
            <img
              :src="updateProduct.image"
              alt="Product Image"
              class="w-28 h-24 object-cover rounded"
            />
          </div>
        </div>
      </div>

      <!-- Additional Checkboxes -->
      <div class="flex flex-wrap mb-4">
        <div class="mr-6">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="form.isNewArrival" />
            <span class="ml-2">New arrival</span>
          </label>
        </div>
        <div class="mr-6">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="form.isWeeklyOffer" />
            <span class="ml-2">Weekly offer</span>
          </label>
        </div>
        <div class="mr-6">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="form.isVegan" />
            <span class="ml-2">Vegan</span>
          </label>
        </div>
        <div class="mr-6">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="form.isLactosFree" />
            <span class="ml-2">Lactose free</span>
          </label>
        </div>
        <div class="mr-6">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="form.isGlutenFree" />
            <span class="ml-2">Gluten free</span>
          </label>
        </div>
        <div class="mr-6">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="form.isBestSeller" />
            <span class="ml-2">Best seller</span>
          </label>
        </div>
      </div>

      <!-- Offer Details -->
      <h3 class="text-lg font-semibold mb-2">Offer Details</h3>

      <!-- Discount Percentage -->
      <div class="flex mb-4">
        <div class="w-full">
          <label
            for="discountPercentage"
            class="block text-gray-700 font-semibold mb-2"
            >Discount Percentage</label
          >
          <input
            type="number"
            id="discountPercentage"
            v-model.number="form.offer.discountPercentage"
            placeholder="Enter discount percentage"
            class="w-full p-2 border rounded"
            min="0"
            max="100"
          />
        </div>
        <div class="w-full ml-2">
          <label
            for="discountPrice"
            class="block text-gray-700 font-semibold mb-2"
            >Discount Price</label
          >
          <input
            type="number"
            id="discountPrice"
            :value="calculateDiscountedPrice()"
            placeholder="Discount price"
            class="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div>
        <p class="text-sm text-gray-500 mb-2">
          Note: Discount percentage must be between 0 and 100.
        </p>
      </div>

      <!-- Offer Start Date -->
      <div class="mb-4">
        <label
          for="offerStartDate"
          class="block text-gray-700 font-semibold mb-2"
          >Offer Start Date</label
        >
        <input
          type="date"
          id="offerStartDate"
          v-model="form.offer.startDate"
          class="w-full p-2 border rounded"
        />
      </div>

      <!-- Offer End Date -->
      <div class="mb-4">
        <label for="offerEndDate" class="block text-gray-700 font-semibold mb-2"
          >Offer End Date</label
        >
        <input
          type="date"
          id="offerEndDate"
          v-model="form.offer.endDate"
          class="w-full p-2 border rounded"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        :disabled="form.stock <= 0"
      >
        {{ isEditMode ? "Update" : "Create" }} Product
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// State variables
const isEditMode = ref(false); // Track whether we are in edit mode
const updateProduct = ref(null); // Hold the product data to be updated
const loading = ref(false); // Loading state
const url = import.meta.env.VITE_API_URL; // API URL

// Get the id from the route params
const route = useRoute();
const router = useRouter();
const { id } = route.params;

// Categories options
const categories = ref([]);

// Fetch the product data for updating if in edit mode
const fetchUpdateProduct = async () => {
  if (!id) return; // No need to fetch if no ID is provided (Create Mode)

  try {
    loading.value = true; // Start the loading spinner
    const response = await axios.get(`${url}/api/v1/products/${id}`);
    updateProduct.value = response.data;
    isEditMode.value = true; // Set edit mode to true
    populateFormWithProductData(); // Populate form with fetched product data
  } catch (error) {
    console.error("Error fetching the product:", error);
    alert("Failed to fetch product data. Redirecting to product list.");
    router.push("/products"); // Redirect to product list on error
  } finally {
    loading.value = false; // Stop the loading spinner
  }
};

// Fetch categories from API
const fetchCategories = async () => {
  try {
    const response = await axios.get(`${url}/api/v1/categories`);
    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Form state
const form = ref({
  brandName: "",
  title: "",
  description: "",
  category: "",
  sizes: [{ value: "", unit: "", price: 0 }],
  stock: 1,
  image: "",
  isNewArrival: false,
  isWeeklyOffer: false,
  isVegan: false,
  isLactosFree: false,
  isGlutenFree: false,
  isBestSeller: false,
  offer: {
    discountPercentage: 0,
    discountprice: 0,
    startDate: "",
    endDate: "",
  },
});

// Function to populate form with the product data when in edit mode
const populateFormWithProductData = () => {
  if (updateProduct.value) {
    form.value = {
      brandName: updateProduct.value.brandName || "",
      title: updateProduct.value.title || "",
      description: updateProduct.value.description || "",
      category: updateProduct.value.category || "",
      sizes: updateProduct.value.sizes.length
        ? updateProduct.value.sizes
        : [{ value: "", unit: "", price: 0 }],
      stock: updateProduct.value.stock || 1,
      image: updateProduct.value.image || "",
      isNewArrival: updateProduct.value.isNewArrival || false,
      isWeeklyOffer: updateProduct.value.isWeeklyOffer || false,
      isVegan: updateProduct.value.isVegan || false,
      isLactosFree: updateProduct.value.isLactosFree || false,
      isGlutenFree: updateProduct.value.isGlutenFree || false,
      isBestSeller: updateProduct.value.isBestSeller || false,
      offer: {
        discountPercentage: updateProduct.value.offer?.discountPercentage || 0,
        discountprice: updateProduct.value.offer?.discountprice || 0,
        startDate: updateProduct.value.offer?.startDate
          ? formatDateForInput(new Date(updateProduct.value.offer.startDate))
          : "", // Ensure empty string if no start date
        endDate: updateProduct.value.offer?.endDate
          ? formatDateForInput(new Date(updateProduct.value.offer.endDate))
          : "", // Ensure empty string if no end date
      },
    };
  }
};

// Function to format date for input
const formatDateForInput = (date) => {
  if (!date) return "";
  const parsedDate = new Date(date); // Ensure it's a Date object
  if (isNaN(parsedDate)) return ""; // Check for invalid date
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(parsedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Function to calculate the discounted price
const calculateDiscountedPrice = () => {
  const size = form.value.sizes[0]; // Assuming we're using the first size for calculation
  if (size && size.price > 0 && form.value.offer.discountPercentage >= 0) {
    const discountedPrice =
      size.price - (size.price * form.value.offer.discountPercentage) / 100;
    return discountedPrice.toFixed(2); // Rounds to 2 decimal places
  }
  return 0;
};

// Function to handle form submission
const handleSubmit = async () => {
  console.log("Form Data Before Submission:", form.value);

  // Set discount price if not provided
  if (form.value.offer.discountprice <= 0) {
    const lowestPrice = Math.min(...form.value.sizes.map((size) => size.price));
    form.value.offer.discountprice = lowestPrice.toFixed(2); // Ensure it's two decimal places
  }

  // Basic validation for discount percentage
  if (
    form.value.offer.discountPercentage < 0 ||
    form.value.offer.discountPercentage > 100
  ) {
    alert("Discount percentage must be between 0 and 100.");
    return;
  }

  // API URL
  try {
    const response = await axios.put(
      `${url}/api/v1/products/${id}`, // Corrected the URL
      form.value
    );
    console.log("Form submitted successfully:", response.data);
    alert("Product updated successfully!");
    router.push("/"); // Redirect after successful update

    // Reset form after submission
    resetForm();
  } catch (error) {
    console.error("Error submitting the form:", error);
    alert("Failed to update the product. Please try again."); // Notify the user
  }
};

// Function to add a new size input field
const addSize = () => {
  form.value.sizes.push({ value: "", unit: "", price: 0 });
};

// Function to remove a size input field
const removeSize = (index) => {
  form.value.sizes.splice(index, 1);
};

// Function to reset the form
const resetForm = () => {
  form.value = {
    brandName: "",
    title: "",
    description: "",
    category: "",
    sizes: [{ value: "", unit: "", price: 0 }],
    stock: 1,
    image: "",
    isNewArrival: false,
    isWeeklyOffer: false,
    isVegan: false,
    isLactosFree: false,
    isGlutenFree: false,
    isBestSeller: false,
    offer: {
      discountPercentage: 0,
      discountprice: 0,
      startDate: "",
      endDate: "",
    },
  };
};

// Fetch categories when component is mounted
onMounted(() => {
  fetchCategories();
});

// Size units options
const sizeUnits = ["ml", "l", "g", "kg"];

// Fetch product data for editing before the component is mounted
onBeforeMount(() => {
  if (id) {
    fetchUpdateProduct();
  }
});

// Watch the updateProduct and populate form accordingly
watch(updateProduct, (newVal) => {
  if (newVal) populateFormWithProductData();
});
</script>

<style scoped>
.bg-overlay {
  background: rgba(0, 0, 0, 0.6);
}
</style>

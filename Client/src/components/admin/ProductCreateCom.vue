<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content w-8/12">
      <h3 class="text-2xl font-semibold text-center mb-6 text-gray-700">
        Add Product
      </h3>
      <form @submit.prevent="addProduct">
        <div class="flex gap-4 w-full justify-between">
          <div class="w-full">
            <!-- Product Details -->
            <div class="mb-4">
              <label
                for="productName"
                class="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="brandName"
                v-model="form.brandName"
                placeholder="Enter product name"
                class="mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label
                for="title"
                class="block text-sm font-medium text-gray-700"
              >
                Product Title
              </label>
              <input
                type="text"
                id="title"
                v-model="form.title"
                placeholder="Enter product title"
                class="mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                v-model="form.description"
                placeholder="Enter product description"
                class="mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
                required
              ></textarea>
            </div>

            <!-- Product Category -->
            <div class="mb-4">
              <label
                for="category"
                class="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                v-model="form.category"
                class="w-full mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
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

            <!-- Product Image -->
            <div class="mb-4">
              <label for="image" class="block text-sm font-medium text-gray-700"
                >Image URL</label
              >
              <input
                type="text"
                id="image"
                v-model="form.image"
                placeholder="Enter image URL"
                class="mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <!-- Stock Input -->
            <div class="mb-4">
              <label
                for="stock"
                class="block text-sm font-medium text-gray-700"
              >
                Stock
              </label>
              <input
                type="number"
                id="stock"
                v-model.number="form.stock"
                placeholder="Enter stock quantity"
                class="w-full p-2 border rounded mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div class="w-full">
            <!-- Sizes with Prices -->
            <div class="mb-4">
              <label
                for="sizes"
                class="block text-sm font-medium text-gray-700"
              >
                Sizes with Prices
              </label>
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
                    class="mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
                    required
                  />
                  <select
                    v-model="size.unit"
                    class="mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
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
                    class="mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
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
                class="bg-gray-200 text-gray-700 py-1 px-4 my-2 rounded hover:bg-gray-300"
              >
                Add Size
              </button>
            </div>

            <!-- Additional Checkboxes -->
            <div class="flex flex-col mb-6 gap-1">
              <div class="flex justify-between">
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
              </div>
              <div class="flex justify-between">
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
            </div>

            <!-- Offer Details -->
            <div class="mb-4">
              <h3 class="text-md font-semibold mb-2">Offer Details</h3>
              <div class="flex mb-4">
                <div class="w-full">
                  <label
                    for="discountPercentage"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Discount Percentage
                  </label>
                  <input
                    type="number"
                    id="discountPercentage"
                    v-model.number="form.offer.discountPercentage"
                    class="w-full mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
                    min="0"
                    max="100"
                  />
                </div>

                <div class="w-full ml-2">
                  <label
                    for="discountPrice"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Discount Price
                  </label>
                  <input
                    type="number"
                    id="discountPrice"
                    :value="calculateDiscountedPrice()"
                    class="w-full mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
                    disabled
                  />
                </div>
              </div>

              <div class="flex justify-between gap-2">
                <div class="mb-4 w-full">
                  <label
                    for="offerStartDate"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="offerStartDate"
                    v-model="form.offer.startDate"
                    class="mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <div class="mb-4 w-full">
                  <label
                    for="offerEndDate"
                    class="block text-sm font-medium text-gray-700"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    id="offerEndDate"
                    v-model="form.offer.endDate"
                    class="mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-1 mt-2">
          <button
            type="button"
            @click="closeModal"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import axios from "axios";

const props = defineProps(["isVisible", "closeModal"]);

const sizeUnits = ["kg", "g", "ml", "L"]; // Corrected to uppercase "L"

// Form data
const productName = ref("");
const productTitle = ref("");
const productDescription = ref("");

// Base API URL
const url = import.meta.env.VITE_API_URL;

// Categories options
const categories = ref([]);

// Fetch categories from API
const fetchCategories = async () => {
  try {
    const response = await axios.get(`${url}/api/v1/categories`);
    categories.value = response.data.categories || response.data; // Adjust based on API response structure
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const form = ref({
  brandName: "",
  title: "",
  description: "",
  category: "",
  sizes: [{ value: "", unit: "", price: 0 }],
  stock: 1,
  isNewArrival: false,
  isWeeklyOffer: false,
  isVegan: false,
  isLactosFree: false,
  isGlutenFree: false,
  isBestSeller: false,
  offer: {
    discountPercentage: 0,
    startDate: "",
    endDate: "",
  },
});

const addSize = () => {
  form.value.sizes.push({ value: "", unit: "", price: 0 });
};

const removeSize = (index) => {
  form.value.sizes.splice(index, 1);
};

const calculateDiscountedPrice = () => {
  if (form.value.sizes.length === 0) return 0; // Handle no size case
  const originalPrice = form.value.sizes[0]?.price || 0;
  const discountPercentage = form.value.offer.discountPercentage || 0;
  return originalPrice - (originalPrice * discountPercentage) / 100;
};

const addProduct = async () => {
  console.log("Form Data Before Submission:", form.value);

  // Set discount price if not provided
  if (form.value.offer.discountprice <= 0) {
    const lowestPrice = Math.min(...form.value.sizes.map((size) => size.price));
    form.value.offer.discountprice = lowestPrice;
  }

  // Basic validation
  if (
    form.value.offer.discountPercentage < 0 ||
    form.value.offer.discountPercentage > 100
  ) {
    alert("Discount percentage must be between 0 and 100.");
    return;
  }

  try {
    const response = await axios.post(`${url}/api/v1/products`, form.value);
    console.log("Product created:", response.data);
    alert("Product created successfully!");
  } catch (error) {
    console.error("Error creating product:", error);
    alert("Failed to create product. Please try again.");
  }
  // Reset form after submission
  resetForm();
};

onMounted(() => {
  fetchCategories();

  if (props.isVisible) {
    document.body.style.overflow = "hidden"; // Disable background scroll
  }
});

watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = "hidden"; // Disable background scroll when modal is visible
    } else {
      document.body.style.overflow = ""; // Enable scroll when modal is closed
    }
  }
);

onBeforeUnmount(() => {
  document.body.style.overflow = ""; // Ensure scroll is enabled when component is unmounted
});

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
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-height: 90vh;
  overflow-y: auto;
}
</style>

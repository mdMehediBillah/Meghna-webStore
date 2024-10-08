<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content w-8/12">
      <h3 class="text-lg font-semibold text-center mb-6">Update Product</h3>
      <form @submit.prevent="updateProduct">
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
                id="productName"
                v-model="productName"
                placeholder="Enter product name"
                class="mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label
                for="productTitle"
                class="block text-sm font-medium text-gray-700"
              >
                Product Title
              </label>
              <input
                type="text"
                id="productTitle"
                v-model="productTitle"
                placeholder="Enter product title"
                class="mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>

            <div class="mb-4">
              <label
                for="productDescription"
                class="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="productDescription"
                v-model="productDescription"
                placeholder="Enter product description"
                class="mt-1 p-2 block w-full border rounded shadow-sm outline-none focus:ring focus:border-blue-500"
              ></textarea>
            </div>

            <!-- Category -->
            <div class="mb-4">
              <label
                for="category"
                class="block text-sm font-medium text-gray-700"
                >Category</label
              >
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
                class="w-full p-2 border rounded"
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
              <h3 class="text-lg font-semibold mb-2">Offer Details</h3>
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
                    Offer Start Date
                  </label>
                  <input
                    type="date"
                    id="offerStartDate"
                    v-model="form.offer.startDate"
                    class="w-full p-2 border rounded"
                  />
                </div>

                <div class="mb-4 w-full">
                  <label
                    for="offerEndDate"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Offer End Date
                  </label>
                  <input
                    type="date"
                    id="offerEndDate"
                    v-model="form.offer.endDate"
                    class="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-2 pt-4">
          <button
            type="button"
            @click="closeModal"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white px-12 py-2 rounded hover:bg-blue-600"
          >
            Update product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import axios from "axios";

const props = defineProps(["isVisible", "closeModal", "product"]);

const categories = ref([]);
const sizeUnits = ["kg", "g", "ml", "L"]; // Corrected to uppercase "L"

// Base API URL
const url = import.meta.env.VITE_API_URL;

// Form data
const productName = ref("");
const productTitle = ref("");
const productDescription = ref("");

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

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${url}/api/v1/categories`);
    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Watch the product prop for changes and populate form data
watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      productName.value = newProduct.brandName || "";
      productTitle.value = newProduct.title || "";
      productDescription.value = newProduct.description || "";
      form.value.category = newProduct.category || "";
      form.value.image = newProduct.image || "";
      form.value.stock = newProduct.stock || 0;
      form.value.offer = newProduct.offer || {
        discountPercentage: 0,
        startDate: "",
        endDate: "",
      };
      form.value.sizes = newProduct.sizes || [];
      form.value.isNewArrival = newProduct.isNewArrival || false;
      form.value.isWeeklyOffer = newProduct.isWeeklyOffer || false;
      form.value.isVegan = newProduct.isVegan || false;
      form.value.isLactosFree = newProduct.isLactosFree || false;
      form.value.isGlutenFree = newProduct.isGlutenFree || false;
      form.value.isBestSeller = newProduct.isBestSeller || false;
    }
  },
  { immediate: true }
);

watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);

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

const updateProduct = async () => {
  try {
    const updatedProduct = {
      brandName: productName.value,
      title: productTitle.value,
      description: productDescription.value,
      category: form.value.category,
      image: form.value.image,
      stock: form.value.stock,
      offer: form.value.offer,
      sizes: form.value.sizes,
      isNewArrival: form.value.isNewArrival,
      isWeeklyOffer: form.value.isWeeklyOffer,
      isVegan: form.value.isVegan,
      isLactosFree: form.value.isLactosFree,
      isGlutenFree: form.value.isGlutenFree,
      isBestSeller: form.value.isBestSeller,
    };

    await axios.put(
      `${url}/api/v1/products/${props.product._id}`,
      updatedProduct
    );

    alert("Product updated successfully");
    props.closeModal();
  } catch (err) {
    console.error("Error updating product:", err);
    alert("Failed to update product.");
  }
};

onBeforeUnmount(() => {
  document.body.style.overflow = "";
});

onMounted(() => {
  fetchCategories();
});
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

<template>
  <div
    class="relative cursor-pointer bg-gray-50 rounded-lg hover:shadow-md p-4 items-center mt-4"
    @click="router.push(`/collection/${offer.id}`)"
  >
    <!-- Conditionally show "Best Seller" label -->
    <div
      v-if="offer.bestSeller"
      class="absolute top-2 left-2 text-orange-600 text-white font-bold px-2 py-1 rounded-br-lg text-sm bg-gray-100 z-40"
    >
      Best Seller
    </div>

    <img
      :src="offer.image"
      alt="offer image"
      class="h-48 mx-auto hover:scale-105 transition-transform ease-in-out duration-300"
    />

    <div class="mt-2">
      <h5 class="font-semibold uppercase">{{ offer.name }}</h5>
      <p class="line-clamp-1">{{ offer.description }}</p>
      <div class="flex items-center justify-between mt-1">
        <div class="">
          <p v-if="offer.offerPrice">
            <span class="text-red-500 font-bold mr-2"
              >${{ offer.offerPrice }}</span
            >
            <span class="line-through text-gray-500">${{ offer.price }}</span>
            <span
              class="text-gray-50 font-semibold ml-2 bg-gray-500 rounded-bl-lg px-2 absolute top-2 right-2 py-1 text-sm z-40"
              >-{{ discountPercentage }}%</span
            >
          </p>
          <p v-else>${{ offer.price }}</p>
        </div>
        <i
          class="fa-solid fa-cart-shopping text-gray-600 text-sm py-1 px-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useRouter } from "vue-router";

// Define the 'offer' prop
const props = defineProps({
  offer: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

// Computed property to calculate the discount percentage
const discountPercentage = computed(() => {
  if (props.offer.price && props.offer.offerPrice) {
    return Math.round(
      ((props.offer.price - props.offer.offerPrice) / props.offer.price) * 100
    );
  }
  return 0;
});
</script>

<style scoped></style>

<template>
  <div
    class="container flex flex-col lg:flex-row items-center bg-gray-50 justify-between mx-auto px-8 space-y-8 lg:space-y-0 lg:space-x-8 mt-2 lg:mt-3 rounded-lg"
  >
    <!-- Text Section -->
    <div class="w-full lg:w-1/2 text-center lg:text-left">
      <p class="font-semibold text-gray-600 text-sm pb-2">
        Join 120.000+ Happy Customers
      </p>
      <h1
        class="text-3xl font-bold text-gray-800 pt-16 lg:pt-1 uppercase font-light"
      >
        <span class="py-8">YOUR AUTHENTIC </span>
        <br />
        <span>SOUTH-ASIAN GROCERY STORE</span>
      </h1>
      <p class="text-gray-600 mt-4">
        Explore a world of authentic South-Asian flavors and ingredients,
        delivered right to your door.
      </p>
      <div class="flex justify-center lg:justify-start mt-8">
        <button
          class="bg-green-600 text-gray-50 font-medium py-2 px-6 rounded-full hover:bg-rose-400 transition ease-in-out delay-75"
        >
          Shop Now
        </button>
      </div>
    </div>

    <!-- Image Section -->
    <div class="w-full lg:w-1/2 flex justify-center lg:justify-end">
      <img
        src="../../assets/photos/hero/homeHero.png"
        alt="hero-image"
        class="w-8/12 lg:w-6/12 xl:w-8/12"
      />
    </div>
  </div>
</template>

<style scoped>
/* Additional styles for responsiveness and layout adjustments */
.container {
  max-width: 1280px; /* Optional: Set a max width for large screens */
}
</style>

<template>
  <section class="bg-gray-800 text-white py-4">
    <div
      class="container mx-auto flex justify-between text-sm items-end my-4 flex-wrap gap-8"
    >
      <div class="flex flex-col justify-end gap-1">
        <p>*All prices incl. VAT</p>
        <p>© 2024, Meghna. All rights reserved.</p>
      </div>
      <div class="flex gap-2">
        <router-link to="/terms" class="hover:underline hover:text-rose-500"
          >Terms & Conditions</router-link
        >
        <router-link to="/privacy" class="hover:underline hover:text-rose-500"
          >Privacy Policy</router-link
        >
      </div>
      <div class="flex flex-col items-end gap-1">
        <div class="flex gap-4 text-rose-100 text-xl">
          <span>
            <i class="fa-brands fa-paypal hover:text-rose-500"></i>
          </span>
          <span>
            <i class="fa-brands fa-cc-visa hover:text-rose-500"></i>
          </span>
          <span>
            <i class="fa-brands fa-cc-mastercard hover:text-rose-500"></i>
          </span>
          <span>
            <i class="fa-brands fa-apple-pay hover:text-rose-500"></i>
          </span>
          <span>
            <i class="fa-brands fa-cc-amex hover:text-rose-500"></i>
          </span>
        </div>
        <p>Made with mehedi online</p>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>

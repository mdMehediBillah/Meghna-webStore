<template>
  <div>
    <h1 class="text-center text-white font-bold text-2xl mt-8">About page</h1>
    <div class="w-32 mx-auto tex-center flex justify-center">
      <button
        class="bg-rose-400 py-2 px-6 mt-8 rounded-lg cursor-pointer"
        @click="toggleModal"
      >
        Modal
      </button>
    </div>
    <h1>Modal content</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae in
      debitis rem dolore, suscipit aspernatur illo quidem mollitia deleniti et.
      Dolores temporibus, facere sequi ad harum quisquam. Doloribus, a
      molestiae.
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const modalActive = ref(null);
const toggleModal = () => (modalActive.value = !modalActive.value);
</script>

<style lang="scss" scoped></style>

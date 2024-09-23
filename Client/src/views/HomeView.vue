<template>
  <main>
    <HomeHero />
    <WeeklyOffer />
    <HomeDiscoverCom />
    <NewArrivalCom />
  </main>
</template>

<script setup>
import HomeDiscoverCom from "@/components/discoverCategories/HomeDiscoverCom.vue";
import HomeHero from "../components/HeroSection/HomeHero.vue";
import WeeklyOffer from "../components/OfferCards/WeeklyOffer.vue";
import NewArrivalCom from "@/components/NewArrivals/NewArrivalCom.vue";
</script>

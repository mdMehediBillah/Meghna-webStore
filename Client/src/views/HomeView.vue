<template>
  <main>
    <HomeHero />
    <WeeklyOffer />
    <HomeDiscoverCom />
    <NewArrivalCom />
    <AboutUsCom />
    <HomeAboutTextCom />
    <FooterComponents />
  </main>
</template>

<script setup>
import HomeDiscoverCom from "@/components/discoverCategories/HomeDiscoverCom.vue";
import HomeHero from "../components/HeroSection/HomeHero.vue";
import WeeklyOffer from "../components/OfferCards/WeeklyOffer.vue";
import NewArrivalCom from "@/components/NewArrivals/NewArrivalCom.vue";
import AboutUsCom from "@/components/aboutUs/AboutUsCom.vue";
import HomeAboutTextCom from "@/components/aboutUs/HomeAboutTextCom.vue";
import FooterComponents from "@/components/footer/FooterComponents.vue";
</script>

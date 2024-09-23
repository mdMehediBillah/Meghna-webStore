import UpdateProductView from "@/views/UpdateProductView.vue";
import { createRouter, createWebHistory } from "vue-router";

const HomeView = () => import("../views/HomeView.vue");
const AboutView = () => import("@/views/AboutView.vue");
const WeeklyOffer = () => import("../views/WeeklyOfferView.vue");
const OfferDetailView = () => import("@/views/OfferDetailView.vue");
const NotFoundView = () => import("@/views/NotFoundView.vue");
const AddProductView = () => import("@/views/AddProductView.vue");
const AddCategoryView = () => import("@/views/AddCategoryView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: "Home" },
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      meta: { title: "About Us" },
    },
    {
      path: "/offers",
      name: "offers",
      component: WeeklyOffer,
      meta: { title: "Weekly Offers" },
    },
    {
      path: "/products/:id",
      name: "productDetails",
      component: OfferDetailView,
      meta: { title: "Product Details" },
    },
    {
      path: "/product/update/:id",
      name: "productUpdate",
      component: UpdateProductView,
      meta: { title: "Product Update" },
    },
    {
      path: "/addProduct",
      name: "addProduct",
      component: AddProductView,
      meta: { requiresAuth: true, title: "Add Product" },
    },
    {
      path: "/addCategory",
      name: "addCategory",
      component: AddCategoryView,
      meta: { requiresAuth: true, title: "Add Category" },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundView,
      meta: { title: "Page Not Found" },
    },
  ],
});

// Example of setting the document title
router.afterEach((to) => {
  document.title = to.meta.title || "Default Title";
});

export default router;

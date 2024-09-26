import CategoryProductView from "@/views/CategoryProductView.vue";
import NewArrivalsView from "@/views/NewArrivalsView.vue";
import UpdateProductView from "@/views/UpdateProductView.vue";
import { createRouter, createWebHistory } from "vue-router";

// Lazy-loaded components
const HomeView = () => import("../views/HomeView.vue");
const AboutView = () => import("@/views/AboutView.vue");
const WeeklyOffer = () => import("../views/WeeklyOfferView.vue");
const OfferDetailView = () => import("@/views/OfferDetailView.vue");
const NotFoundView = () => import("@/views/NotFoundView.vue");
const AddProductView = () => import("@/views/AddProductView.vue");
const AddCategoryView = () => import("@/views/AddCategoryView.vue");

// Mock function to simulate API call for fetching category details
async function fetchCategoryById(id) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/categories/${id}`
  );
  if (!response.ok) throw new Error("Category not found");
  return response.json();
}

// Define the routes
const routes = [
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
    path: "/newArrivals",
    name: "newArrivals",
    component: NewArrivalsView,
    meta: { title: "New Arrivals" },
  },
  {
    path: "/collections/:id",
    name: "collections",
    component: CategoryProductView,
    meta: { title: "Category Products" },
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
    meta: { title: "Add Product" },
  },
  {
    path: "/addCategory",
    name: "addCategory",
    component: AddCategoryView,
    meta: { title: "Add Category" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
    meta: { title: "Page Not Found" },
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Set document title after every route change
router.afterEach((to) => {
  document.title = to.meta.title || "Default Title";
});

// Optional: Global navigation guard to check authentication for protected routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = false; // Replace with actual auth check
    if (!isAuthenticated) {
      next({ name: "home" }); // Redirect to home if not authenticated
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

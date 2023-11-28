import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import MyParcels from "./pages/MyParcels.vue";
import ParcelDetails from "./pages/ParcelDetails.vue";
import RequestForm from "./pages/RequestForm.vue";
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/request",
    component: RequestForm,
  },
  {
    path: "/parcels",
    component: MyParcels,
  },
  {
    path: "/parcels/:id",
    component: ParcelDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

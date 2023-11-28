<template>
  <ParcelsList v-if="shouldRenderList" :parcels="parcels" />
</template>

<script>
import ParcelsList from "../components/ParcelsList.vue";
import storageMiddleware from "../utils/storageMiddleware";

export default {
  beforeMount() {
    const parcels = storageMiddleware.getParcels();
    if (!parcels) return;
    this.parcels = parcels;
  },
  data() {
    return {
      parcels: null,
    };
  },
  computed: {
    shouldRenderList() {
      if (!this.parcels) return false;
      if (this.parcels.length === 0) return false;
      return true;
    },
  },
  components: { ParcelsList },
};
</script>

<style lang="scss" scoped></style>

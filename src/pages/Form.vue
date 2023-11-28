<template>
  <div>
    <form action="">
      <label>
        <span></span>
        <input v-model.trim="city" type="text" />
      </label>
    </form>
    <GeoButton @geo-error="onGeoError" @coords-came="onCoordsCame" />
    <ul v-if="cityVariants.length > 0">
      <li v-for="city in cityVariants">
        {{ city }}
      </li>
    </ul>
  </div>
</template>

<script>
import { Notify } from "notiflix";
import GeoButton from "../components/GeoButton.vue";
import getCityByCoods from "../utils/getCityByCoords";
import toCapitalize from "../utils/toCapitalize";
import getCitiesByQuery from "../utils/getCitiesByQuery";
export default {
  components: { GeoButton },
  data() {
    return {
      city: "",
      citySearchPool: [],
      cityVariants: [],
      noVariantsCount: 0,
    };
  },
  watch: {
    async city(newValue, oldValue) {
      if (newValue.length < 3) return;
      if (newValue.length < oldValue.length) return;
      if (newValue.length - oldValue.length > 1) return;
      if (this.citySearchPool.length === 0) {
        try {
          const cities = await getCitiesByQuery(newValue.toLowerCase());
          this.citySearchPool = cities;
          this.cityVariants = cities;
          return;
        } catch (error) {}
      }
      this.cityVariants = this.citySearchPool.filter((el) =>
        el.toLowerCase().includes(newValue.toLowerCase())
      );
    },
    cityVariants(newValue, oldValue) {
      if (newValue.length === 0 && oldValue.length === 0) {
        this.noVariantsCount += 1;
      }
    },
    noVariantsCount(newValue) {
      if (newValue >= 3) this.citySearchPool = [];
    },
  },
  methods: {
    onGeoError(e) {
      console.log(e);
    },
    async onCoordsCame(e) {
      try {
        const city = await getCityByCoods(e);
        if (!city) return;
        this.city = toCapitalize(city);
      } catch (error) {
        Notify.failure(error.message);
      }
    },
  },
};
</script>

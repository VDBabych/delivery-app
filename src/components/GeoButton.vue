<script>
export default {
  data() {
    return {
      errorText: null,
      coords: null,
    };
  },
  watch: {
    errorText(text) {
      this.$emit("geoError", text);
    },
    coords(coords) {
      this.$emit("coordsCame", coords);
    },
  },
  methods: {
    getCurrentPosition() {
      const successCallback = (position) => {
        this.coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      };
      const errorCallback = (error) => {
        this.errorText = error.message;
      };
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
      };
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    },
  },
};
</script>
<template>
  <button
    @click="getCurrentPosition"
    type="button"
    class="w-full border border-black rounded p-2"
  >
    Заповнити з поточної позиції
  </button>
</template>

<template>
  <form
    @submit.prevent="onFormSubmit"
    class="flex flex-col gap-2 min-w-[300px] max-w-[460px] mx-auto p-4 border-2 border-black rounded-xl"
    autocomplete="off"
  >
    <label>
      <span>Місто відправлення</span>
      <input
        name="sendSity"
        v-model="sendSity"
        class="w-full border border-black rounded p-2"
        type="text"
        required
    /></label>
    <GeoButton @geo-error="onGeoError" @coords-came="onCoordsCame" />
    <label>
      <span>Місто прибуття</span>
      <input
        name="getCity"
        v-model="getCity"
        class="w-full border border-black rounded p-2"
        type="text"
        required
      />
    </label>
    <label>
      <span>Тип посилки</span>
      <select
        name="parcelType"
        v-model="parcelType"
        required
        class="w-full border border-black rounded p-2"
      >
        <option disabled value="">Будь ласка, оберіть тип посилки</option>
        <option value="Техніка">Техніка</option>
        <option value="Одяг">Одяг</option>
        <option value="Документи">Документи</option>
        <option value="Продукти харчування">Продукти харчування</option>
        <option value="Медикаменти">Медикаменти</option>
        <option value="Інше">Інше</option>
      </select>
    </label>
    <label v-if="showEtcParcelType">
      <input
        name="etcParcelType"
        required
        v-model="etcParcelType"
        class="w-full border border-black rounded p-2"
        type="text"
      />
    </label>

    <label>
      <span>Дата відправлення</span>
      <input
        name="dispatchDate"
        required
        v-model="dispatchDate"
        :min="minDate"
        class="w-full border border-black rounded p-2"
        type="date"
      />
    </label>
    <label>
      <span>Опис</span>
      <textarea
        name="parcelDesc"
        class="w-full border border-black rounded p-2 resize-none h-[200px]"
        v-model.trim="parcelDesc"
      ></textarea>
    </label>
    <button
      class="w-full border border-black rounded p-2 xl:hover:bg-green-300"
      type="submit"
    >
      Надіслати запит
    </button>
  </form>
  <div>{{}}</div>
</template>

<script>
import storageMiddleware from "../utils/storageMiddleware";
import getTomorrowAsString from "../utils/getTomorrowAsString";
import GeoButton from "../components/GeoButton.vue";
import getCityByCoords from "../utils/getCityByCoords";
import toCapitalize from "../utils/toCapitalize";
import { Notify } from "notiflix";
export default {
  props: {
    shouldWatch: Boolean,
    initialValues: {
      getCity: String,
      sendSity: String,
      parcelType: String,
      etcParcelType: String,
      dispatchDate: String,
      parcelDesc: String,
    },
  },
  emits: ["submit"],
  created() {
    if (!this.$props.shouldWatch) return;
    this.$watch("allValues", (newValue) => {
      storageMiddleware.saveCurrrentParcel(newValue);
    });
  },
  beforeMount() {
    let formData;
    if (this.$props.initialValues) {
      formData = this.$props.initialValues;
    } else if (this.$props.shouldWatch) {
      formData = storageMiddleware.loadCurrentParcel();
    }
    if (!formData) return;
    for (const [key, value] of Object.entries(formData)) {
      this[key] = value;
    }
  },
  data() {
    return {
      getCity: "",
      sendSity: "",
      parcelType: "",
      etcParcelType: "",
      dispatchDate: "",
      parcelDesc: "",
      minDate: getTomorrowAsString(),
    };
  },
  methods: {
    onFormSubmit(e) {
      if (this.$props.shouldWatch) {
        storageMiddleware.removeCurrentParcel();
      }
      this.$emit("submit", this.allValues);
      e.target.reset();
    },
    onGeoError(e) {
      Notify.failure(e);
    },
    async onCoordsCame(e) {
      try {
        const city = await getCityByCoords(e);
        if (!city) return;
        this.sendSity = toCapitalize(city);
      } catch (error) {
        Notify.failure(error.message);
      }
    },
  },
  computed: {
    showEtcParcelType() {
      return this.parcelType === "Інше" ? true : false;
    },
    allValues() {
      return {
        getCity: this.getCity,
        sendSity: this.sendSity,
        parcelType: this.parcelType,
        etcParcelType: this.etcParcelType,
        parcelDesc: this.parcelDesc,
        dispatchDate: this.dispatchDate,
      };
    },
  },
  components: { GeoButton },
};
</script>

<style lang="scss" scoped></style>

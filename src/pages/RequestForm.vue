<template>
  <Form v-if="shouldFormRender" :shouldWatch="true" @submit="onFormSubmit" />
  <div class="max-w-[460px] text-center mx-auto" v-else>
    <div class="w-1/2 mx-auto"><SuxcessIconComponent class="w-full" /></div>
    <p>Данні успішно внесено</p>
    <router-link
      class="block mt-5 w-1/2 mx-auto text-center border-2 border-black p-2"
      to="/parcels"
      >Переглянути мої посилки</router-link
    >
    <button
      @click="this.shouldFormRender = true"
      class="block mt-5 w-1/2 mx-auto text-center border-2 border-black p-2"
    >
      Відправити ще
    </button>
  </div>
</template>

<script>
import storageMiddleware from "../utils/storageMiddleware";
import Form from "../components/Form.vue";
import SuxcessIconComponent from "../assets/suxcess-icon.svg?component";
export default {
  data() {
    return {
      shouldFormRender: true,
    };
  },
  methods: {
    onFormSubmit(e) {
      storageMiddleware.addParcel(e);
      this.shouldFormRender = false;
    },
  },
  components: { Form, SuxcessIconComponent },
};
</script>

<template>
  <div>
    <div v-if="shouldFormRender">
      <Form :initialValues="initialFormValues" @submit="onFormSubmit" />
      <div
        class="mt-[50px] border-4 border-red-700 rounded-xl min-w-[320px] max-w-[460px] mx-auto flex flex-col p-5 gap-5"
      >
        <p class="text-xl font-bold">Небезпечна зона:</p>
        <button
          class="w-1/2 mx-auto border-2 border-red-700 rounded p-2 xl:hover:bg-red-400 disabled:bg-gray-200 disabled:hover:bg-gray-200"
          type="button"
          @click="onDeleteBtnClick"
        >
          Видалити посилку
        </button>
      </div>
    </div>
    <div
      v-if="shouldErrorMessageRender"
      class="mx-auto max-w-[250px] md:max-w-[320px] xl:max-w-[380px] py-10 text-2xl md:text-3xl xl:text-4xl text-center"
    >
      <p>Шкода, але схоже, що такої посилки не існує, ну або вже не існує...</p>
      <div><ErrorIconComponent class="w-full" /></div>
    </div>
    <div
      v-if="shouldSuxcessMessageRender"
      class="mx-auto max-w-[250px] md:max-w-[320px] xl:max-w-[380px] py-10 text-2xl md:text-3xl xl:text-4xl text-center"
    >
      <p>Ура! Ми успішно внесли всі зміни</p>
      <div><SuxcessIconComponent class="w-full" /></div>
    </div>
  </div>
</template>

<script>
import Form from "../components/Form.vue";
import storageMiddleware from "../utils/storageMiddleware";
import ErrorIconComponent from "../assets/error-icon.svg?component";
import SuxcessIconComponent from "../assets/suxcess-icon.svg?component";

export default {
  beforeMount() {
    const parcel = storageMiddleware.getParcelById(this.$route.params.id);
    if (!parcel) {
      this.shouldErrorMessageRender = true;
      return;
    }
    for (const [key, value] of Object.entries(parcel)) {
      if (key === "id") {
        this.initialFormValues = {};
        continue;
      }
      this.initialFormValues[key] = value;
    }
    this.shouldFormRender = true;
  },
  data() {
    return {
      id: this.$route.params.id,
      shouldFormRender: false,
      shouldErrorMessageRender: false,
      shouldSuxcessMessageRender: false,
      initialFormValues: null,
    };
  },
  methods: {
    onFormSubmit(e) {
      storageMiddleware.updateParcelById(this.id, e);
      this.shouldFormRender = false;
      this.shouldSuxcessMessageRender = true;
    },
    onDeleteBtnClick(e) {
      e.target.disabled = true;
      let confirmed = confirm("Ви впевнені, що хочите видалити посилку?");
      if (!confirmed) {
        e.target.disabled = false;
        return;
      }
      storageMiddleware.deleteParcelById(this.id);
      this.shouldFormRender = false;
      this.shouldSuxcessMessageRender = true;
    },
  },
  components: { Form, ErrorIconComponent, SuxcessIconComponent },
};
</script>

<style lang="scss" scoped></style>

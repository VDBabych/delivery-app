<template>
  <ul class="flex flex-wrap gap-4 justify-around">
    <li
      class="min-w-[300px] py-5 border-4 border-black"
      v-for="parcel in parcels"
    >
      <p class="border-b-2 p-2 border-black">
        Місто отримання: {{ parcel.getCity }}
      </p>
      <p class="border-b-2 p-2 border-black">
        Місто відправлення: {{ parcel.sendSity }}
      </p>
      <p class="border-b-2 p-2 border-black">
        Дата відправлення: {{ parcel.dispatchDate }}
      </p>
      <p class="border-b-2 p-2 border-black">
        Категорія: {{ parcel.parcelType
        }}{{ parcel.etcParcelType ? " - " + parcel.etcParcelType : "" }}
      </p>
      <p class="border-b-2 p-2 border-black" v-if="parcel.parcelDesc">
        Опис: {{ parcel.parcelDesc }}
      </p>
      <router-link
        class="block mt-5 w-1/2 mx-auto text-center border-2 border-black p-2"
        :to="`/parcels/${parcel.id}`"
        >Редагувати</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    parcels: [Object],
  },
};
</script>

<style lang="scss" scoped></style>

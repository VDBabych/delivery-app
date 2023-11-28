<script setup>
import Container from "./components/Container.vue";
</script>

<template>
  <header class="bg-slate-100">
    <Container>
      <nav
        class="flex flex-col sm:flex-row justify-around gap-3 items-center py-5"
      >
        <router-link
          class="p-2 border w-[200px] text-center border-black"
          to="/"
          >На головну</router-link
        ><router-link
          class="p-2 border w-[200px] text-center border-black"
          to="/request"
          >Відправити посилку</router-link
        >
        <router-link
          class="p-2 border w-[200px] text-center border-black"
          to="/parcels"
          >Мої посилки</router-link
        >
      </nav>
    </Container>
  </header>
  <section class="pt-5 sm:pt-10 xl:pt-20">
    <Container>
      <router-view />
    </Container>
  </section>
</template>

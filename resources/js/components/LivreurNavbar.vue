<template>
  <div class="justify-content-center d-flex">
    <router-link
      class="link"
      @click="store.methodes.showCategoreis"
      :to="{ name: 'categoreis' }"
      >Categoreis</router-link
    >
    <span class="link"> -</span>
    <router-link
      class="link"
      @click="store.methodes.showOrders"
      :to="{ name: 'orders' }"
      >Orders</router-link
    >
  </div>
  
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const store = inject("store");

    return { store };
  },
};
</script>

<style>
.link {
  font-variant: all-small-caps;
  font-weight: 700;
  padding: 10px;
}
</style>
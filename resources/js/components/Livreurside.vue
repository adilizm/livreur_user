<template>
<LivreurNavbar/>
<orders v-if="store.state.showorders" />
 <categoreis v-if="store.state.showCategoreis"/>
 
</template>

<script>
import { inject, watchEffect} from "vue";
import { useRouter } from "vue-router";
import categoreis from './categoreis.vue'
import orders from './orders.vue'
import LivreurNavbar from './LivreurNavbar.vue'
export default {
  components:{categoreis,LivreurNavbar,orders},
  setup() {
    const store = inject("store");
    const router = useRouter();
    console.log('from setup userside show category = ',store.state.showCategoreis)
    console.log('from setup userside show orders = ',store.state.showorders)
   watchEffect( () => {
      if (store.state.livreurconected) {
        console.log("hello livreur",'store.state.livreurconected = ',store.state.livreurconected)
      }else {
          router.push({ name: "home" });
      }
    },store.state.livreurconected)
    return { store };
  },
};
</script>

<style>
</style>
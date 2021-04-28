<template>
  
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
   <a class="navbar-brand" href="#">
    <img src="/images/logo.png" width="30" height="30" alt="">Livreur-User
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse form-inline" id="navbarNav">
    <ul class="navbar-nav navnav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Login <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" @click="store.methodes.logout"> Logout <span class="sr-only">(current)</span></a>
      </li>
    
    </ul>
  </div>
  

</nav>
       
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const store = inject("store");
    return { store };
  }
};
</script>
 
<style>
.nav-link{
  cursor: pointer;
}
@media only screen and (max-width: 600px) {
  .navnav {
    margin-left: 45vw;
  }
}
@media only screen and (min-width: 601px) {
  .navnav {
    margin-left: 47vw;
  }
}
@media only screen and (min-width: 992px) {
  .navnav {
    margin-left: 75vw;
  }
}
</style>

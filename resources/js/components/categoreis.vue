<template>
  <div class="container">
    
      <table id="categories">
        
              <tr>
                  <th>name</th>
                  <th>description</th>
                  <th>image</th>
              </tr>
         
         
              <tr v-for="category in store.state.categoreis" :key="category.id">
                  <td>{{category.category_name}}</td>
                  <td>{{category.category_description}}</td>
                  <td><img :src="category.image_url" width="60" height="60" :alt="category.name"></td>
                 
              </tr>
          
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary  mt-2" data-toggle="modal" data-target="#exampleModal">
           Ajouter Catégorie
            </button>
      </table>
  </div>
<!-- Modal new category -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Noveau categorie</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <!-- <div class="form-group">
    <label for="formGroupExampleInput">Nom</label>
    <input type="text" v-model="store.state.new_category.name" class="form-control" id="formGroupExampleInput" placeholder="le nom de la categorie">
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Description</label>
    <textarea class="form-control" v-model="store.state.new_category.description" id="story" name="story" rows="5" cols="33"></textarea>
  </div>
  <div class="form-group d-flex">
      <div >
    <label for="formGroupExampleInput3">Image</label>
    <input type="file" name="image" ref="image" @change="handelChange">
    </div>
    <div><img v-if="store.state.new_category.image" id="picture" src="https://blog.quickadminpanel.com/wp-content/uploads/2019/10/povilas-korop-1.jpg" width="60" height="60" alt=""></div>
  </div> -->
  <div class="mb-5">
      <form class="mb-3" @submit="store.methodes.saveNewCategory" enctype="multipart/form-data">
        <div class="form-group">
          <label for="formGroupExampleInput">name</label>
          <input
            type="text"
            class="form-control"
            v-model="store.state.new_category.name"
            id="formGroupExampleInput"
            placeholder="name"
          />
        </div>
        <div class="form-group">
          <label for="formGroupExampleInput2">description</label>
          <input
            type="text"
            class="form-control"
            id="formGroupExampleInput2"
            v-model="store.state.new_category.description"
            placeholder="description"
          />
        </div>
        <div class="form-group">
          <label for="formGroupExampleInput3">image</label>
          <input
            type="file"
            class="form-control"
            v-on:change="store.methodes.onChange"
            id="formGroupExampleInput3"
          />
        </div>
        <div><img v-if="store.state.new_category.image" id="picture" src="https://blog.quickadminpanel.com/wp-content/uploads/2019/10/povilas-korop-1.jpg" width="60" height="60" alt=""></div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click.prevent="" data-dismiss="modal">Quitter</button>
        <button type="button" @click="store.methodes.saveNewCategory" class="btn btn-success" data-dismiss="modal">Enregistrer</button>
      </div>
 </form>
       
     
    </div>
      </div>
      
    </div>
  </div>
  
</div>

</template>

<script>
import { inject, onMounted, ref } from "vue";
export default {
  setup() {
    const image = ref(null);
    const store = inject("store");
  
  onMounted(() => {
     store.methodes.getCategoreis();
    })
    
    //this is to show image before sent to database
    const handelChange = () => {
      readURL(image);
    };

    function readURL(image) {
      if (image.value.files && image.value.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          document
            .getElementById("picture")
            .setAttribute("src", e.target.result);
        };
        reader.readAsDataURL(image.value.files[0]); // convert to base64 string
      }
    }
    return { store, image, handelChange };
  },
};
</script>

<style>
#categories {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#categories td, #categories th {
  border: 1px solid #ddd;
  padding: 8px;
}

#categories tr:nth-child(even){background-color: #f2f2f2;}

#categories tr:hover {background-color: #ddd;}

#categories th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
</style>
<template>
    <div class="container position-relative">
      <table id="categories" class="mt-5">
        <tr>
          <th>order</th>
          <th>statu</th>
          <th>description</th>
          <th>date</th>
        </tr>
        <tr v-for="order in store.state.User_orders" :key="order">
            <td>{{order.name}}</td>
             <td>{{order.statu}}</td>
            <td>{{order.description}}</td>
            <td>{{order.created_at}}</td>
        </tr>
      </table>

        <div class="position-absolute add-new-order">
            <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
                @click="hello"
            ></button>
            <span class="plus">+</span>
        </div>
        <!-- modal to add new order-->
        <!-- Modal -->
        <div
            class="modal fade mt-5"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            Ajouter un ordre
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="exampleInputorder"
                                    >ordre name</label
                                >
                                <input
                                    type="text"
                                    class="form-control"
                                    id="exampleInputorder"
                                    aria-describedby="emailHelp"
                                    v-model="store.state.order.name"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputdescription"
                                    >ordre description</label
                                >
                                <textarea
                                    type="text"
                                    class="form-control"
                                    id="exampleInputdescription"
                                    rows="4"
                                    v-model="store.state.order.description"
                                    required
                                ></textarea>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlSelect1"
                                    >selecter la category</label
                                >
                                <select
                                v-model="store.state.order.category_id"
                                    class="form-control"
                                    id="exampleFormControlSelect1"
                                    @change="hello"
                                    required
                                >
                                    <option v-for="category in store.state.categoreis" :key="category" :value="category.id">{{category.category_name}}</option>
                                   
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Quitter
                                </button>
                                <button type="button" class="btn btn-primary" @click="store.methodes.createOrder" data-dismiss="modal">
                                    Envoyer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
export default {
    setup() {
        const store = inject("store");
        const router = useRouter();
        store.methodes.getCategoreis();
        const hello = () => {
            console.log("order  = ",store.state.order);
        };
        onMounted(()=>{
          store.methodes.CurrentUserorders()
        })
        watchEffect(() => {
            if (store.state.userconected) {
                console.log(
                    "hello client",
                    "store.state.userconected = ",
                    store.state.userconected
                );
            } else {
                router.push({ name: "home" });
            }
        }, store.state.userconected);

        return { store, hello };
    },
};
</script>

<style>
.add-new-order {
    padding: 20px;
    border-radius: 100%;
    top: 77vh;
    left: 80vw;
}
.add-new-order > .btn {
    border-radius: 100%;
    padding: 20px;
}
.plus {
    top: 30px;
    left: 35px;
    color: white;
    position: absolute;
}
</style>

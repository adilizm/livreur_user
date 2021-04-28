<template>
    <div class="container">
        <div class=" justify-content-center d-flex">
            <button class="btn btn-sm btn-primary px-2 my-3 mx-2 ">NOVEAU</button>
            <button class="btn btn-sm btn-primary px-2 my-3 mx-2 ">LIVRE</button>
            <button class="btn btn-sm btn-primary px-2 my-3 mx-2 ">TOUT</button>
        </div>
        <table id="categories">
            <tr>
                <th>name</th>
                <th>description</th>
                <th>ordre par</th>
                <th>date</th>
                <th>statu</th>
            </tr>
            <tr v-for="order in store.state.all_orders" :key="order[0].id">
                <td>{{ order[0].name }}</td>
                <td>{{ order[0].description }}</td>
                <td>{{ order[1][0].name }}</td>
                <td>{{ order[0].created_at }}</td>
                <td><button @click="store.methodes.livred(order[0].id)" class="btn btn-sm btn-danger">livré</button> </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { inject, onMounted } from "vue";
export default {
    setup() {
        const store = inject("store");
        onMounted(() => {
            store.methodes.GetAllOrders();
        });

        return { store };
    },
};
</script>

<style></style>

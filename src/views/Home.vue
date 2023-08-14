<script setup>
import {useUserStore} from '../stores/user';
import { useDatabaseStore } from '../stores/database';
import { ref} from 'vue';
import { useRouter } from 'vue-router';

const useStore=useUserStore();
const databaseStore=useDatabaseStore();
const router=useRouter();


databaseStore.getUrls();

const url = ref('')

const handleSubmit=()=> {
    // validar la url
    console.log('formulario');
    databaseStore.addUrl(url.value);
}
</script>
<template>
    <div>
        <h1>Home </h1>
        <p>{{ useStore.userData?.email }}</p>
        
        <add-form></add-form>
        <!-- <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">Agregar</button>
        </form> -->
        <p v-if="databaseStore.loadingDoc">loading docs...</p>
        <ul>
            <li v-for="item of databaseStore.documents" :key="item.id">
                {{ item.id }} 
                <br>
                {{ item.name }} - {{ item.short }}
                <br>
                <button @click="databaseStore.deleteUrl(item.id)">ELIMINAR</button>
                <button @click="router.push(`/editar/${item.id}`)">EDITAR</button>
            </li>

        </ul>
    </div>
</template>
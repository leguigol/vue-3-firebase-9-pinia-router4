<template>
    <div>
        <h1>EDITAR ID: {{route.params.id}}</h1>
        <!-- <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model="url">
            <button type="submit">EDITAR</button>
        </form> -->
        <a-form
            name="editform"
            autocomplete="off"
            layout="vertical"
            :model="formState"
            @finish="onFinish"
        >
            <a-form-item
                name="url"
                label="Ingrese una url"
                :rules="[
                    {
                        required: true,
                        // whitespace: true,
                        pattern: /^http?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
                        message: 'ingrese una url valida',
                    },
                ]"
            >
                <a-input v-model:value="formState.url"></a-input>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">Editar URL</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import {useRoute} from 'vue-router';
import {useDatabaseStore} from '../stores/database';
import { message } from 'ant-design-vue';

const route=useRoute();
const databaseStore=useDatabaseStore();

// const handleSubmit= () => { 
//     console.log('editar');
//     databaseStore.updateUrl(route.params.id,url.value)
// }

const onFinish=async(value) => {
    console.log('todo correcto'+value);
    const error=await databaseStore.updateUrl(route.params.id,formState.url);
    if(!error){
        formState.url="";
        return message.success('URL EDITADA');
    }
    switch(error){
        // buscar errores de firestore
        default:
            message.error("Ocurrio un error en el servidor");
            break;
    }
}
const formState=reactive({
    url: "",
})


onMounted(async() => {
    formState.url=await databaseStore.leerUrl(route.params.id);
})
</script>


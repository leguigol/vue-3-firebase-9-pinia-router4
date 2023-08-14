<script setup>
import { reactive } from 'vue';
import { useDatabaseStore } from '../stores/database';
import { message } from 'ant-design-vue';

const formState=reactive({
    url: "",
})

const databaseStore=useDatabaseStore();

const onFinish= async(value)=>{
    console.log('todo correcto'+value);
    const error=await databaseStore.addUrl(formState.url);
    if(!error){
        return message.success('URL AGREGADA');
    }

    switch(error){
        // buscar errores de firestore
            // case 'auth/user-not-found':
            //     message.error('no existe esa cuenta');
            //     break;
            // case 'auth/wrong-password':
            //     message.error('error de contraseña');
            //     break;
            default: 
                message.error('fallo algo desde firebase');     
                break;
        }

}
</script>

<template>
    <a-form
        name="addform"
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
            <a-button type="primary" html-type="submit">Ingresar</a-button>
        </a-form-item>
    </a-form>
</template>



<script setup>

import { ref } from 'vue';
import {useUserStore} from '../stores/user';
// import {useRouter} from 'vue-router';

    const userStore=useUserStore();
    const email=ref('');
    const password=ref('');
    // const router=useRouter();

    const handleSubmit=async()=>{
        if(!email.value || password.value.length<5){
            return alert('llena los campos');
        }
        await userStore.loginUser(email.value,password.value);
        // router.push('/');
        console.log('procesando formulario...');
    }


</script>
<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="ingrese email" v-model.trim="email">
            <input type="password" placeholder="ingrese password" v-model.trim="password">
            <button type="submit" :disabled="userStore.loadingUser">Acceder</button>
        </form>
    </div>
</template>
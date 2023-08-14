<script setup>

import { reactive} from 'vue';
import {useUserStore} from '../stores/user';
import { message } from 'ant-design-vue';


const formState=reactive({
    email: '',
    password: '',
    repassword: '',
});

    const userStore=useUserStore();
    // const email=ref('');
    // const password=ref('');
    // const router=useRouter();

    // const handleSubmit=async()=>{
    //     if(!email.value || password.value.length<5){
    //         return alert('llena los campos');
    //     }
    //     await userStore.registerUser(email.value,password.value);
    //     // router.push('/');
    //     console.log('procesando formulario...');
    // }

    const validatePass=async(_rule, value) => {
        if(value===''){
            return Promise.reject('Repita contraseña');
        }
        if(value !==formState.password){
            return Promise.reject('no coinciden las contraseñas');
        }
        return Promise.resolve();
    }

    const onFinish=async(values)=>{
        console.log("success:", values);
        const error=await userStore.registerUser(formState.email,formState.password);
        if(!error){
            return message.success('Revisa tu correo y verificalo');
        }
        switch(error){
            case 'auth/user-not-found':
                message.error('no existe esa cuenta');
                break;
            case 'auth/wrong-password':
                message.error('error de contraseña');
                break;
            default: 
                message.error('fallo algo desde firebase');     
        }

    }
</script>
<template>
    <a-form
        :model="formState"
        @finish="onFinish"
    >   
        <a-form-item label="email" name="email">    
            <a-input v-model:value="formState.email" type="email" autocomplete="off" />
        </a-form-item>
        <a-form-item 
            label="Ingrese contraseña" 
            name="password"
            :rules="[
                {
                    required: true,
                    min: 6,
                    whitespace: true,
                    message: 'Ingresa una contraseña con minimo 6 caracteres',
                },
            ]"
        >    
            <a-input v-model:value="formState.password" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item 
            label="Repita contraseña" 
            name="repassword"
            :rules="[
                {
                    required: true,
                    min: 6,
                    whitespace: true,
                    validator: validatePass,

                },
            ]"
        >    
            <a-input v-model:value="formState.repassword" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item>
            <a-button
                type="primary"
                html-type="submit"
                :disabled="userStore.loadingUser"
                :loading="userStore.loadingUser"

            >Ingresar</a-button>    


        </a-form-item>    
    </a-form>
</template>
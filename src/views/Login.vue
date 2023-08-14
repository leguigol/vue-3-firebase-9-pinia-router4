<script setup>

import { reactive } from 'vue';
import {useUserStore} from '../stores/user';
// import {useRouter} from 'vue-router';
import { message } from 'ant-design-vue';

    const formState=reactive({
        email:'',
        password: ''
    }) 
    const userStore=useUserStore();
    // const email=ref('');
    // const password=ref('');
    // const router=useRouter();

    const handleSubmit=async()=>{
        // if(!email.value || password.value.length<5){
        //     return alert('llena los campos');
        // }
        await userStore.loginUser(formState.email,formState.password);
        // router.push('/');
        console.log('procesando formulario...');
    }

    const onFinish=async(values) => {
        console.log("Success: ",values);
        const error=await userStore.loginUser(formState.email,formState.password);
        if(!error){
            return message.success('Bienvenidos !!');
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
    <a-row>
        <a-col :xs="{ span: 24}" :sm="{ span: 12, offset: 6 }">
            <a-form name="basicLogin" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">
                <a-form-item
                    name="email"
                    label="Ingresa tu correo"
                    :rules="[{required: true, type: 'email', message:'Ingresa un email'}]"
                >
                    <a-input v-model:value="formState.email"></a-input>
                </a-form-item>
                <a-form-item
                    name="password"
                    label="Password"
                    :rules="[{required: true, min: 6, message: 'debe tener 6 caracteres'},
                    ]"
                >
                    <a-input-password v-model:value="formState.password"></a-input-password>
                </a-form-item>   
                <a-form-item>
                    <a-button
                        type="primary"
                        html-type="submit"
                        :disabled="userStore.loadingUser"
                        :loading="userStore.loadingUser"
                    >ACCEDER
                    </a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>
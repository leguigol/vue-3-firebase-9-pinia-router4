<script setup>
import {useUserStore} from './stores/user';

const useStore=useUserStore();
</script>
<template>
  <a-layout>
    <a-layout-header v-if="!useStore.loadingSession">
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1" v-if="useStore.userData">
          <router-link to="/" >Home</router-link>
        </a-menu-item>
        <a-menu-item key="2" v-if="!useStore.userData"> 
          <router-link to="/login" >Login</router-link>
        </a-menu-item>
        <a-menu-item key="3" v-if="!useStore.userData">
          <router-link to="/register" >Register</router-link>
        </a-menu-item>  
        <a-menu-item key="4" @click="useStore.logoutUser" v-if="useStore.userData">
          Logout
        </a-menu-item>  

      </a-menu>
      <nav>
        <ul>
        </ul>
      </nav>    
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <div v-if=" useStore.loadingSession"> 
        loading user.....
      </div>
      <router-view></router-view>    
      </div> 
    </a-layout-content>

  </a-layout>
  
  
</template>
<script setup>
import {useUserStore} from './stores/user';
import {ref, watch} from "vue";
import {useRoute} from 'vue-router';

const useStore=useUserStore();
const route=useRoute();

const selectedKeys= ref([]);

watch(
  () => route.name,
  () => {
    selectedKeys.value=[route.name];
  }  
); 

</script>
<template>
  <a-layout>
    <a-layout-header>
      <a-menu theme="dark" mode="horizontal" :style="{ lineheight: '64px'}" v-model:selectedKeys="selectedKeys"> 
        <a-menu-item v-if="useStore.userData" key="home">
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item v-if="!useStore.userData" key="login">
          <router-link to="/login">Login</router-link>
        </a-menu-item>
        <a-menu-item v-if="!useStore.userData" key="register">
          <router-link to="/register">Register</router-link>
        </a-menu-item>
        <a-menu-item @click="useStore.logoutUser" v-if="useStore.userData" key="logout">
          Logout
        </a-menu-item>
      </a-menu>
    </a-layout-header>
  </a-layout>
  <h1>App Base</h1>
  <a-button type="primary">Primary button</a-button>
  <nav v-if="!useStore.loadingSession">
    <ul>
    </ul>
  </nav>
  <div v-else>
    loading user.....
  </div>
  <router-view></router-view>
</template>
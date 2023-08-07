<script setup>
import {useUserStore} from './stores/user';

const useStore=useUserStore();
</script>
<template>
  <h1>App Base</h1>
  <a-button type="primary">Primary button</a-button>
  <nav v-if="!useStore.loadingSession">
    <ul>
      <router-link to="/" v-if="useStore.userData">Home | </router-link>
      <router-link to="/login" v-if="!useStore.userData">Login | </router-link>
      <router-link to="/register" v-if="!useStore.userData">Register</router-link>
      <button @click="useStore.logoutUser" v-if="useStore.userData">Logout</button>
    </ul>
  </nav>
  <div v-else>
    loading user.....
  </div>
  <router-view></router-view>
</template>
<script setup>
import { useLoginStore } from '../stores/login.js'

const loginStore = useLoginStore()
</script>

<template>
  <div v-if="loginStore.isLogin()">
    <img
      :src="'https://fce1-202-28-78-213.ngrok-free.app/uploads/' + loginStore.currentUser.image"
      alt="Profile image"
      style="width: 50px"
    />
    {{ loginStore.currentUser.login }} is login.
    <button @click="loginStore.logout">Logout</button>
  </div>
</template>

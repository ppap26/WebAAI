<script setup>
import { useLoginStore } from '../stores/login.js'

const loginStore = useLoginStore()
</script>

<template>
  <div v-if="loginStore.isLogin()">
    <img
      :src="'http://localhost:3000/uploads/' + loginStore.currentUser.image"
      alt="Profile image"
      style="width: 50px"
    />
    {{ loginStore.currentUser.login }} is login.
    <button @click="loginStore.logout">Logout</button>
  </div>
</template>

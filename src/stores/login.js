import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import axios from 'axios'
export const useLoginStore = defineStore('login', () => {
  const userStore = useUserStore()
  const form = ref({
    login: '',
    password: ''
  })

  const currentUser = ref(null)
  const message = ref('')
  const error = ref('')
  async function handleSubmit() {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', form.value)
      console.log('Login Sucess')
      message.value = 'Login Sucess'
      error.value = ''
      currentUser.value = res.data
    } catch (err) {
      console.log('Login Fail!!!')
      error.value = 'Login Fail!!!'
      message.value = ''
    }
  }
  function cancel() {
    form.value = {
      login: '',
      password: ''
    }
    message.value = ''
    error.value = ''
  }
  function logout() {
    currentUser.value = null
  }
  function isLogin() {
    return currentUser.value !== null
  }
  return { form, currentUser, message, error, handleSubmit, cancel, logout, isLogin }
})

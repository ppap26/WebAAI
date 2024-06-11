import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const form = ref({
    id: -1,
    login: '',
    name: '',
    password: '',
    gender: '',
    age: null
  })
  const users = ref([])
  let lastId = 3
  const showForm = ref(false)

  async function getUsers() {
    try {
      const res = await axios.get('http://localhost:3000/users')
      console.log(res)
      users.value = res.data
    } catch (error) {
      console.log(error)
    }
  }
  async function handleSubmit() {
    if (form.value.id === -1) {
      try {
        const res = await axios.post('http://localhost:3000/users', form.value)
        console.log(res)
        await getUsers()
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const res = await axios.patch('http://localhost:3000/users/' + form.value.id, form.value)
        console.log(res)
        await getUsers()
      } catch (error) {
        console.log(error)
      }
    }
    clearForm()
  }

  function clearForm() {
    form.value = {
      id: -1,
      login: '',
      name: '',
      password: '',
      gender: '',
      age: null
    }
  }

  function cancel() {
    clearForm()
    showForm.value = false
  }

  async function deleteUser(id) {
    try {
      const res = await axios.delete('http://localhost:3000/users/' + id)
      console.log(res)
      await getUsers()
    } catch (error) {
      console.log(error)
    }
  }

  function editUser(item) {
    form.value = { ...item }
    showForm.value = true
  }

  function addNew() {
    showForm.value = true
  }

  return {
    form,
    users,
    showForm,
    handleSubmit,
    clearForm,
    cancel,
    deleteUser,
    editUser,
    addNew,
    getUsers
  }
})

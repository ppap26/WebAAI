import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const form = ref({
    id: -1,
    login: '',
    name: '',
    password: '',
    gender: '',
    age: null
  })
  const users = ref([
    {
      id: 1,
      login: 'user01',
      name: 'User 1',
      password: 'password',
      gender: 'male',
      age: 18
    },
    {
      id: 2,
      login: 'user02',
      name: 'User 2',
      password: 'password',
      gender: 'female',
      age: 40
    }
  ])
  let lastId = 3
  const showForm = ref(false)

  function handleSubmit() {
    if (form.value.id === -1) {
      form.value.id = lastId
      users.value.push({ ...form.value })
      lastId++
    } else {
      const index = users.value.findIndex((item) => item.id === form.value.id)
      users.value[index] = { ...form.value }
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

  function deleteUser(id) {
    users.value = users.value.filter((item) => item.id !== id)
  }

  function editUser(item) {
    form.value = { ...item }
    showForm.value = true
  }

  function addNew() {
    showForm.value = true
  }

  return { form, users, showForm, handleSubmit, clearForm, cancel, deleteUser, editUser, addNew }
})

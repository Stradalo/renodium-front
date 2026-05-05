<template>
  <h1 class="section-name">Game Creation</h1>
  <GameForm :isSubmitting="isSubmitting" @save-game="handleGameCreation" />
</template>

<script setup>
import { ref } from 'vue'
import { createGame } from '@/api/gameApi'
import GameForm from '../components/game/GameForm.vue'
import { useRouter } from 'vue-router'

const isSubmitting = ref(false)
const submitError = ref(null)
const router = useRouter()

async function handleGameCreation(payload) {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true
  submitError.value = null

  try {
    let createdGame = await createGame(payload)
    router.push(`/catalog/${createdGame.id}`)
  } catch (e) {
    submitError.value = e
    alert(submitError.value.message)
  } finally {
    isSubmitting.value = false
  }
}
</script>

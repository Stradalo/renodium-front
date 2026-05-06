<template>
  <h1 class="section-name">Game Update</h1>
  <div v-if="submitError != null">
    <h2>Could not update game</h2>
    <p>{{ submitError.message }}</p>
  </div>
  <GameForm :isSubmitting="isSubmitting" @save-game="handleGameUpdate" />
</template>

<script setup>
import { ref } from 'vue'
import { updateGame } from '@/api/gameApi'
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
    const createdGame = await createGame(payload)
    if (createdGame.id != null) {
      router.push(`/catalog/${createdGame.id}`)
    } else {
      submitError.value = {
        message: "Game was created, but server returned invalid response.",
        status: 405,
        field: "id"
      }
    }
  } catch (e) {
    submitError.value = e
  } finally {
    isSubmitting.value = false
  }
}
</script>

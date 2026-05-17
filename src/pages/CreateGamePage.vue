<template>
  <h1 class="section-name">Game Creation</h1>
  <GameForm 
    :isSubmitting="isSubmitting" 
    :submitLabel="submitLabel" 
    @save-game="handleGameCreation" 
  />
  <div v-if="submitError != null">
    <ErrorModal :title="errorTitle" :error="submitError.message" @clear-error="submitError = null"/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createGame } from '@/api/gameApi'
import GameForm from '../components/game/GameForm.vue'
import { useRouter } from 'vue-router'
import ErrorModal from '@/components/common/ErrorModal.vue'

const errorTitle = "Could not create game";

const isSubmitting = ref(false)
const submitError = ref(null)
const router = useRouter()

const submitLabel = "Create Game"

async function handleGameCreation(payload) {
  if (isSubmitting.value) {
    submitError.value = {
      message: "Already submitting",
      status: 405,
    }
    return
  }

  isSubmitting.value = true

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

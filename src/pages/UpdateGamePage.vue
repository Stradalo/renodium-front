<template>
  <h1 class="section-name">Game Update</h1>
  <div v-if="loadError != null">
    <ErrorModal :title="loadErrorTitle" :error="loadError.message" @clear-error="loadError = null"/>
  </div>
  <div v-if="isLoading === false && loadError === null">
    <GameForm 
      :isSubmitting="isSubmitting" 
      :initialGame="game" 
      :submitLabel="submitLabel" 
      @save-game="handleGameUpdate" 
    />
  </div>
  <div v-if="submitError != null">
    <ErrorModal :title="submitErrorTitle" :error="submitError.message" @clear-error="submitError = null"/>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getGameById, updateGame } from '@/api/gameApi'
import GameForm from '../components/game/GameForm.vue'
import { useRoute, useRouter } from 'vue-router'
import ErrorModal from '@/components/common/ErrorModal.vue'

const loadErrorTitle = "Could not load game"
const submitErrorTitle = "Could not update game"

onMounted (async () => {
  isLoading.value = true
  
  try {
    if (!Number.isInteger(gameId) || gameId <= 0) {
      loadError.value = {
        message: "Route param does not contain number",
        status: 405,
        field: gameId
      }
      return
    }

    game.value = await getGameById(gameId)
  } catch (e) {
    loadError.value = {
      message: e.message,
      status: e.status,
      field: gameId
    }
  } finally {
    isLoading.value = false
  }
})

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const isSubmitting = ref(false)
const loadError = ref(null)
const submitError = ref(null)
const game = ref(null)

const gameId = Number(route.params.id)
const submitLabel = "Update Game"

async function handleGameUpdate(payload) {
  if (isSubmitting.value) {
    submitError.value = {
      message: "Already submitting",
      status: 405,
      field: game,
    }
    return
  }

  isSubmitting.value = true

  try {
    const updatedGame = await updateGame(gameId, payload)
    if (updatedGame.id != null) {
      router.push(`/catalog/${updatedGame.id}`)
    } else {
      submitError.value = {
        message: "Game was update, but server returned invalid response.",
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

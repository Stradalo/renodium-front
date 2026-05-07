<template>
  <h1 class="section-name">Game Update</h1>
  <div v-if="loadError != null">
    <h2>Could not load game</h2>
    <p>{{ loadError.message }}</p>
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
    <h2>Could not update game</h2>
    <p>{{ submitError.message }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getGameById, updateGame } from '@/api/gameApi'
import GameForm from '../components/game/GameForm.vue'
import { useRoute, useRouter } from 'vue-router'

onMounted (async () => {
  isLoading.value = true
  loadError.value = null
  
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
  submitError.value = null

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

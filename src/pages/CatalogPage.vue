<template>
  <h1 class="section-name">Game Catalog</h1>
  <GameList :games="games" @add-to-cart="addToCart" @show-game-detail="handleDetailGameRedirect" />
</template>

<script setup>
import GameList from '../components/catalog/GameList.vue'
import { addToCart } from '../stores/useCart.js'
import { getGames } from '../api/gameApi.js'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

onMounted(async () => {
  games.value = await getGames()
})

const games = ref([])
const router = useRouter()

function handleDetailGameRedirect(gameId) {
  router.push(`/catalog/${gameId}`)
}
</script>

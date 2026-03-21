<template>
  <h1 class="section-name">Game Catalog</h1>
  <GameList 
    :games="mockGames" 
    @add-to-cart="handleAddToCart" 
    @show-game-detail="handleDetailGameRedirect"
  />
  <Cart 
    :cart="cart" 
    @decrement-item="handleDecrementCartGame" 
    @increment-item="handleIncrementCartGame"
  />
</template>

<script setup>
import GameList from '../components/catalog/GameList.vue'
import Cart from '../components/cart/Cart.vue'
import { ref } from 'vue'
import { mockGames } from '../data/games.js'
import { useRouter } from 'vue-router'
import GameDetails from './GameDetails.vue'

const cart = ref([])
const router = useRouter()

function findCartItemByGameId(gameId) {
  return cart.value.find(c => c.game.id === gameId)
}

function handleAddToCart(game) {
  const item = findCartItemByGameId(game.id)
  if (item) {
    item.quantity += 1
  } else {
    cart.value.push({game, quantity: 1})
  }
}

function handleDecrementCartGame(id) {
  const item = findCartItemByGameId(id)
  if (!item) {
    return
  }
  const index = cart.value.indexOf(item)
  if (item.quantity === 1) {
    cart.value.splice(index, 1)
  }
  else {
    item.quantity -= 1
  }
}

function handleIncrementCartGame(id) {
  const item = findCartItemByGameId(id)
  if (!item) {
    return
  }
  item.quantity += 1
}

function handleDetailGameRedirect(gameId) {
  router.push(`/catalog/${gameId}`)
}
</script>

<style>
.section-name {
  text-align: center;
}
</style>

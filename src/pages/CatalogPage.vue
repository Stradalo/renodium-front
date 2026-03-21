<template>
  <h1 class="section-name">Game Catalog</h1>
  <GameList :games="games" @add-to-cart="handleAddToCart"/>
  <Cart :cart="cart" @decrement-item="handleDecrementCartGame" @increment-item="handleIncrementCartGame"/>
</template>

<script setup>
import GameList from '../components/catalog/GameList.vue'
import Cart from '../components/cart/Cart.vue'
import { ref } from 'vue'

const games = [
  {
    id: 1,
    title: 'GTA 5',
    price: 9899,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStFVNyU8sjMhLuy1Y89uDEgv6JQtY9ghwbfA&s',
    platform: 'pc',
  },
  {
    id: 2,
    title: 'Phasmaphobia',
    price: 5500,
    image:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/739630/c227a2855aba60f3657bc0c3a46515b8c41fb2b6/header.jpg?t=1773761698',
    platform: 'pc',
  },
  {
    id: 3,
    title: 'Split Fiction',
    price: 12599,
    image:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2001120/header.jpg?t=1763484567',
    platform: 'ps',
  },
]
const cart = ref([
])

function handleAddToCart(game) {
  const item = cart.value.find(c => c.game.id === game.id)
  if (item) {
    item.quantity += 1
  } else {
    cart.value.push({game: game, quantity: 1})
  }
  console.log("Cart:", cart.value)
}

function handleDecrementCartGame(id) {
  const item = cart.value.find(c => c.game.id === id)
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
  const item = cart.value.find(c => c.game.id === id)
  if (!item) {
    return
  }
  item.quantity += 1
}

</script>

<style>
.section-name {
  text-align: center;
}
</style>

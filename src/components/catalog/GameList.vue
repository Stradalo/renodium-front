<template>
  <div class="game-list">
    <GameCard v-for="game in games" :game="game" :key="game.id" />
  </div>
</template>

<script setup>
import GameCard from '../catalog/GameCard.vue'
defineProps({
  games: Array,
})
</script>

<style>
.game-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>

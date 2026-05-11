<template>
  <div class="game-list">
    <GameCard 
      v-for="game in games" 
      :game="game" :key="game.id" 
      @add-to-cart="emit('add-to-cart', $event)" 
      @show-game-detail="emit('show-game-detail', $event)"
    />
  </div>
</template>

<script setup>
import GameCard from '../catalog/GameCard.vue'
defineProps({
  games: Array,
})

const emit = defineEmits(['add-to-cart', 'show-game-detail'])
</script>
  
<style scoped>
.game-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px;
}
</style>

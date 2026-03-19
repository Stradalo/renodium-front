<template>
  <div class="game-card">
    <h3>{{ game.title }}</h3>
    <img :src="game.image" />
    <div class="game-details">
      <p>
        The platform
        <span v-if="game.platform.length > 1"> are </span>
        <span v-else> is </span>
        <span v-for="value in game.platform" :key="value">{{ value }} </span>
      </p>
      <p>{{ game.price }} <span class="tenge-span">₸</span></p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  game: Object,
})
</script>

<style>
.game-card {
  max-width: 400px;
  background-color: beige;
}

.game-details {
  display: flex;
  justify-content: space-between;
}

.game-card img {
  height: 180px;
}

.tenge-span {
  font-size: small;
}
</style>

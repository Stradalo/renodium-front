<template>
  <div class="game-card">
    <div class="game-details">
      <h3>{{ game.title }}</h3>
      <button class="game-btn" @click="handleAddToCart">Добавить в корзину</button>
    </div>
    <img :src="game.image" />
    <div class="game-details">
      <p>
        {{ game.platform }}
      </p>
      <p class="price">{{ game.price }} ₸</p>
      <button class="game-btn" @click="handleShowGameDetails">Посмотреть</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  game: Object,
})

const emit = defineEmits(["add-to-cart", "show-game-detail"])

function handleAddToCart() {
  emit("add-to-cart", props.game)
}

function handleShowGameDetails() {
  emit("show-game-detail", props.game.id)
}

</script>

<style scoped>
.game-card {
  box-shadow: 0 2px 8px rgba(0,0,0,.15);
  border: 2px solid #2A2A3A;
  padding: 10px;
  margin: auto;
  background-color: #1A1A24;
  border-radius: 20px;
  max-width: 450px;
  height: 100%;
  transition: transform 0.2s ease;
}

.game-card:hover {
  box-shadow: 0 6px 16px rgba(0,0,0,.25);
  transform: translateY(-2px);
}

.game-details {
  display: flex;
  justify-content: space-between;
}

.game-card img {
  height: 180px;
  width: 100%;
  object-fit: cover;
}
</style>

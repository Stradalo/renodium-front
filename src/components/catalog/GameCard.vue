<template>
  <div class="game-card">
    <h3>{{ game.title }}</h3>
    <img :src="game.image" />
    <div class="game-details">
      <p>
        The platform is
        {{ game.platform }}
      </p>
      <p class="price">{{ game.price }} ₸</p>
      <button class="game-btn" @click="handleAddToCart">Добавить в корзину</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  game: Object,
})

const emit = defineEmits(["add-to-cart"])

function handleAddToCart() {
  emit("add-to-cart", props.game)
}

</script>

<style scoped>
.game-card {
  box-shadow: 0 2px 8px rgba(0,0,0,.15);
  border: 2px solid #2A2A3A;
  padding: 10px;
  margin: 5px;
  background-color: #1A1A24;
  border-radius: 20px;
  max-width: 400px;
  height: 100%;
}

.game-card:hover {
  box-shadow: 0 6px 16px rgba(0,0,0,.25);
  transform: translateY(-2px);
}

.game-btn {
  background-color: #7C5CFC;
  display: inline-block;
  cursor: pointer;
  color: white;
  border-radius: 10px;
}

.game-details {
  display: flex;
  justify-content: space-between;
}

.game-card img {
  height: 180px;
}
</style>

<template>
  <div class="game-card">
    <h3>{{ game.title }}</h3>
    <img :src="game.image" />
    <div class="game-details">
      <p>
        The platform is
        {{ game.platform }}
      </p>
      <p>{{ game.price }} <span class="tenge-span">₸</span></p>
      <button @click="handleAddToCart">Добавить в корзину</button>
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

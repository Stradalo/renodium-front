<template>
  <section>
    <h2 class="section-name">Cart</h2>
    <div class="cart-section" v-if="props.cart.length === 0">
      <p>Cart is empty, add something!</p>
    </div>
    <div class="cart-section" v-else>
      <div class="cart-item" v-for="item in props.cart" :key="item.game.id">
        <p>
          {{ item.game.title }}:
          {{ item.quantity }}
        </p>
        <span>
          <button class="cart-btn" @click="handleDecrement(item)">-</button>
          <button class="cart-btn" @click="handleIncrement(item)">+</button>
        </span>
      </div>
      <div>
        In cart {{ cartCount }} items with the sum of <span class="price">{{ totalPrice }} ₸</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    cart: Array
})

const emit = defineEmits(["decrement-item", "increment-item"])

const cartCount = computed(() => {
  return props.cart.reduce((total, item) => {
    return total + item.quantity
  }, 0)
})

const totalPrice = computed(() => {
  return props.cart.reduce((total, item) => {
    return total + item.quantity * item.game.price
  }, 0)
})

function handleDecrement(cartItem) {
  return emit("decrement-item", cartItem.game.id)
}

function handleIncrement(cartItem) {
  return emit("increment-item", cartItem.game.id)
}
</script>

<style scoped>
.cart-section {
    margin-left: 5px;
}

.cart-item {
    display: flex;
    align-items: center; /* vertically aligns them */
    gap: 10px;
}

.cart-btn {
    background-color: #7C5CFC;
    display: inline-block;
    cursor: pointer;
    color: white;
    border-radius: 10px;
}
</style>
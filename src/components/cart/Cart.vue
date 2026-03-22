<template>
  <button class="floating-btn" @click="showCart=!showCart">Cart ({{ cartCount }})</button>
  <section v-if="showCart">
    <h2 class="section-name">Cart</h2>
    <div class="cart-section" v-if="cartCount === 0">
      <p>Cart is empty, add something!</p>
    </div>
    <div class="cart-section" v-else>
      <button class="cart-btn" @click="clearCart()">Clear Cart</button>
      <div class="cart-item" v-for="item in cart" :key="item.game.id">
        <p>
          {{ item.game.title }}:
          {{ item.quantity }}
        </p>
        <span>
          <button class="cart-btn" @click="decrementCartGame(item.game.id)">-</button>
          <button class="cart-btn" @click="incrementCartGame(item.game.id)">+</button>
        </span>
      </div>
      <div>
        In cart {{ cartCount }} items with the sum of <span class="price">{{ totalPrice }} ₸</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { cart, cartCount, totalPrice, incrementCartGame, decrementCartGame, clearCart } from '../../stores/useCart.js';

const showCart = ref(false);

</script>

<style scoped>
.floating-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #00D4FF;
  color: black;
  border: none;
  padding: 12px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

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
    cursor: pointer;
    color: white;
    border-radius: 10px;
}
</style>
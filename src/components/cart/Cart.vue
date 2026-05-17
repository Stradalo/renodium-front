<template>
  <button class="floating-btn" @click="toggleCart">Cart ({{ cartCount }})</button>
  <section class="overlay" v-if="showCart" @click="toggleCart">
    <div class="modal-box" @click.stop>
      <h2 class="section-name">Cart</h2>
      <div class="cart-section" v-if="cartCount === 0">
        <span>Cart is empty, add something!</span>
      </div>
      <div class="cart-section" v-else>
        <div class="cart-item" v-for="item in cart" :key="item.game.id">
          <p>
            {{ item.game.title }} × {{ item.quantity }} — <span class="price">{{ item.game.price * item.quantity }} ₸</span>
          </p>
          <span>
            <button class="cart-btn" @click="decrementCartGame(item.game.id)">-</button>
            <button class="cart-btn" @click="incrementCartGame(item.game.id)">+</button>
          </span>
        </div>
        <hr class="white">
        <div>
          In cart {{ cartCount }} items with the sum of <span class="price">{{ totalPrice }} ₸</span>
        </div>
      </div>
      <div class="actions">
        <button v-if="cartCount !== 0" class="danger game-btn" @click="clearCart">Clear Cart</button>
        <button class="game-btn" @click="toggleCart">Close</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { cart, cartCount, totalPrice, incrementCartGame, decrementCartGame, clearCart } from '../../stores/useCart.js';

const showCart = ref(false);

function toggleCart() {
  showCart.value = !showCart.value
}

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

.cart-item {
  display: flex;
  align-items: center; /* vertically aligns them */
  gap: 10px;
  justify-content: space-between;
}

.cart-btn {
  background-color: var(--accent);
  cursor: pointer;
  color: white;
  border-radius: 10px;
}

.white {
  color: white;
}
</style>
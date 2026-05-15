<template>
  <div id="wrapper">
  <header>
    <nav>
      <ul>
        <li class="navbar-item">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="navbar-item">
          <RouterLink to="/catalog">Catalog</RouterLink>
        </li>
        <li class="navbar-item">
          <span v-if="user === null">
            <RouterLink to="/login">Login</RouterLink>
          </span>
          <span v-else>
            {{ user.email }}
            <button class="game-btn" @click="logout">Logout</button>
          </span>
        </li>
        <li v-if="user?.role == 'Admin'" class="navbar-item">
          <RouterLink to="/catalog/create">Create Game</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <RouterView />
    <Cart/>
  </main>
</div>
</template>

<script setup>
import Cart from '../components/cart/Cart.vue';
import { user, logout } from '@/stores/useAuth';

</script>

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
          <RouterLink to="/login">Login</RouterLink>
        </li>
        <li class="navbar-item">
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

</script>

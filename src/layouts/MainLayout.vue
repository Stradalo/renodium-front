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


<style>
body {
  font-family: 'Inter';
  color: white;
  background-color: black;
}

h1, h2, h3, .game-title {
  font-family: 'Oxanium';
}

a {
  color: #00D4FF;
  text-decoration: none;
}

.section-name {
  text-align: center;
}

.price {
  color: #22c55e;
}

#wrapper{
  max-width: 1350px;
  margin: 20px auto;
  background-color: #0F0F13;
  border: 2px solid #2A2A3A;
}

.navbar-item {
  display: inline;
  margin-right: 10px;
  color: #00D4FF;
}

nav {
	border-bottom: 2px solid #2A2A3A;
}

.muted-text {
  color: #888888;
}
</style>

<template>
  <header>
    <nav>
      <ul class="navbar">
        <li class="navbar-item">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="navbar-item">
          <RouterLink to="/catalog">Catalog</RouterLink>
        </li>
        <li class="navbar-item">
          <RouterLink to="/login"> Login </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
.navbar {
  display: flex;
  list-style-type: none;
}

.navbar-item {
  margin-right: 10px;
}
</style>

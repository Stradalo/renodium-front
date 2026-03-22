import { ref, computed, watch } from 'vue'

let validCart = []

const rawCart = localStorage.getItem('cart')

if (rawCart) {
  try {
    const parsedCart = JSON.parse(rawCart)
    validCart = Array.isArray(parsedCart) ? parsedCart : []
  } catch {
    validCart = []
  }
}

export const cart = ref(validCart)

watch (cart, (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart))
  }, {deep: true})

function findCartItemByGameId(gameId) {
  return cart.value.find(c => c.game.id === gameId)
}

export function addToCart(game) {
  const item = findCartItemByGameId(game.id)
  if (item) {
    item.quantity += 1
  } else {
    cart.value.push({game, quantity: 1})
  }
}

export function incrementCartGame(id) {
  const item = findCartItemByGameId(id)
  if (!item) {
    return
  }
  item.quantity += 1
}

export function decrementCartGame(id) {
  const item = findCartItemByGameId(id)
  if (!item) {
    return
  }
  const index = cart.value.indexOf(item)
  if (item.quantity === 1) {
    cart.value.splice(index, 1)
  }
  else {
    item.quantity -= 1
  }
}

export function clearCart() {
  cart.value = []
}

export const cartCount = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + item.quantity
  }, 0)
})

export const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + item.quantity * item.game.price
  }, 0)
})
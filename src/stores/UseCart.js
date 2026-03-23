import { ref, computed, watch } from 'vue'
// constants
const CART_STORAGE_KEY = 'cart' 
const initialCart = loadCartFromStorage(CART_STORAGE_KEY)

// storage helpers
function saveCartToStorage(name, newCart) {
  return localStorage.setItem(name, JSON.stringify(newCart))
}

function loadCartFromStorage(name) {
  const rawCart = localStorage.getItem(name)
  if (rawCart) {
    try {
      const parsedCart = JSON.parse(rawCart)
      return Array.isArray(parsedCart) ? parsedCart : []
    } catch {
      return []
    }
  }
  return []
}

// state
export const cart = ref(initialCart)

// watch/persistence sync
watch (cart,(newCart) => {
    saveCartToStorage(CART_STORAGE_KEY, newCart)
  }, { deep: true })

// internal helpers
function findCartItemByGameId(gameId) {
  return cart.value.find(c => c.game.id === gameId)
}

// actions
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

// computed
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
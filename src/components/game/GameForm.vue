<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div v-if="errors.length">
        <b>Your form has following errors:</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
      <input
        class="game-input"
        type="text"
        maxlength="200"
        placeholder="Write title of the game"
        v-model="game.title"
      />
      <textarea
        class="game-input"
        maxlength="10000"
        placeholder="Write details of the game"
        v-model="game.details"
      >
      </textarea>
      <input
        class="game-input"
        type="number"
        step="0.01"
        placeholder="Write price of the game"
        v-model="game.price"
      />
      <input
        class="game-input"
        type="url"
        placeholder="Paste url of the image for the game"
        v-model="game.image"
      />
      <select class="game-input" v-model="game.platform">
        <option value="">Choose a platform</option>
        <option v-for="option in platformOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <button class="game-btn" type="submit" :disabled="isSubmitting">{{ submitLabel }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isSubmitting: Boolean,
  submitLabel: String,
  initialGame: Object,
})

const platformOptions = ['PC', 'PlayStation 5', 'Xbox', 'Nintendo Switch']

const game = ref({
  title: props.initialGame?.title ?? '',
  details: props.initialGame?.details ?? '',
  price: props.initialGame?.price ?? '',
  image: props.initialGame?.image ?? '',
  platform: props.initialGame?.platform ?? ''
})

const errors = ref([])

const emit = defineEmits(['save-game'])

const trim = (input) => {
  input = input ?? ''
  return input.trim()
}

const normalizePrice = (input) => {
  if (input === null || input === undefined || input === '') {
    return null
  }
  input = input.toString().trim().replace(',', '.')
  if (/^\d+(\.\d\d?)?$/.test(input)) {
    return parseFloat(input)
  }
  return null
}

function validateForm() {
  errors.value = []
  const trimmedTitle = trim(game.value.title)
  const rawPrice = game.value.price
  const trimmedPlatform = trim(game.value.platform)
  if (!trimmedTitle) {
    errors.value.push('Title is required!')
  }
  if (rawPrice === null || rawPrice === undefined || rawPrice === '') {
    errors.value.push('Price is required!')
  } else {
    const normalizedPrice = normalizePrice(rawPrice)
    if (normalizedPrice === null) {
      errors.value.push('Price must be 0 or greater, up to 2 decimal places')
    }
  }
  if (!trimmedPlatform) {
    errors.value.push('Platform is required!')
  }
  if (errors.value.length > 0) {
    return false
  }
  return true
}

function handleSubmit() {
  if (!validateForm()) {
    return
  }
  const payload = {
    title: trim(game.value.title),
    details: trim(game.value.details),
    price: normalizePrice(game.value.price),
    image: trim(game.value.image),
    platform: trim(game.value.platform),
  }
  emit('save-game', payload)
}
</script>

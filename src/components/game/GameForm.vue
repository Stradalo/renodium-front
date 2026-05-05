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
        v-model="title"
      />
      <textarea
        class="game-input"
        maxlength="10000"
        placeholder="Write details of the game"
        v-model="details"
      >
      </textarea>
      <input
        class="game-input"
        type="number"
        step="0.01"
        placeholder="Write price of the game"
        v-model="price"
      />
      <input
        class="game-input"
        type="url"
        placeholder="Paste url of the image for the game"
        v-model="image"
      />
      <select class="game-input" v-model="platform">
        <option value="">Choose a platform</option>
        <option v-for="option in platformOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <button class="game-btn" type="submit" :disabled="isSubmitting">Create game</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isSubmitting: Boolean,
})

const platformOptions = ['PC', 'PlayStation 5', 'Xbox', 'Nintendo Switch']

const title = ref('')
const details = ref('')
const price = ref('')
const image = ref('')
const platform = ref('')
const errors = ref([])

const emit = defineEmits(['save-game'])

const trim = (input) => input.trim()

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
  const trimmedTitle = trim(title.value)
  const rawPrice = price.value
  const trimmedPlatform = trim(platform.value)
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
    title: trim(title.value),
    details: trim(details.value),
    price: normalizePrice(price.value),
    image: trim(image.value),
    platform: trim(platform.value),
  }
  emit('save-game', payload)
}
</script>

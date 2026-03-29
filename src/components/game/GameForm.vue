<template>
    <div>
        <input
            class="game-input" 
            placeholder="Write title of the game"
            v-model="title"
        />
        <input 
            class="game-input"
            placeholder="Write details of the game" 
            v-model="details"
        />
        <input 
            class="game-input"
            placeholder="Write price of the game" 
            v-model="price"
        />
        <input 
            class="game-input"
            placeholder="Paste url of the image for the game"
            v-model="image"
        />
        <select 
            class="game-input"
            v-model="platform"
        >
            <option value="">Choose a platform</option>
            <option v-for="option in platformOptions" :key="option" :value="option">
                {{ option }}
            </option>
        </select>

        <button class="game-btn" @click="handleSubmit">
            Create game
        </button>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const platformOptions = ["PC", "PlayStation 5", "Xbox", 'Nintendo Switch']

const title = ref("")
const details = ref("")
const price = ref(0)
const image = ref("")
const platform = ref("")

const emit = defineEmits(["create-game"])

function handleSubmit() {
    const payload = {
        title: title.value,
        details: details.value,
        price: price.value,
        image: image.value,
        platform: platform.value
    }
    emit("create-game", payload)
}
</script>


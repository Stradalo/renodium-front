<template>
    <div class="overlay" @click="clearError">
        <div class="modal-box" @click.stop>
            <h2>
                {{ title }}
            </h2>
            <p class="modal-text">
                {{ error }}
            </p>
            <button class="danger modal-btn game-btn" @click="clearError">Ok</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    error: String
})

const emit = defineEmits(["clear-error"])

function clearError() {
    emit("clear-error")
}
</script>
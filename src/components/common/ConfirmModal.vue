<template>
    <div class="overlay" @click="handleCancel">
        <div class="modal-box" @click.stop>
            <p class="modal-text">
                {{ message }}
            </p>
            <button class="danger modal-btn game-btn" @click="handleConfirm">Confirm</button>
            <button class="modal-btn game-btn" @click="handleCancel">Cancel</button>
        </div>
    </div>
</template>

<script setup>

defineProps({
    message: String,
})

const emit = defineEmits(['confirm', 'cancel'])

function handleConfirm() {
    emit("confirm")
}

function handleCancel() {
    emit("cancel")
}

</script>

<style scoped>
.modal-box {
    text-align: center;
    z-index: 3000;
}
</style>
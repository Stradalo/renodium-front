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
.overlay {
    top: 0; left: 0; right: 0; bottom: 0;
    position: fixed;
    background-color: rgba(15, 15, 19, 0.8);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-box {
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 50px;
    background-color: var(--surface);
    color: var(--text);
    text-align: center;
    z-index: 3000;
    max-width: 1000px;
}

.modal-text {
    font-size: 20px;
    margin-bottom: 30px;
}

.modal-btn {
    padding: 8px 20px;
}
</style>
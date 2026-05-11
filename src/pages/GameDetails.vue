<template>
    <div class="game-detail-text">
        <div v-if="gameLoading">
            <h2 class="section-name">Game is loading</h2>
            <p> Game is loading, please wait </p>
        </div>
        <div v-else-if="game">
            <h2 class="section-name">About the game</h2>
            <h3 class="game-detail-title">{{ game.title }}</h3>
            <div>
                <div class="game-detail-image">
                    <img class="game-image" :src="game.image" alt="game image"/>
                    <p> {{ game.details }} </p>
                </div>

                <div class="game-detail-info">
                    <p class="muted-text">{{ game.platform }}</p>
                    <p class="price">{{ game.price }} ₸</p>
                </div>

                <div class="game-actions">
                    <button class="game-btn" @click="editGame">Edit Game</button>
                    <button class="danger game-btn" @click="showModal = true">Delete Game</button>
                </div>
            </div>
        </div>
        <div v-else>
            <h2 class="section-name">Game did not load</h2>
            <p> Game not found or there might be error </p>
        </div>
    </div>

   <div v-if="showModal">
        <ConfirmModal 
            :message="`Are you sure you want to delete ${game.title}?`"
            @confirm="handleDelete"
            @cancel="showModal = false"
        />
   </div>

   <div v-if="deleteError != null">
        <h2>Could not delete game</h2>
        <p>{{ deleteError.message }}</p>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getGameById } from '@/api/gameApi';
import { onMounted, ref } from 'vue';
import { deleteGame } from '@/api/gameApi';
import ConfirmModal from '@/components/common/ConfirmModal.vue';

onMounted (async () => {
    try {
        gameLoading.value = true
        game.value = await getGameById(routeGameId)
    } catch (error) {
        console.error("There was an error:", error)
    } finally {
        gameLoading.value = false
    }
})

const route = useRoute()
const router = useRouter()
const gameLoading = ref(true);
const showModal = ref(false);
const routeGameId = Number(route.params.id)
const game = ref(null)
const deleteError = ref(null)

function editGame() {
    router.push(`/catalog/update/${routeGameId}`)
}

async function handleDelete() {
    try {
        await deleteGame(game.value.id)
        router.push("/catalog")
    } catch (e) {
        deleteError.value = e
    } finally {
        showModal.value = false 
    }
}

</script>

<style scoped>
.game-detail-title {
    margin-bottom: 20px;
}

.game-detail-image {
    display: flex;
    gap: 10px;
}

.game-image {
    max-width: 400px;
    height: auto;
}

.game-detail-info {
    margin-top: 20px;
}

.game-actions {
    margin-top: 20px;
}

.danger {
    background-color: var(--danger);
}
</style>
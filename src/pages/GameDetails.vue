<template>
    <div class="game-detail-text">
        <div v-if="gameLoading">
            <h2 class="section-name">Game is loading</h2>
            <p> Game is loading, please wait </p>
        </div>
        <div v-else-if="game">
            <h2 class="section-name">About the game</h2>
            <h3>{{ game.title }}</h3>
            <div>
                <div class="game-detail-image">
                    <img :src="game.image" alt="game image"/>
                    <p> {{ game.details }} </p>
                </div>
                <p class="muted-text">{{ game.platform }}</p>
                <p class="price">{{ game.price }} ₸</p>
                <button class="game-btn" @click="editGame">Edit Game</button>
            </div>
        </div>
        <div v-else>
            <h2 class="section-name">Game did not load</h2>
            <p> Game not found or there might be error </p>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getGameById } from '@/api/gameApi';
import { onMounted, ref } from 'vue';

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
const routeGameId = Number(route.params.id)
const game = ref(null)

function editGame() {
    router.push(`/catalog/update/${routeGameId}`)
}

</script>

<style scoped>
.game-detail-text {
    margin-left: 5px;
}

.game-detail-image {
    display: flex;
    gap: 10px;
}
</style>
<template>
    <div class="game-detail-text">
        <div v-if="game">
            <h2 class="section-name">About the game</h2>
            <h3>{{ game.title }}</h3>
            <div>
                <div class="game-detail-image">
                    <img :src="game.image" alt="game image"/>
                    <p>{{ game.details }} </p>
                </div>
                <p class="muted-text">{{ game.platform }}</p>
                <p class="price">{{ game.price }} ₸</p>
            </div>
        </div>
        <div v-else>
            <h2 class="section-name">This game does not exist</h2>
            <p> Game not found </p>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { getGameById } from '@/api/gameApi';

const route = useRoute()
const routeGameId = Number(route.params.id)
const game = getGameById(routeGameId)

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
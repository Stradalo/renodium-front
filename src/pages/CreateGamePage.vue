<template>
    <h1 class="section-name">Game Creation</h1>
    <GameForm @create-game="handleGameCreation"/>
</template>

<script setup>
import { ref } from 'vue';
import { createGame } from '@/api/gameApi';
import GameForm from '../components/game/GameForm.vue';

const createdGame = ref({})

async function handleGameCreation(payload) {
    createdGame.value = await createGame(payload)
}
</script>
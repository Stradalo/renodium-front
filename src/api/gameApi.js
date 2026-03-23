import { mockGames } from "@/data/games";

export function getGames() {
    return mockGames;
}

export function getGameById(gameId) {
    return mockGames.find(g => g.id === gameId)
}
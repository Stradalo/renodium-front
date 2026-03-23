import { mockGames } from "@/data/games";

const serverAdress = 'https://localhost:5000' 

export async function getGames() {
    const response = await fetch(serverAdress + "/Games");
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }
    const data = await response.json()
    return data
}

export async function getGameById(gameId) {
    const response = await fetch(serverAdress + `/Games/${gameId}`)
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }
    const data = response.json()
    return data
}
const serverAdress = 'http://184.174.36.242:5000' 

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
    const data = await response.json()
    return data
}

export async function createGame(payload) {
    const response = await fetch(serverAdress + "/Games", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(payload)
    })
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }
    const data = await response.json()
    return data
}

export async function updateGame(gameId, payload) {
    const response = await fetch(serverAdress + `/Games/${gameId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(payload)
    })
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }
    const data = await response.json()
    return data
}

export async function deleteGame(gameId) {
    const response = await fetch(serverAdress + `/Games/${gameId}`, {
        method: "DELETE",
        credentials: "include",
    })
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }
}
const serverAdress = import.meta.env.VITE_API_URL

export async function loginRequest(payload) {
    const response = await fetch(serverAdress + "/Auth", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    })
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }
    const data = await response.json()
    return data
} 
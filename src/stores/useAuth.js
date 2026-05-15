import { ref, watch } from "vue"

// constantes
const AUTH_STORAGE_KEY = 'auth'
const initialUser = loadAuthFromStorage(AUTH_STORAGE_KEY)

// helpers
function saveAuthToStorage(name, user) {
    return localStorage.setItem(name, JSON.stringify(user))
}

function loadAuthFromStorage(name) {
    const rawAuth = localStorage.getItem(name)
    if (rawAuth) {
        return JSON.parse(rawAuth)
    }
    else {
        return null
    }
}

// state
export const user = ref(initialUser)

// watch
watch(user, (newUser) => {
        saveAuthToStorage(AUTH_STORAGE_KEY, newUser)
    })

// actions
export function login(newUser) {
    user.value = newUser
}

export function logout() {
    user.value = null
}
<template>
    <div>
        <form @submit.prevent="handleLogin">
            <input 
                class="game-input"
                type="email"
                placeholder="Write your email"
                v-model="user.email"
            />
            <input 
                class="game-input"
                type="password"
                placeholder="Write your password"
                v-model="user.password"
            />
            <br>
            <button class="game-btn" type="submit" :disabled="isSubmitting">Log in</button>
        </form>
        <div v-if="submitError != null">
            <h2>Could not Log in</h2>
            <p>{{ submitError.message }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { login } from '@/stores/useAuth';
import { loginRequest } from '@/api/loginApi';
import { useRouter } from 'vue-router'

const isSubmitting = ref(false)
const submitError = ref(null)
const user = ref({
    email: '',
    password: ''
})
const router = useRouter()

const trim = (input) => {
  input = input ?? ''
  return input.trim()
}

async function handleLogin() {
    const payload = {
        email: trim(user.value.email),
        password: trim(user.value.password)
    }

    try {
        isSubmitting.value = true
        const response = await loginRequest(payload)

        if (response == null) {
            submitError.value = {
                message: "Login was sucessful, but server returned invalid response.",
                status: 405,
                field: "id"
            }
            return
        }

        login(response)
        router.push(`/catalog`)
    } catch(e) {
        submitError.value = e
    }
    finally {
        isSubmitting.value = false
    }
}
</script>
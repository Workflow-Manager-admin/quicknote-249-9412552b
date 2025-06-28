<template>
  <div class="min-h-screen bg-white flex flex-col items-center">
    <header class="w-full py-6 px-4 flex flex-col md:flex-row md:justify-between items-center border-b border-gray-100 shadow-sm mb-6" :style="{ background: 'var(--primary)' }">
      <h1 class="text-2xl font-bold text-white mb-2 md:mb-0">QuickNote</h1>
      <NuxtLink
        to="/notes"
        class="font-medium rounded px-4 py-2 transition-all"
        :style="{ background: 'var(--accent)', color: 'white' }"
      >View Notes</NuxtLink>
    </header>
    <main class="w-full max-w-xl px-4 flex-1 flex flex-col justify-center">
      <section class="bg-white rounded shadow px-8 py-6 mb-8 border border-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-gray-800" :style="{ color: 'var(--primary)' }">Create a Note</h2>
        <form @submit.prevent="createNote">
          <div class="mb-3">
            <label class="block mb-1 text-gray-600">Title</label>
            <input
              v-model="title"
              required
              class="w-full border px-3 py-2 rounded outline-none"
              :style="{ borderColor: 'var(--primary)' }"
              maxlength="80"
              placeholder="Note Title"
            />
          </div>
          <div class="mb-3">
            <label class="block mb-1 text-gray-600">Description</label>
            <textarea
              v-model="description"
              required
              class="w-full border px-3 py-2 rounded outline-none"
              :style="{ borderColor: 'var(--primary)' }"
              maxlength="512"
              placeholder="Describe your note"
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block mb-1 text-gray-600">Your Name <span class="text-gray-400 italic">(optional)</span></label>
            <input
              v-model="name"
              class="w-full border px-3 py-2 rounded outline-none"
              :style="{ borderColor: 'var(--secondary)' }"
              maxlength="32"
              placeholder="e.g., Alex"
            />
          </div>
          <div>
            <button
              type="submit"
              class="px-6 py-2 rounded font-semibold shadow-sm"
              :style="{ background: 'var(--primary)', color: 'white' }"
              :disabled="loading"
            >
              {{ loading ? 'Saving...' : 'Add Note' }}
            </button>
          </div>
        </form>
        <p v-if="success" class="mt-3 text-green-700" :style="{ color: 'var(--accent)' }">Note created! <NuxtLink class="underline" to="/notes">View notes</NuxtLink></p>
        <p v-if="error" class="mt-3 text-red-700">Failed to create note, try again.</p>
      </section>
      <section class="mx-auto text-center text-gray-400 mb-6">
        <div>Minimal, fast, one-click notes – Built with Nuxt & FastAPI</div>
      </section>
    </main>
    <footer class="text-center w-full py-3 mt-8" :style="{ background: 'var(--secondary)', color: 'whitesmoke' }">
      &copy; {{ new Date().getFullYear() }} QuickNote
    </footer>
  </div>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * Home page with form to create a note (title, description, name optional)
 * Submits to backend POST /notes
 */
import { ref } from 'vue'
import { useNotesApi } from '../composables/useNotesApi'

const title = ref('')
const description = ref('')
const name = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref(false)

const { createNote: apiCreateNote } = useNotesApi()

// PUBLIC_INTERFACE
async function createNote() {
  loading.value = true
  error.value = false
  success.value = false
  try {
    await apiCreateNote({
      title: title.value.trim(),
      description: description.value.trim(),
      name: name.value.trim() || undefined
    })
    // Clear fields and show success
    title.value = ''
    description.value = ''
    name.value = ''
    success.value = true
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
:root {
  --primary: #3b82f6;
  --secondary: #f59e42;
  --accent: #10b981;
}
input, textarea {
  transition: border-color 0.2s;
}
input:focus, textarea:focus {
  border-color: var(--accent);
}
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

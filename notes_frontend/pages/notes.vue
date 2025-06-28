<template>
  <div class="min-h-screen bg-white flex flex-col items-center">
    <header class="w-full py-6 px-4 flex flex-col md:flex-row md:justify-between items-center border-b border-gray-100 shadow-sm mb-6" :style="{ background: 'var(--primary)' }">
      <NuxtLink to="/" class="font-medium rounded px-4 py-2 mb-2 md:mb-0" :style="{ background: 'var(--secondary)', color: 'white' }">+ Create Note</NuxtLink>
      <h1 class="text-2xl font-bold text-white">All Notes</h1>
      <span />
    </header>
    <main class="w-full max-w-5xl px-4 flex-1">
      <section v-if="loading" class="text-center py-8 text-gray-500">Loading notes...</section>
      <section v-else>
        <div v-if="error" class="text-red-700">Failed to load notes.</div>
        <div v-else>
          <div v-if="notes.length === 0" class="text-gray-400 text-center py-12 text-xl">No notes yet.<br>Create the first one!</div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            <NoteCard
              v-for="note in notes"
              :key="note.id"
              :note="note"
              @delete="deleteNote"
            />
          </div>
        </div>
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
 * Notes page - fetches all notes, displays as grid of cards, allows deletion.
 */
import { ref, onMounted } from 'vue'
import { useNotesApi } from '../composables/useNotesApi'
import NoteCard from '~/components/NoteCard.vue'

const { fetchNotes, deleteNote: apiDeleteNote } = useNotesApi()
const notes = ref<any[]>([])
const loading = ref(true)
const error = ref(false)

// PUBLIC_INTERFACE
async function loadNotes() {
  try {
    loading.value = true
    notes.value = await fetchNotes()
    error.value = false
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(loadNotes)

// PUBLIC_INTERFACE
async function deleteNote(id: string) {
  await apiDeleteNote(id)
  notes.value = notes.value.filter(n => n.id !== id)
}
</script>

<style scoped>
:root {
  --primary: #3b82f6;
  --secondary: #f59e42;
  --accent: #10b981;
}
</style>

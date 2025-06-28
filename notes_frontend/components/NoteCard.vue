<template>
  <div class="rounded-lg shadow border bg-white flex flex-col justify-between min-h-[180px] border-gray-100 hover:border-primary transition">
    <div class="px-5 py-4 grow">
      <h3 class="font-semibold text-lg mb-1 truncate" :title="note.title" :style="{ color: 'var(--primary)' }">
        {{ note.title }}
      </h3>
      <div class="mb-2 text-gray-700 break-words" style="white-space: pre-wrap">{{ note.description }}</div>
      <div class="flex items-center gap-2 mt-3 text-xs text-gray-400">
        <span v-if="note.name" :style="{ color: 'var(--accent)' }">{{ note.name }}</span>
        <span v-if="note.name">&bull;</span>
        <span>{{ formatDate(note.date) }}</span>
      </div>
    </div>
    <div class="flex justify-end gap-1 pb-3 pr-3">
      <button
        class="px-3 py-1 rounded font-medium text-xs"
        :style="{ background: 'var(--accent)', color: 'white' }"
        @click="$emit('delete', note.id)"
        aria-label="Delete Note"
      >Delete</button>
      <!-- Edit button future support -->
    </div>
  </div>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * NoteCard - displays a note and provides delete (and possibly edit) action.
 */
const props = defineProps<{
  note: {
    id: string
    title: string
    description: string
    name?: string
    date: string
  }
}>()

// PUBLIC_INTERFACE
function formatDate(dt: string) {
  try {
    return new Date(dt).toLocaleString()
  } catch {
    return dt
  }
}
</script>

<style scoped>
:root {
  --primary: #3b82f6;
  --accent: #10b981;
}
.border-primary {
  border-color: var(--primary) !important;
}
</style>

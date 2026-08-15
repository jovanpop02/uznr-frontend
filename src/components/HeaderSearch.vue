<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['submit'])
const { t } = useI18n()
const query = ref('')
</script>

<template>
  <form class="site-header__search" role="search" @submit.prevent="emit('submit', query.trim())">
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.2" y2="16.2" stroke-linecap="round"/></svg>
    <input
      v-model="query"
      type="search"
      :placeholder="t('header.searchPlaceholder')"
      :aria-label="t('header.searchPlaceholder')"
    />
  </form>
</template>

<style scoped>
.site-header__search {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  width: 168px;
  padding: 7px 12px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-alt);
  color: var(--color-text-muted);
  transition: border-color 0.15s ease, width 0.2s ease;
}

.site-header__search:focus-within {
  border-color: var(--color-primary);
  width: 200px;
}

.site-header__search input {
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.82rem;
  color: var(--color-ink);
  width: 100%;
  min-width: 0;
}

.site-header__search input::-webkit-search-cancel-button {
  cursor: pointer;
}

/* Tablet: the bar is tighter, so don't grow on focus. */
@media (max-width: 1300px) {
  .site-header__search {
    width: 150px;
  }

  .site-header__search:focus-within {
    width: 150px;
  }
}

/* Phone: rendered inside the collapsed menu, so it spans the panel. */
@media (max-width: 600px) {
  .site-header__search,
  .site-header__search:focus-within {
    width: 100%;
  }
}
</style>

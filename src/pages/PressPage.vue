<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/uznr.me', icon: 'facebook' },
  { label: 'Instagram', href: 'https://www.instagram.com/uznr.me/', icon: 'instagram' },
  { label: 'YouTube', href: 'https://www.youtube.com/@udruzenjezastitenaraducrne2151', icon: 'youtube' },
]
</script>

<template>
  <section class="section press">
    <div class="container">
      <p class="section-label">{{ t('press.label') }}</p>
      <h1>{{ t('press.title') }}</h1>
      <p class="press__lead">
        {{ t('press.leadBefore') }} <a class="press__email" href="mailto:info@uznr.me">info@uznr.me</a>{{ t('press.leadAfter') }}
      </p>

      <div class="press__social">
        <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener" class="press__social-link">
          <svg v-if="s.icon === 'facebook'" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H8v4h2v7h4v-7h3l1-4h-4v-2c0-.6.4-1 1-1z"/></svg>
          <svg v-else-if="s.icon === 'instagram'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>
          <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><rect x="2" y="6" width="20" height="12" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 9.5l6 2.5-6 2.5z"/></svg>
          {{ s.label }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.press__lead {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  max-width: 640px;
  margin-top: var(--space-3);
}

.press__email {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
}

.press__email:hover {
  text-decoration: underline;
}

.press__social {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

.press__social-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  color: var(--color-ink);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.press__social-link:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}
</style>

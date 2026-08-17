<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { publications as bundledPublications } from '../data/publikacije'
import { toDocument, usePageSections, withFallback } from '../cms'
import { isIOS } from '../platform'

const { t, locale } = useI18n()
const previewDoc = ref(null)

// Editable under Stranice → Publikacije in the admin; the bundled list is the
// fallback while the backend wakes up or if it is unreachable.
const sections = usePageSections('publikacije')
const publications = withFallback(sections, bundledPublications, (cmsSections) =>
  cmsSections.flatMap((section) => section.items.map((item) => toDocument(item, locale.value)))
)

function formatSize(sizeKb) {
  if (sizeKb >= 1024) return `${(sizeKb / 1024).toFixed(1)} MB`
  return `${sizeKb} KB`
}

function openPreview(pub) {
  if (isIOS()) {
    window.open(pub.file, '_blank', 'noopener')
    return
  }
  previewDoc.value = pub
}

function closePreview() {
  previewDoc.value = null
}
</script>

<template>
  <div>
  <section class="section publikacije-hero">
    <div class="container">
      <h1>{{ t('publications.title') }}</h1>
      <p class="publikacije-hero__lead">
        {{ t('publications.lead') }}
      </p>
    </div>
  </section>

  <section class="section section--alt publikacije-list">
    <div class="container">
      <div class="publikacije-grid">
        <div v-for="pub in publications" :key="pub.title" class="publication-card">
          <span class="publication-card__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M6 3h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
              <path d="M15 3v3a1 1 0 0 0 1 1h3" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="8" y1="16" x2="16" y2="16" />
              <line x1="8" y1="8" x2="11" y2="8" />
            </svg>
          </span>
          <div class="publication-card__body">
            <h3>{{ pub.title }}</h3>
            <p class="publication-card__meta">
              <span v-if="pub.dateLabel">{{ pub.dateLabel }} · </span>{{ formatSize(pub.sizeKb) }}
            </p>
          </div>
          <div class="publication-card__actions">
            <button type="button" class="btn btn--ghost" @click="openPreview(pub)">{{ t('publications.preview') }}</button>
            <a class="btn btn--primary" :href="pub.file" target="_blank" rel="noopener" download>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M12 3v12m0 0-4-4m4 4 4-4M4 20h16" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ t('publications.download') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div v-if="previewDoc" class="preview-overlay" @click.self="closePreview">
    <div class="preview-modal">
      <div class="preview-modal__header">
        <div class="preview-modal__title-col">
          <h3>{{ previewDoc.title }}</h3>
          <p v-if="previewDoc.dateLabel">{{ previewDoc.dateLabel }}</p>
        </div>
        <div class="preview-modal__actions">
          <a class="btn btn--primary" :href="previewDoc.file" target="_blank" rel="noopener" download>{{ t('publications.download') }}</a>
          <button type="button" class="icon-btn preview-modal__close" :title="t('publications.close')" @click="closePreview">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
      <embed :src="previewDoc.file" type="application/pdf" class="preview-modal__frame" />
    </div>
  </div>
  </div>
</template>

<style scoped>
.publikacije-hero {
  padding-bottom: var(--space-4);
}

.publikacije-hero__lead {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  max-width: 640px;
  margin-top: var(--space-3);
}

.publikacije-grid {
  display: grid;
  gap: var(--space-4);
}

.publication-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.15s ease, transform 0.15s ease;
}

.publication-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.publication-card__icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.publication-card__icon svg {
  width: 28px;
  height: 28px;
}

.publication-card__body {
  flex: 1;
  min-width: 0;
}

.publication-card__body h3 {
  margin: 0;
}

.publication-card__meta {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin-top: 4px;
}

.publication-card__actions {
  flex-shrink: 0;
  display: flex;
  gap: 10px;
}

.btn--ghost {
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-ink);
}

.btn--ghost:hover {
  background: var(--color-bg-alt);
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--color-bg-alt);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
}

.icon-btn:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(23, 33, 28, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  z-index: 100;
}

.preview-modal {
  width: 100%;
  max-width: 900px;
  height: 85vh;
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-md);
}

.preview-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.preview-modal__title-col h3 {
  font-size: 1rem;
  margin-bottom: 2px;
}

.preview-modal__title-col p {
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.preview-modal__actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.preview-modal__frame {
  flex: 1;
  width: 100%;
  border: none;
}

@media (max-width: 560px) {
  .publication-card {
    flex-direction: column;
    text-align: center;
  }

  .publication-card__actions {
    width: 100%;
  }

  .publication-card__actions .btn {
    flex: 1;
    justify-content: center;
  }

  .preview-modal {
    height: 92vh;
  }

  .preview-modal__header {
    flex-direction: column;
    align-items: stretch;
  }

  .preview-modal__actions {
    justify-content: space-between;
  }
}
</style>

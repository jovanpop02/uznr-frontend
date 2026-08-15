<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// YouTube doesn't expose a "latest upload" without an API key, but every
// channel's auto-generated uploads playlist ID is just its channel ID with
// the UC prefix swapped for UU — embedding that playlist always opens on
// the most recent video and updates itself as new ones are published.
const CHANNEL_ID = 'UCjKqqFrMgdWADRmY35A7URw'
const UPLOADS_PLAYLIST_ID = `UU${CHANNEL_ID.slice(2)}`
const CHANNEL_URL = 'https://www.youtube.com/@udruzenjezastitenaraducrne2151'
</script>

<template>
  <section class="section youtube-section">
    <div class="container">
      <p v-reveal class="section-label">{{ t('youtube.label') }}</p>
      <h2 v-reveal="1" class="section-title">{{ t('youtube.title') }}</h2>

      <div v-reveal="2" class="youtube-section__frame">
        <iframe
          :src="`https://www.youtube-nocookie.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}`"
          :title="t('youtube.iframeTitle')"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <a class="youtube-section__link" :href="CHANNEL_URL" target="_blank" rel="noopener">
        {{ t('youtube.visitChannel') }}
      </a>
    </div>
  </section>
</template>

<style scoped>
.youtube-section__frame {
  position: relative;
  width: 100%;
  max-width: 860px;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  background: var(--color-ink);
}

.youtube-section__frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.youtube-section__link {
  display: inline-block;
  margin-top: var(--space-4);
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
}

.youtube-section__link:hover {
  text-decoration: underline;
}
</style>

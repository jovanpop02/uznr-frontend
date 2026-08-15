<script setup>
import { useI18n } from 'vue-i18n'
import SafetyIllustration from '../components/SafetyIllustration.vue'

const { t } = useI18n()
</script>

<template>
  <section class="section pitanja">
    <div class="container pitanja__inner">
      <p class="section-label">{{ t('qa.label') }}</p>
      <h1>{{ t('qa.title') }}</h1>
      <p class="pitanja__lead">
        {{ t('qa.lead') }}
      </p>

      <SafetyIllustration variant="mission" class="pitanja__illustration" />

      <a class="btn btn--primary" href="mailto:info@uznr.me">{{ t('qa.askBtn') }}</a>
    </div>
  </section>
</template>

<style scoped>
.pitanja__inner {
  max-width: 640px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pitanja__lead {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  margin-top: var(--space-3);
}

.pitanja__illustration {
  max-width: 280px;
  margin: var(--space-6) 0 var(--space-5);
}
</style>

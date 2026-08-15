<script setup>
import { useI18n } from 'vue-i18n'
import heroBanner from '../assets/hero-banner.jpg'

const { t } = useI18n()
</script>

<template>
  <section class="hero">
    <div class="hero__media">
      <img class="hero__image" :src="heroBanner" alt="" />
      <div class="hero__overlay"></div>
    </div>
    <div class="container hero__inner">
      <h1 class="hero__title">{{ t('hero.title') }}</h1>
      <p class="hero__lead">
        {{ t('hero.lead') }}
      </p>
      <router-link class="btn btn--primary" to="/o-nama">{{ t('hero.cta') }}</router-link>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  min-height: 520px;
  padding-block: var(--space-8) calc(var(--space-8) + var(--space-3));
}

.hero__media {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 70% 35%;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, rgba(15, 46, 26, 0.85) 0%, rgba(47, 143, 69, 0.6) 45%, rgba(66, 183, 88, 0.18) 100%);
}

@media (min-width: 1200px) {
  .hero {
    min-height: 640px;
  }
}

.hero__inner {
  position: relative;
  max-width: 760px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
}

.hero__title {
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: clamp(1.9rem, 1.4rem + 2.2vw, 3.1rem);
}

.hero__lead {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.15rem;
  max-width: 560px;
  margin-bottom: var(--space-2);
}

@media (max-width: 900px) {
  .hero {
    min-height: 460px;
    padding-block: var(--space-6) var(--space-5);
  }
}

@media (max-width: 600px) {
  .hero {
    /* The banner is 3:2; at phone widths a 400px-tall band cropped the
       subject's head off. A taller band plus a focal point nearer the
       worker keeps the scene readable instead of showing a slice of it. */
    min-height: 440px;
  }

  .hero__image {
    object-position: 62% 30%;
  }

  .hero__title {
    letter-spacing: 0.3px;
  }

  .hero__lead {
    font-size: 1rem;
  }
}

@media (max-width: 380px) {
  .hero {
    min-height: 410px;
  }
}
</style>

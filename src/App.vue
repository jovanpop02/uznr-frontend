<script setup>
import { useI18n } from 'vue-i18n'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import PageLoader from './components/PageLoader.vue'
import DevicePreviewSwitch from './components/DevicePreviewSwitch.vue'

const { locale } = useI18n()
</script>

<template>
  <PageLoader />
  <AppHeader />
  <main>
    <router-view v-slot="{ Component, route }">
      <transition name="page-fade" mode="out-in">
        <!-- Keying on locale as well as path makes a language switch
             cross-fade the page content instead of snapping it. -->
        <component :is="Component" :key="`${route.path}-${locale}`" />
      </transition>
    </router-view>
  </main>
  <AppFooter />
  <DevicePreviewSwitch />
</template>

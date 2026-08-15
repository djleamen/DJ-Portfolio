<template>
  <div class="project-container">
    <nav class="project-toolbar" aria-label="Case study navigation">
      <button @click="goBack" class="back-btn">
        <span class="back-icon" aria-hidden="true">←</span>
        <span class="back-text">Project index</span>
      </button>
      <span class="project-number">Case study / {{ displayId }}</span>
    </nav>
    <div class="content-container">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, nextTick, onMounted } from 'vue';

const props = defineProps<{ projectId?: string }>();
const router = useRouter();
const displayId = computed(() => (props.projectId ?? '0').padStart(2, '0'));

const goBack = () => {
  router.push({ path: '/projects' });
};

onMounted(() => {
  nextTick(() => window.scrollTo(0, 0));
});
</script>


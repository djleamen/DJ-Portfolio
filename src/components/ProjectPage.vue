<template>
  <div class="project-container">
    <button @click="goBack" class="back-btn">
      <span class="back-icon">⬅</span>
      <span class="back-text">Back</span>
    </button>
    <div class="content-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { nextTick } from 'vue';

export default {
  name: 'ProjectPage',
  props: {
    projectId: {
      type: String,
      default: null
    }
  },
  setup() {
    const router = useRouter();
    const goBack = () => {
      router.push({ path: '/projects' });
    };
    return { goBack };
  },
  mounted() {
    nextTick(() => {
      window.scrollTo(0, 0);
    });
  }
};
</script>


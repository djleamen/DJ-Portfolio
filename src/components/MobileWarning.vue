<template>
  <div v-if="isMobile" class="overlay">
    <div class="overlay-content">
      <h2>Desktop Only</h2>
      <p>This site is only available on desktop. Please visit us on a desktop device.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false
    };
  },
  mounted() {
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkIfMobile);
  },
  methods: {
    checkIfMobile() {
      this.isMobile = window.innerWidth <= 768;
    }
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.overlay-content {
  text-align: center;
  color: white;
  padding: 20px;
  background: #1a1a2e;
  border-radius: 10px;
}
</style>
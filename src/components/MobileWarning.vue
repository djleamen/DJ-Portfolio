<template>
    <transition name="fade">
        <div v-if="isMobile" class="overlay">
          <div class="overlay-content">
            <h2>Optimal on Desktop</h2>
            <p>This site is designed for desktop viewing. For the best experience, please visit on a larger screen.</p>
            <button @click="dismissWarning" class="dismiss-btn">Continue Anyway</button>
          </div>
        </div>
    </transition>
</template>
  
<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    const isMobile = ref(false);
    const warningDismissed = ref(false);
    
    const checkIfMobile = () => {
      isMobile.value = window.innerWidth <= 768 && !warningDismissed.value;
    };
    
    const dismissWarning = () => {
      warningDismissed.value = true;
      isMobile.value = false;
      localStorage.setItem('mobileWarningDismissed', 'true');
    };
    
    onMounted(() => {
      warningDismissed.value = localStorage.getItem('mobileWarningDismissed') === 'true';
      checkIfMobile();
      window.addEventListener('resize', checkIfMobile);
    });
    
    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkIfMobile);
    });
    
    return {
      isMobile,
      dismissWarning
    };
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
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  backdrop-filter: blur(8px);
}

.overlay-content {
  text-align: center;
  color: white;
  padding: 40px 30px;
  background: linear-gradient(145deg, #1f2b47 0%, #1a243e 100%);
  border-radius: 20px;
  max-width: 90%;
  width: 400px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.overlay-content h2 {
  margin-top: 0;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #61dafb;
}

.overlay-content p {
  margin-bottom: 30px;
  font-size: 1.1rem;
  line-height: 1.6;
}

.dismiss-btn {
  background-color: #61dafb;
  color: #0d1b2a;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dismiss-btn:hover {
  background-color: #4fa3d1;
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
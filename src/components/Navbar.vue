<template>
  <nav class="navbar" :class="{ 'scrolled': hasScrolled }">
    <div class="nav-container">
      <router-link to="/" class="logo-link">
        <img src="../assets/logo.png" alt="Logo Icon" class="logo-icon" />
      </router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/about" class="nav-item">About</router-link>
        <router-link to="/projects" class="nav-item">Projects</router-link>
        <router-link to="/services" class="nav-item">Services</router-link>
        <router-link to="/contact" class="nav-item">Contact</router-link>
        <a href="https://djleamen.substack.com" target="_blank" rel="noopener" class="nav-item">Blog</a>
      </div>
      <button
        class="menu-toggle"
        :class="{ active: mobileMenuActive }"
        @click="toggleMobileMenu"
        :aria-expanded="mobileMenuActive ? 'true' : 'false'"
        aria-label="Toggle menu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
    <div class="mobile-menu" :class="{ 'active': mobileMenuActive }">
      <router-link to="/" class="mobile-nav-item" @click="closeMobileMenu">Home</router-link>
      <router-link to="/about" class="mobile-nav-item" @click="closeMobileMenu">About</router-link>
      <router-link to="/projects" class="mobile-nav-item" @click="closeMobileMenu">Projects</router-link>
      <router-link to="/services" class="mobile-nav-item" @click="closeMobileMenu">Services</router-link>
      <router-link to="/contact" class="mobile-nav-item" @click="closeMobileMenu">Contact</router-link>
      <a href="https://djleamen.substack.com" target="_blank" rel="noopener" class="mobile-nav-item" @click="closeMobileMenu">Blog</a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const mobileMenuActive = ref(false);
const hasScrolled = ref(false);

function toggleMobileMenu() {
  mobileMenuActive.value = !mobileMenuActive.value;
  if (mobileMenuActive.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeMobileMenu() {
  mobileMenuActive.value = false;
  document.body.style.overflow = '';
}

function handleScroll() {
  hasScrolled.value = window.scrollY > 10;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  padding: 0 18px;
  background: rgba(17, 21, 48, 0.76);
  border-bottom: 1px solid rgba(128, 170, 255, 0.22);
  backdrop-filter: blur(12px);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}

.navbar.scrolled {
  background: rgba(14, 18, 42, 0.9);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
}

.nav-container {
  height: 74px;
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link {
  display: inline-flex;
  align-items: center;
}

.logo-icon {
  height: 48px;
  transition: transform 0.2s ease;
}

.logo-link:hover .logo-icon {
  transform: scale(1.04);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 26px;
}

.nav-item {
  position: relative;
  padding: 8px 0;
  color: rgba(237, 244, 255, 0.88);
  font-size: 1.01rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  transform: scaleX(0);
  transform-origin: left;
  background: linear-gradient(90deg, #68dbff, #40bdf5);
  transition: transform 0.2s ease;
}

.nav-item:hover {
  color: #9defff;
}

.nav-item:hover::after,
.router-link-active::after {
  transform: scaleX(1);
}

.router-link-active {
  color: #68dbff;
}

.menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(132, 179, 255, 0.35);
  background: rgba(104, 219, 255, 0.1);
  padding: 10px 8px;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.bar {
  display: block;
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background: #dff5ff;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.menu-toggle.active .bar:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.menu-toggle.active .bar:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active .bar:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.mobile-menu {
  display: none;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  max-height: 0;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
  transition: max-height 0.22s ease, opacity 0.22s ease;
  background: rgba(12, 16, 36, 0.92);
  border-top: 1px solid rgba(128, 170, 255, 0.18);
}

.mobile-menu.active {
  max-height: 420px;
  opacity: 1;
  pointer-events: auto;
}

.mobile-nav-item {
  padding: 14px 16px;
  text-align: center;
  color: rgba(237, 244, 255, 0.9);
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.mobile-nav-item:hover {
  background: rgba(104, 219, 255, 0.14);
  color: #c9f7ff;
}

@media (max-width: 820px) {
  .navbar {
    padding: 0 12px;
  }

  .nav-links {
    display: none;
  }

  .menu-toggle,
  .mobile-menu {
    display: flex;
  }
}

@media (min-width: 821px) {
  .mobile-menu {
    display: none !important;
  }
}
</style>

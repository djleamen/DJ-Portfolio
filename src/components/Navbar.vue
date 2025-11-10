<template>
  <nav class="navbar" :class="{ 'scrolled': hasScrolled }">
    <div class="nav-container">
      <router-link to="/" class="logo-link">
        <img src="../assets/banner.png" alt="Logo" class="logo" />
      </router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-item">Home</router-link>
        <router-link to="/about" class="nav-item">About</router-link>
        <router-link to="/projects" class="nav-item">Projects</router-link>
        <router-link to="/services" class="nav-item">Services</router-link>
        <router-link to="/contact" class="nav-item">Contact</router-link>
        <a href="https://djleamen.substack.com" target="_blank" rel="noopener" class="nav-item">Blog</a>
      </div>
      <button class="menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
    <div class="mobile-menu" :class="{ 'active': mobileMenuActive }">
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  background: rgba(26, 26, 46, 0.85);
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-sizing: border-box;
  margin: 0;
}

.navbar.scrolled {
  background: rgba(26, 26, 46, 0.95);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0 24px;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  height: 70px;
  box-sizing: border-box;
}

.nav-links {
  display: flex;
  gap: 28px;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 8px 0;
}

.nav-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #61dafb;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover::after,
.router-link-active::after {
  width: 100%;
}

.nav-item:hover {
  color: #61dafb;
}

.router-link-active {
  color: #61dafb;
  font-weight: 600;
}

.logo {
  height: 55px;
  user-select: none;
  background: transparent;
  border-radius: 0;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-link {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
  padding: 0;
  border: none;
}

.logo-link:hover .logo {
  transform: scale(1.05);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.bar {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu {
  display: none;
  flex-direction: column;
  background: rgba(26, 26, 46, 0.98);
  backdrop-filter: blur(15px);
  width: 100%;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu.active {
  max-height: 300px;
}

.mobile-nav-item {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 16px;
  text-align: center;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-nav-item:hover {
  background-color: rgba(97, 218, 251, 0.1);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .menu-toggle {
    display: flex;
  }
  
  .mobile-menu {
    display: flex;
  }
  
  .navbar {
    padding: 0 16px;
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
}

@media (min-width: 769px) {
  .mobile-menu {
    display: none !important;
  }
}
</style>
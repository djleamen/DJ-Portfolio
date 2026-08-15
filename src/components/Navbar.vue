<template>
  <nav class="navbar" :class="{ 'scrolled': hasScrolled }">
    <div class="nav-container">
      <router-link to="/" class="logo-link">
        <img src="../assets/logo.png" alt="Logo Icon" class="logo-icon" />
        <span class="wordmark">DJ Leamen</span>
        <span class="role">PORTFOLIO</span>
      </router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-item"><span>01</span>Index</router-link>
        <router-link to="/about" class="nav-item"><span>02</span>Profile</router-link>
        <router-link to="/projects" class="nav-item"><span>03</span>Work</router-link>
        <router-link to="/services" class="nav-item"><span>04</span>Services</router-link>
        <router-link to="/contact" class="nav-item"><span>05</span>Contact</router-link>
      </div>
      <button
        class="menu-toggle"
        :class="{ active: mobileMenuActive }"
        @click="toggleMobileMenu"
        :aria-expanded="mobileMenuActive ? 'true' : 'false'"
        :aria-label="mobileMenuActive ? 'Close menu' : 'Open menu'"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
    <div class="mobile-menu" :class="{ 'active': mobileMenuActive }">
      <router-link to="/" class="mobile-nav-item" @click="closeMobileMenu"><span>01</span> Index</router-link>
      <router-link to="/about" class="mobile-nav-item" @click="closeMobileMenu"><span>02</span> Profile</router-link>
      <router-link to="/projects" class="mobile-nav-item" @click="closeMobileMenu"><span>03</span> Work</router-link>
      <router-link to="/services" class="mobile-nav-item" @click="closeMobileMenu"><span>04</span> Services</router-link>
      <router-link to="/contact" class="mobile-nav-item" @click="closeMobileMenu"><span>05</span> Contact</router-link>
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
  padding: 0 var(--page-gutter);
  background: #0F1116;
  border-bottom: 1px solid transparent;
  transition: background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
}

.navbar.scrolled {
  background: rgba(10, 12, 17, 0.82);
  border-bottom: 1px solid var(--hairline);
  backdrop-filter: blur(14px);
}

.nav-container {
  height: 78px;
  max-width: var(--page-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-icon {
  height: 28px;
  transition: transform 0.3s ease;
}

.logo-link:hover .logo-icon {
  transform: rotate(45deg);
}

.wordmark {
  font-family: var(--serif);
  font-size: 1.08rem;
  font-weight: 500;
  letter-spacing: 0;
  color: var(--ink);
}

.role {
  margin-left: 4px;
  padding-left: 14px;
  border-left: 1px solid var(--hairline-strong);
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2vw, 30px);
}

.nav-item {
  position: relative;
  padding: 6px 0;
  color: var(--muted);
  font-size: 0.88rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.18s ease;
}

.nav-item span {
  margin-right: 6px;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.62rem;
}

.nav-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  transform: scaleX(0);
  transform-origin: left;
  background: var(--accent);
  transition: transform 0.22s ease;
}

.nav-item:hover {
  color: var(--ink);
}

.nav-item:hover::after,
.router-link-active::after {
  transform: scaleX(1);
}

.router-link-active {
  color: var(--ink);
}

.menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid var(--hairline-strong);
  background: var(--surface);
  padding: 10px 8px;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.bar {
  display: block;
  width: 100%;
  height: 1.5px;
  background: var(--ink);
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
  background: rgba(10, 12, 17, 0.98);
  backdrop-filter: blur(14px);
  border-top: 1px solid var(--hairline);
}

.mobile-menu.active {
  max-height: 420px;
  opacity: 1;
  pointer-events: auto;
}

.mobile-nav-item {
  padding: 15px var(--page-gutter);
  text-align: left;
  color: var(--body);
  font-weight: 500;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.18s ease, color 0.18s ease;
}

.mobile-nav-item span {
  display: inline-block;
  width: 34px;
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.68rem;
}

.mobile-nav-item:hover {
  background: var(--surface);
  color: var(--ink);
}

@media (max-width: 820px) {
  .nav-links {
    display: none;
  }

  .menu-toggle,
  .mobile-menu {
    display: flex;
  }
}

@media (max-width: 460px) {
  .role { display: none; }
}

@media (min-width: 821px) {
  .mobile-menu {
    display: none !important;
  }
}
</style>

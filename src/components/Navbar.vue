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
        class="menu-toggle bevel"
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
  background: var(--bg);
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.navbar.scrolled {
  border-bottom-color: var(--hairline);
}

.nav-container {
  height: var(--nav-h);
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
  height: 26px;
}

.wordmark {
  font-family: var(--display);
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1;
  color: var(--ink);
}

.role {
  margin-left: 4px;
  padding-left: 14px;
  border-left: 1px solid var(--hairline);
  color: var(--body);
  font-family: var(--mono);
  font-size: 0.74rem;
  font-weight: 500;
  letter-spacing: 0.12em;
}

.nav-links {
  display: flex;
  align-items: stretch;
  height: 100%;
  gap: clamp(14px, 2vw, 28px);
}

.nav-item {
  position: relative;
  display: inline-flex;
  align-items: center;
  color: var(--body);
  font-size: 0.98rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s ease;
}

.nav-item span {
  margin-right: 7px;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.72rem;
}

/* Active page = the same 2px run that marks a panel's edge */
.nav-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  transform: scaleX(0);
  transform-origin: left;
  background: var(--accent);
  transition: transform 0.2s var(--ease-out);
}

.nav-item:hover {
  color: var(--ink);
}

.nav-item.router-link-active {
  color: var(--ink);
}

.nav-item.router-link-active span {
  color: var(--accent);
}

.nav-item:hover::after,
.nav-item.router-link-active::after {
  transform: scaleX(1);
}

.menu-toggle {
  --cut: 7px;
  display: none;
  width: 42px;
  height: 42px;
  padding: 12px 10px;
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
  transform: translateY(7.5px) rotate(45deg);
}

.menu-toggle.active .bar:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active .bar:nth-child(3) {
  transform: translateY(-7.5px) rotate(-45deg);
}

.mobile-menu {
  display: none;
  flex-direction: column;
  width: 100%;
  max-height: 0;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
  transition: max-height 0.22s ease, opacity 0.22s ease;
  background: var(--bg);
  border-top: 1px solid var(--hairline);
}

.mobile-menu.active {
  max-height: 420px;
  opacity: 1;
  pointer-events: auto;
}

.mobile-nav-item {
  padding: 15px 2px;
  border-bottom: 1px solid var(--hairline);
  color: var(--ink);
  font-size: 1.08rem;
  font-weight: 500;
  text-decoration: none;
}

.mobile-nav-item:last-child { border-bottom: 0; }

.mobile-nav-item span {
  display: inline-block;
  width: 34px;
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.76rem;
}

.mobile-nav-item.router-link-active {
  color: var(--accent);
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

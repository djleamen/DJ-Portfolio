<template>
  <div class="app">
    <Navbar />
    <MobileWarningOverlay />
    <div class="main-content">
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
    <footer class="footer">
      <p>© 2025 DJ Leamen</p>
      <div class="socials">
        <a href="https://linkedin.com/in/djleamen" class="social-icon" aria-label="LinkedIn">
          <img src="@/assets/linkedin-icon.png" alt="LinkedIn" />
        </a>
        <a href="https://github.com/djleamen" class="social-icon" aria-label="GitHub">
          <img src="@/assets/github-icon.png" alt="GitHub" />
        </a>
        <a href="https://www.instagram.com/dejjos/" class="social-icon" aria-label="Instagram">
          <img src="@/assets/instagram-icon.png" alt="Instagram" />
        </a>
        <a href="mailto:dilara_leamen@icloud.com" class="social-icon" aria-label="Email">
          <img src="@/assets/email-icon.png" alt="Email" />
        </a>
        <a href="https://sessionize.com/djleamen/" class="social-icon" aria-label="Sessionize">
          <img src="@/assets/sessionize-icon.png" alt="Sessionize" />
        </a>
        <a href="https://bsky.app/profile/dejjo.bsky.social" class="social-icon" aria-label="Bluesky">
          <img src="@/assets/bluesky-icon.png" alt="Bluesky" />
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import MobileWarningOverlay from "./components/MobileWarning.vue";
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background: #1f1f35;
  color: white;
  font-family: 'Inter', 'Roboto', sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

body {
  display: flex;
  flex-direction: column;
}

.app {
  background: transparent;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  width: 100%;
}

.content {
  padding-top: 80px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
}

.footer {
  text-align: center;
  padding: 1.5rem 0;
  background: rgba(26, 26, 46, 0.95);
  color: white;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-top: 60px;
  position: relative;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.footer p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.socials {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin: 0.75rem auto;
  max-width: 500px;
}

.social-icon {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.social-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

.social-icon img {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.project-container {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px; 
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 768px) {
  .content {
    padding-top: 70px;
    padding-left: 12px;
    padding-right: 12px;
  }
  
  .socials {
    gap: 14px;
  }
  
  .social-icon {
    padding: 8px;
  }
  
  .social-icon img {
    width: 18px;
    height: 18px;
  }
}

.elevation-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.elevation-2 {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.elevation-3 {
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

.elevation-4 {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.elevation-5 {
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
}

.md-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
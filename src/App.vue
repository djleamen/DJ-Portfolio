<template>
  <div class="page-wrapper">
    <div class="app">
      <Navbar />
      <div class="main-content">
        <div class="content">
          <router-view v-slot="{ Component }">
            <transition name="page" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
    <footer class="footer">
      <p>© 2026 DJ Leamen</p>
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
      <div class="webring" aria-label="OTU Webring navigation">
        <a :href="webringPrevHref" class="webring-nav" title="Previous site">←</a>
        <a href="https://otu-ring.com" target="_blank" rel="noopener noreferrer" class="webring-center" title="OTU Webring">
          <img src="https://otu-ring.com/assets/ontariotech.svg" alt="OTU Webring" />
        </a>
        <a :href="webringNextHref" class="webring-nav" title="Next site">→</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Navbar from "./components/Navbar.vue";

const webringPrevHref = ref("https://otu-ring.com/prev.html");
const webringNextHref = ref("https://otu-ring.com/next.html");

onMounted(() => {
  let hostname = window.location.hostname;
  if (hostname.startsWith("www.")) {
    hostname = hostname.slice(4);
  }

  const encodedHost = encodeURIComponent(hostname);
  webringPrevHref.value = `https://otu-ring.com/prev.html?from=${encodedHost}`;
  webringNextHref.value = `https://otu-ring.com/next.html?from=${encodedHost}`;
});
</script>

<style>
:root {
  --site-bg: #0e1228;
  --site-bg-soft: #171c3c;
  --site-surface: rgba(25, 31, 68, 0.72);
  --site-border: rgba(131, 173, 255, 0.24);
  --site-text: #edf4ff;
  --site-muted: rgba(219, 230, 255, 0.72);
  --site-brand: #68dbff;
  --site-brand-strong: #40bdf5;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
  color: var(--site-text);
  font-family: 'Raleway', sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  overflow-x: hidden;
  background:
    radial-gradient(circle at 14% 12%, rgba(63, 174, 255, 0.22), transparent 30%),
    radial-gradient(circle at 84% 8%, rgba(109, 87, 255, 0.16), transparent 26%),
    linear-gradient(180deg, #0f1330 0%, #14183a 52%, #0d1229 100%);
}

body {
  display: flex;
  flex-direction: column;
}

.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main-content {
  flex: 1;
  width: 100%;
}

.content {
  max-width: 1240px;
  margin: 0 auto;
  width: 100%;
  padding: 98px 20px 0;
  box-sizing: border-box;
}

.footer {
  margin-top: 64px;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  text-align: center;
  padding: 1.65rem 1rem 1.5rem;
  border-top: 1px solid rgba(140, 178, 255, 0.2);
  background: linear-gradient(180deg, rgba(17, 21, 48, 0.92), rgba(12, 16, 38, 0.96));
  backdrop-filter: blur(12px);
}

.footer p {
  margin: 0.35rem 0;
  font-size: 0.9rem;
  color: var(--site-muted);
}

.socials {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0.7rem auto 0.8rem;
  max-width: 560px;
}

.social-icon {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(124, 170, 255, 0.14);
  border: 1px solid rgba(132, 177, 255, 0.28);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.26);
  transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.social-icon:hover {
  transform: translateY(-2px);
  border-color: rgba(104, 219, 255, 0.7);
  background: rgba(104, 219, 255, 0.2);
}

.social-icon img {
  width: 18px;
  height: 18px;
}

.webring {
  margin: 0.1rem auto 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(131, 173, 255, 0.22);
  background: rgba(27, 33, 70, 0.48);
}

.webring-nav {
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  color: rgba(219, 230, 255, 0.76);
  text-decoration: none;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.webring-nav:hover {
  color: #dff5ff;
  background: rgba(104, 219, 255, 0.18);
}

.webring-center {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.webring-center img {
  height: 16px;
  width: auto;
  opacity: 0.75;
  transition: opacity 0.2s ease;
}

.webring-center:hover img {
  opacity: 1;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.35s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(18px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.elevation-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.elevation-2 {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.elevation-3 {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.elevation-4 {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.elevation-5 {
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}

.md-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 768px) {
  .content {
    padding-top: 88px;
    padding-left: 14px;
    padding-right: 14px;
  }

  .footer {
    margin-top: 36px;
    padding: 1.4rem 0.8rem 1.3rem;
  }

  .webring {
    margin-top: 0.3rem;
  }
}
</style>

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
      <div class="footer-inner">
        <div class="footer-intro">
          <p class="eyebrow">One more thing</p>
          <p class="footer-statement">Check out my projects and feel free to contribute.</p>
        </div>
        <div class="footer-directory">
          <p class="footer-label">Elsewhere</p>
          <div class="footer-links">
            <a href="https://linkedin.com/in/djleamen">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href="https://github.com/djleamen">GitHub <span aria-hidden="true">↗</span></a>
            <a href="https://sessionize.com/djleamen/">Sessionize <span aria-hidden="true">↗</span></a>
            <a href="mailto:dilara_leamen@icloud.com">Email <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div class="footer-base">
          <p>© 2026 DJ Leamen</p>
          <div class="webring" aria-label="OTU Webring navigation">
            <a :href="webringPrevHref" class="webring-nav" title="Previous site" aria-label="Previous site">←</a>
            <a href="https://otu-ring.com" target="_blank" rel="noopener noreferrer" class="webring-center" title="OTU Webring">
              OTU Webring
            </a>
            <a :href="webringNextHref" class="webring-nav" title="Next site" aria-label="Next site">→</a>
          </div>
          <a href="#app" class="back-to-top">Back to top ↑</a>
        </div>
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
html,
body {
  min-height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
  color: var(--body);
  font-family: var(--sans);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  overflow-x: hidden;
  background: var(--bg);
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
  max-width: var(--page-width);
  margin: 0 auto;
  width: 100%;
  padding: 116px var(--page-gutter) 0;
  box-sizing: border-box;
}

.footer {
  margin-top: clamp(38px, 5.5vw, 72px);
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  border-top: 1px solid var(--hairline);
  background: var(--bg-2);
}

.page-wrapper:has(.home) .footer {
  margin-top: 0;
}

.footer-inner {
  max-width: var(--page-width);
  margin: 0 auto;
  padding: clamp(44px, 6.5vw, 82px) var(--page-gutter) 24px;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(240px, 0.7fr);
  gap: clamp(52px, 9vw, 140px);
}

.footer-intro .eyebrow {
  margin: 0 0 20px;
  color: var(--accent);
}

.footer-statement {
  max-width: 17ch;
  margin: 0;
  color: var(--ink);
  font-family: var(--serif);
  font-size: clamp(1.8rem, 3.3vw, 3.4rem);
  font-weight: 480;
  line-height: 1.03;
}

.footer-label,
.footer-base p {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.footer-links {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
}

.footer-links a {
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--hairline);
  color: var(--body);
  transition: color 0.2s ease, padding-left 0.2s var(--ease-out);
}

.footer-links a:hover {
  padding-left: 8px;
  color: var(--accent-bright);
}

.footer-base {
  grid-column: 1 / -1;
  padding-top: 26px;
  border-top: 1px solid var(--hairline);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
}

.webring {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
}

.webring-nav {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  color: var(--muted);
  text-decoration: none;
  transition: color 0.18s ease, background-color 0.18s ease;
}

.webring-nav:hover {
  color: var(--accent-bright);
  background: var(--surface);
}

.webring-center {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.76rem;
}

.back-to-top {
  justify-self: end;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.8rem;
}

.back-to-top:hover { color: var(--accent-bright); }

.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(14px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Subtle elevation — restrained, not material-design heavy */
.elevation-1 { box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3); }
.elevation-2 { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35); }
.elevation-3 { box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45); }
.elevation-4 { box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5); }
.elevation-5 { box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55); }

.md-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (max-width: 768px) {
  .content {
    padding: 92px var(--page-gutter) 0;
  }

  .footer-inner {
    grid-template-columns: 1fr;
  }

  .footer-base {
    grid-column: 1;
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .back-to-top {
    justify-self: start;
  }
}
</style>

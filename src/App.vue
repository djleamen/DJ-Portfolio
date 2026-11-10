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
            <a :href="webringPrevHref" class="webring-nav bevel" title="Previous site" aria-label="Previous site">←</a>
            <a href="https://otu-ring.com" target="_blank" rel="noopener noreferrer" class="webring-center" title="OTU Webring">
              OTU Webring
            </a>
            <a :href="webringNextHref" class="webring-nav bevel" title="Next site" aria-label="Next site">→</a>
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
  line-height: 1.6;
  scroll-behavior: smooth;
  overflow-x: hidden;
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
  padding: calc(var(--nav-h) + 28px) var(--page-gutter) 0;
}

.footer {
  margin-top: clamp(38px, 5.5vw, 72px);
  border-top: 1px solid var(--hairline);
  background: var(--surface);
}

.footer-inner {
  max-width: var(--page-width);
  margin: 0 auto;
  padding: clamp(40px, 6vw, 72px) var(--page-gutter) 24px;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(240px, 0.7fr);
  gap: clamp(40px, 8vw, 120px);
}

.footer-intro .eyebrow {
  margin: 0 0 14px;
}

.footer-statement {
  max-width: 20ch;
  margin: 0;
  color: var(--ink);
  font-family: var(--display);
  font-size: clamp(2.2rem, 4vw, 3.6rem);
  font-weight: 700;
  line-height: 1;
}

.footer-label,
.footer-base p {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--body);
}

.footer-links {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
}

.footer-links a {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--hairline);
  color: var(--ink);
  font-weight: 500;
  transition: color 0.15s ease;
}

.footer-links a span { color: var(--muted); }

.footer-links a:hover,
.footer-links a:hover span {
  color: var(--accent);
}

.footer-base {
  grid-column: 1 / -1;
  padding-top: 22px;
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
}

.webring-nav {
  --cut: 5px;
  --plate: transparent;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--body);
}

.webring-nav:hover {
  --stroke: var(--accent);
  color: var(--accent);
}

.webring-center,
.back-to-top {
  color: var(--body);
  font-family: var(--mono);
  font-size: 0.8rem;
}

.back-to-top { justify-self: end; }

.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .content {
    padding-top: calc(var(--nav-h) + 16px);
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

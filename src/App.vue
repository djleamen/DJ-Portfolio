<template>
    <div class="app">
      <Navbar />
      <MobileWarningOverlay />f
      <div class="content">
        <router-view />
      </div>
    </div>
    <footer class="footer">
        <p>© 2025 DJ Leamen</p>
        <div class="socials">
          <a href="https://linkedin.com/in/djleamen" class="social-icon">
            <img src="@/assets/linkedin-icon.png" alt="LinkedIn" />
          </a>
          <a href="https://github.com/djleamen" class="social-icon">
            <img src="@/assets/github-icon.png" alt="GitHub" />
          </a>
          <a href="https://www.instagram.com/dejjos/" class="social-icon">
            <img src="@/assets/instagram-icon.png" alt="Instagram" />
          </a>
          <a href="mailto:dilara_leamen@icloud.com" class="social-icon">
            <img src="@/assets/email-icon.png" alt="Email" />
          </a>
          <a href="https://sessionize.com/djleamen/" class="social-icon">
            <img src="@/assets/sessionize-icon.png" alt="Sessionize" />
          </a>
          <a href="https://bsky.app/profile/dejjo.bsky.social" class="social-icon">
            <img src="@/assets/bluesky-icon.png" alt="Bluesky" />
          </a>
        </div>
      </footer>
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
    background-color: #1a1a2e; /* Ensure strong contrast */
    color: white;
    font-family: 'Inter', sans-serif;
  }
  
  body {
    display: flex;
    flex-direction: column;
  }
  
  .app {
    background-color: #1a1a2e; /* Ensure strong contrast */
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .content {
    flex: 1;
    padding-top: 50px; /* Adjust based on navbar height */
  }
  
  .footer {
    text-align: center;
    padding: 0.5rem;
    background: #1e1e2e;
    color: white;
    width: 100vw; /* Ensure the footer spans the full width */
    margin-top: 40px; /* Add margin to separate from content */
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .socials {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 0.25rem;
    margin-bottom:0.25rem;
  }
  
  .social-icon {
    background-color: white; /* White circle background */
    border-radius: 50%; /* Make it a circle */
    padding: 10px; /* Add padding to create space around the icon */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .social-icon img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  
  .project-container {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px; 
  }
  
  </style>
<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo-link">
        <img src="../assets/banner.png" alt="Logo" class="logo" /> <!-- Logo image as a button -->
      </router-link>
      <div class="nav-links">
        <router-link to="/about" class="nav-item">About</router-link>
        <router-link to="/projects" class="nav-item">Projects</router-link>
        <router-link to="/services" class="nav-item">Services</router-link>
        <router-link to="/contact" class="nav-item">Contact</router-link>
        <a href="https://medium.com/@djleamen" target="_blank" class="nav-item">Blog</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: flex-start; /* Align items to the start (left) */
  align-items: center;
  padding: 20px;
  background: #1e1e2e;
  width: 100%; /* Ensure the navbar spans the full width */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed; /* Fix the navbar at the top */
  top: 0;
  left: 0;
  z-index: 1000; /* Ensure the navbar is above other content */
}

.nav-container {
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 20px;
  margin-left: 20px; /* Add some space between the logo and the links */
}

.nav-item {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease-in-out;
}

.nav-item:hover {
  color: #61dafb;
}

.logo {
  height: 40px;
  margin: 0;
  user-select: none; /* Disable user selection on the image */
}

.logo-link {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  cursor: pointer;
  user-select: none; /* Explicitly disable user selection on the link wrapper */
  transition: opacity 0.3s ease-in-out; /* Ensure smooth opacity transition */
}

.logo-link:hover {
  transition: opacity 0.3s ease-in-out;
  opacity: 0.8; /* Smoothly change opacity on hover */
}

</style>
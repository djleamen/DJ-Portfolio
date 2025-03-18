<template>
  <div class="contact-container">
    <h1>Contact Me</h1>
    <p>Let's connect! Reach out to me on:</p>
    <div class="socials">
        <a href="https://linkedin.com/in/djleamen" class="social-icon">
          <span class="social-text">LinkedIn:</span> <img src="@/assets/linkedin-icon.png" alt="LinkedIn" />
        </a>
        <a href="https://github.com/djleamen" class="social-icon">
          <span class="social-text">GitHub:</span> <img src="@/assets/github-icon.png" alt="GitHub" />
        </a>
        <a href="https://www.instagram.com/dejjos/" class="social-icon">
          <span class="social-text">Instagram:</span> <img src="@/assets/instagram-icon.png" alt="Instagram" />
        </a>
        <a href="mailto:dilara_leamen@icloud.com" class="social-icon">
          <span class="social-text">Email:</span> <img src="@/assets/email-icon.png" alt="Email" />
        </a>
        <a href="https://sessionize.com/djleamen" class="social-icon">
          <span class="social-text">Sessionize:</span> <img src="@/assets/sessionize-icon.png" alt="Sessionize" />
        </a>
        <a href="https://bsky.app/profile/dejjo.bsky.social" class="social-icon">
          <span class="social-text">Bluesky:</span> <img src="@/assets/bluesky-icon.png" alt="Bluesky" />
        </a>
      </div>
      <p>Or, find everything on my Linktree:</p>
      <a href="https://linktr.ee/djleamen" class="btn">Linktree</a>
    </div>
</template>

<style scoped>
.contact-container {
  margin-top: 20px;
  margin: 0 auto;
  text-align: center;
  padding: 50px;
  color: white;
  background-color: #1a1a2e; /* Ensure strong contrast */
  max-width: 600px;
  border-radius: 15px; /* Rounded corners */
}

a {
  color: #1a1a2e;
  text-decoration: none;
}

a:hover {
  color: #4fa3d1;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #4fa3d1, #2575fc);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  margin: 20px;
  font-size: 1.2rem;
}

.socials {
  background-color: white;
  display: flex;
  flex-wrap: wrap; /* Allow wrapping */
  justify-content: center;
  gap: 20px; /* Increased gap */
  padding: 20px; /* Padding around the social icons */
  border-radius: 15px; /* Rounded corners */
}

.social-icon {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center; /* Align items vertically */
  justify-content: center; /* Center items horizontally */
  flex: 1 1 calc(33.333% - 40px); /* 3 items per row with gap */
  max-width: calc(33.333% - 40px); /* Ensure max width */
  text-align: center; /* Center text */
}

.social-text {
  margin-right: 8px; /* Space between text and icon */
  margin-left: 20px;
}

.social-icon img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: transform 0.3s;
}

.social-icon img:hover {
  transform: scale(1.1);
}

.btn {
  background-color: #61dafb;
  color: black;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  margin-top: 20px;
  font-weight: 500; /* Medium weight for buttons */
}
</style>

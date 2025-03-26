<template>
  <div class="services-container">
      <h1>My Services</h1>
      <p>
        I develop efficient, user-focused software solutions with expertise in web and application development, cloud solutions, and database management. Using Agile methodologies, I ensure iterative progress, continuous feedback, and adaptability. My approach blends technical excellence with UX design, accessibility, and structured development sprints to deliver functional, business-aligned solutions. Let’s connect to bring your vision to life!
      </p>
      <h3>Services provided</h3>
        <ul class="services-list">
          <li><i class="icon">✔</i> Application Development</li>
          <li><i class="icon">✔</i> Cloud Application Development</li>
          <li><i class="icon">✔</i> Custom Software Development</li>
          <li><i class="icon">✔</i> Database Development</li>
          <li><i class="icon">✔</i> Software Testing</li>
          <li><i class="icon">✔</i> Web Design</li>
          <li><i class="icon">✔</i> Web Development</li>
          <li><i class="icon">✔</i> User Experience Design (UED)</li>
          <li><i class="icon">✔</i> Data Entry</li>
          <li><i class="icon">✔</i> Research</li>
        </ul>
        <div>
          <h1></h1>
        </div>
        <h3>Availability:</h3>
          <p>Remote or in person (Whitby, ON)</p>
        <h3>Pricing:</h3>
          <p>Contact for pricing</p>
          <router-link to="/contact" class="btn">Contact</router-link>
    </div>
  </template>
  
  <style scoped>
  .services-container {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 800px;
      margin-top: 0px;
      margin-bottom: -20px;
      padding: 40px;
      color: white;
      border-radius: 15px;
      text-align: left;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      font-family: 'Arial', sans-serif;
    }
  
    .services-list {
      list-style: none;
      padding-left: 0;
      background-color: transparent; /* explicitly remove background */
      border-color: transparent; /* explicitly remove border */
  }
  
    .services-container h1 {
      font-size: 2.5rem;
      color: #2a2a72;
      margin-top: 10;
      margin-bottom: 20px;
      text-align: center;
      background: linear-gradient(to right, #4fa3d1, #2575fc);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  
      .services-container h3 {
          font-size: 1.5rem;
          color: white;
          margin-top: 10px;
          margin-bottom: 0px;
      }
  
      .services-container h4 {
          font-size: 1.2rem;
          color: white;
          margin-top: 30px;
          margin-bottom: 0px;
      }
  
    .services-container p {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 20px;
    }
  
    .services-container ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Increased min-width */
      gap: 30px; /* Adjusted gap for better spacing */
      padding: 0;
      margin-top: 20px;
      color: #2a2a72;
    }
  
    .services-container ul li {
      font-size: 1.2rem; /* Increased font size */
      display: flex;
      align-items: center;
      background-color: #ffffff;
      padding: 20px 25px; /* Adjusted padding for better appearance */
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      min-width: 500px; /* Set a minimum width for the bubbles */
      margin-bottom: 0; /* Removed margin-bottom to reduce spacing */
    }
  
    .services-container ul li:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  
    .services-container ul li .icon {
      color: #2575fc;
      margin-right: 10px;
      font-size: 1.2rem;
    }
  
  /*style contact button*/
  
  .btn {
    /* Create space around button */
    display: inline-block;
    background-color: #61dafb;
    color: black;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    transition: 0.3s ease-in-out;
    margin-bottom: 20px;
    margin-top: 5px;
    font-weight: 500; /* Medium weight for buttons */
  }
  
  .btn:hover {
    background-color: #4fa3d1;
  }
  
  </style>
  
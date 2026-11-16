<template>
  <ProjectPage projectId="37">
    <h1>Build Your Own X</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
      Build Your Own X is a series of tools I rebuilt from scratch to understand how they work underneath. Each one follows a CodeCrafters challenge, where an automated test suite checks your implementation against the behaviour of the real thing, one stage at a time.
    </p>
    <p>
      I deliberately spread the series across languages, so each project was also practice in a different ecosystem.
    </p>

    <h2>The Projects</h2>
    <ul>
      <li><a href="https://github.com/djleamen/redis-python" target="_blank" rel="noopener noreferrer">Redis in Python</a> and <a href="https://github.com/djleamen/redis-csharp" target="_blank" rel="noopener noreferrer">Redis in C#</a>: the same server built twice to compare the two languages</li>
      <li><a href="https://github.com/djleamen/git-java" target="_blank" rel="noopener noreferrer">Git in Java</a></li>
      <li><a href="https://github.com/djleamen/sqlite-typescript" target="_blank" rel="noopener noreferrer">SQLite in TypeScript</a></li>
      <li><a href="https://github.com/djleamen/shell-cpp" target="_blank" rel="noopener noreferrer">A POSIX-style shell in C++</a></li>
      <li><a href="https://github.com/djleamen/bittorrent-java" target="_blank" rel="noopener noreferrer">A BitTorrent client in Java</a></li>
      <li><a href="https://github.com/djleamen/http-server-csharp" target="_blank" rel="noopener noreferrer">An HTTP server in C#</a></li>
      <li><a href="https://github.com/djleamen/interpreter-python" target="_blank" rel="noopener noreferrer">An interpreter in Python</a></li>
      <li><a href="https://github.com/djleamen/grep-typescript" target="_blank" rel="noopener noreferrer">grep in TypeScript</a></li>
      <li><a href="https://github.com/djleamen/claude-code-python" target="_blank" rel="noopener noreferrer">A coding agent in Python</a></li>
    </ul>

    <h2>What I Learned</h2>
    <p>
      Rebuilding a tool removes the mystery from it. After writing a Redis server, a wire protocol is only bytes on a socket. After writing Git, a commit is only a hashed object pointing at other hashed objects. The series gave me working knowledge of network protocols, parsing, file formats, process control, and concurrency that I use when debugging the real tools.
    </p>

    <h2>Why Several Languages</h2>
    <p>
      Building the same kind of system in Java, C#, C++, Python, and TypeScript made the differences between them practical. I saw how each handles memory, concurrency, and binary data in code I had written myself.
    </p>

    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
    </div>
  </ProjectPage>
</template>

<script setup lang="ts">
import ProjectPage from '@/components/ProjectPage.vue';
import { useProjectData } from '@/composables/useProjectData';

const { formattedDate } = useProjectData('37');

const skills = [
  "Java", "C#", "C++", "Python", "TypeScript", "Network Programming", "Concurrency",
  "Operating Systems", "Compilers", "Data Structures & Algorithms", "Memory Management",
  "Systems Programming", "Testing", "Debugging", "Software Engineering", "Software Architecture",
  "Git", "Version Control", "Problem Solving", "Multi-threading", "Large Language Models (LLM)",
  "Agentic Frameworks", "SQLite", "Maven", "SQL", "Relational Databases", "NoSQL",
  "Generative AI", "File Systems", "Visual Studio Code", "Creativity", "Attention to Detail",
  "Analytical Skills", "Professional Development", "Research", "Resilience", "Decision Making",
  "Organization"
];
</script>

## DJ Leamen's Personal Portfolio

![Status](https://img.shields.io/badge/status-online-brightgreen?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/djleamen/DJ-Portfolio?style=flat-square)
![GitHub license](https://img.shields.io/github/license/djleamen/DJ-Portfolio?style=flat-square)
![Vue.js](https://img.shields.io/badge/built%20with-Vue.js-42b883?logo=vue.js&logoColor=white&style=flat-square)
![Deployed on Azure](https://img.shields.io/badge/deployed%20on-Azure-0078D4?logo=microsoft-azure&logoColor=white&style=flat-square)

This repository contains the source code for my personal portfolio, built with Vue 3 and TypeScript, backed by Azure Functions and MongoDB Atlas, and deployed on Azure Static Web Apps. The portfolio showcases my projects, experience, links to my social media, information about the classes I've taken, what I'm currently learning, and more.

## Overview

This portfolio is designed to provide a comprehensive view of my skills and experiences. It uses **MongoDB Atlas** for data storage and **Azure Functions** for API endpoints, providing a scalable and maintainable architecture.

## Features
- **About**: 
    - My technical skills and proficiencies
    - Detailed information about my professional and extracurricular experience.
    - Information about the courses I've taken, including descriptions and details.
- **Projects**: A showcase of my software development projects with descriptions and links.
- **Services**: Details regarding the list of the services I provide.
- **Contact**: Links to my GitHub and LinkedIn profiles.
- **Blog**: My Medium article posts.

## Technologies Used

- **Vue.js 3** + **TypeScript**: Frontend framework for building the user interface.
- **MongoDB Atlas**: Cloud database for storing portfolio data.
- **Azure Functions**: Serverless API endpoints for data retrieval.
- **Azure Static Web Apps**: Hosting and deployment platform.
- **Vite**: Build tool and development server.

## Architecture

```
Frontend (Vue.js) → Azure Functions API → MongoDB Atlas
```

- **Frontend**: Vue 3 + TypeScript SPA
- **Backend**: Azure Functions (Node.js) with serverless API endpoints
- **Database**: MongoDB Atlas (Free Tier M0 Cluster)

## Setup & Installation

### Prerequisites
- Node.js 20+
- Azure Functions Core Tools
- MongoDB Atlas account (free tier)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/djleamen/portfolio.git
   cd portfolio
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install API dependencies**
   ```bash
   cd api
   npm install
   cd ..
   ```

4. **Configure MongoDB**
   - Create a free MongoDB Atlas cluster and a database named `portfolio`
   - Copy `api/local.settings.json.example` to `api/local.settings.json` and set `MONGODB_URI`

5. **Seed the database**

   The API reads one collection per endpoint: `projects`, `skills`, `work`,
   `courses`, `certs`, and `education`. Populate them in Atlas (import a JSON
   array per collection, or insert through the Atlas UI) before starting the
   API — every endpoint returns an empty result until its collection exists.

   > Note: `scripts/` declares an `npm run migrate` task pointing at
   > `migrate-to-mongodb.js`, but that script is not committed to this
   > repository, so the task will fail.

6. **Start the API (Terminal 1)**
   ```bash
   cd api
   npm start
   ```

7. **Start the frontend (Terminal 2)**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   - Frontend: http://localhost:5173
   - API: http://localhost:7071

## Deployment

The site automatically deploys to Azure Static Web Apps via GitHub Actions. The `/api` folder is automatically detected and deployed as Azure Functions.

### Environment Variables (Azure Portal)
Add these in your Static Web App Configuration:
- `MONGODB_URI`: Your MongoDB Atlas connection string

## Project Structure

```
portfolio/
├── api/                    # Azure Functions backend
│   ├── GetCerts/          # Certifications endpoint
│   ├── GetCourses/        # Courses endpoint
│   ├── GetEducation/      # Education endpoint
│   ├── GetProjects/       # Projects endpoint
│   ├── GetSkills/         # Skills endpoint
│   ├── GetWork/           # Work experience endpoint
│   └── shared/            # Shared database connection
├── src/
│   ├── components/        # Vue components
│   ├── data/              # Legacy data files (deprecated)
│   ├── services/          # API client service
│   └── views/             # Page components
├── scripts/               # Migration and utility scripts
```

## API Endpoints

- `GET /api/certs` - Get all certifications
- `GET /api/courses` - Get all courses (consolidated with education details and course descriptions)
- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get skills (categorized)
- `GET /api/work` - Get work experience

## Migration from Hardcoded Data

Portfolio content (projects, work, courses, certs, education, skills) has moved from hardcoded files under `src/data/` to MongoDB Atlas, read at runtime through the Azure Functions API. The one-off migration script referenced by `scripts/package.json` is not committed here; seed the collections directly in Atlas (see step 5 above).

## Troubleshooting

If you encounter TypeScript config issues:
```bash
npm install @vue/tsconfig --save-dev
```

For MongoDB connection issues, confirm `MONGODB_URI` is set (locally in `api/local.settings.json`, in production under the Static Web App's Configuration) and that the Atlas cluster allows connections from Azure.

## License

This project is licensed under the MIT-0 License. See the LICENSE file for more information.

## Contact

For any inquiries, please contact me at [dilara_leamen@icloud.com](mailto:dilara_leamen@icloud.com).

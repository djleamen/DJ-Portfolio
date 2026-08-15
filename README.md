## DJ Leamen's Personal Portfolio

![Status](https://img.shields.io/badge/status-online-brightgreen?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/djleamen/DJ-Portfolio?style=flat-square)
![GitHub license](https://img.shields.io/github/license/djleamen/DJ-Portfolio?style=flat-square)
![Vue.js](https://img.shields.io/badge/built%20with-Vue.js-42b883?logo=vue.js&logoColor=white&style=flat-square)
![Deployed on Azure](https://img.shields.io/badge/deployed%20on-Azure-0078D4?logo=microsoft-azure&logoColor=white&style=flat-square)

This repository contains the source code for my personal portfolio, built using Vue.js and AWS Amplify, and deployed on Azure. The portfolio showcases my projects, experience, links to my social media, information about the classes I've taken, what I'm currently learning, and more.

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
   - Follow the [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) to set up MongoDB Atlas
   - Update `api/local.settings.json` with your MongoDB connection string

5. **Migrate data to MongoDB**
   ```bash
   cd scripts
   npm install
   npm run migrate
   cd ..
   ```

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
└── MIGRATION_GUIDE.md    # Detailed migration instructions
```

## API Endpoints

- `GET /api/certs` - Get all certifications
- `GET /api/courses` - Get all courses (consolidated with education details and course descriptions)
- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get skills (categorized)
- `GET /api/work` - Get work experience

## Migration from Hardcoded Data

This project recently migrated from hardcoded JavaScript files to MongoDB. See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for details.

## Troubleshooting

If you encounter TypeScript config issues:
```bash
npm install @vue/tsconfig --save-dev
```

For MongoDB connection issues, see the [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md#-troubleshooting) troubleshooting section.

## License

This project is licensed under the MIT-0 License. See the LICENSE file for more information.

## Contact

For any inquiries, please contact me at [dilara_leamen@icloud.com](mailto:dilara_leamen@icloud.com).

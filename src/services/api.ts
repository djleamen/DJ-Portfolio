/**
 * API Service for fetching portfolio data from Azure Functions + MongoDB
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface FetchOptions {
  cache?: RequestCache;
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: options.cache || 'default',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Certifications
  getCerts: () => fetchAPI<any[]>('/certs'),

  // Courses (consolidated with education details)
  getCourses: () => fetchAPI<any[]>('/courses'),

  // Projects
  getProjects: () => fetchAPI<any[]>('/projects'),

  // Skills
  getSkills: () => fetchAPI<{
    skills: string[];
    languages: string[];
    frameworks: string[];
    ml_ai: string[];
    cloud: string[];
    databases: string[];
    ides: string[];
    platformstools: string[];
    devTools: string[];
    methodologies: string[];
    coreConcepts: string[];
    soft: string[];
  }>('/skills'),

  // Work Experience
  getWork: () => fetchAPI<any[]>('/work'),
};

// Export as both 'api' and 'apiService' for compatibility
export const apiService = api;
export default api;

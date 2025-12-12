import { ref, computed, onMounted } from 'vue';
import { apiService } from '@/services/api';

export function useProjectData(projectId: string) {
  const projects = ref<any[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const project = computed(() => {
    return projects.value.find(p => p.id === projectId || p.projectId === projectId);
  });

  const formattedDate = computed(() => {
    if (project.value && project.value.date) {
      const date = new Date(project.value.date);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    return '';
  });

  const skills = computed(() => {
    return project.value?.skills || [];
  });

  onMounted(async () => {
    try {
      projects.value = await apiService.getProjects();
    } catch (err) {
      console.error('Failed to load projects:', err);
      error.value = 'Failed to load project data';
    } finally {
      loading.value = false;
    }
  });

  return {
    projects,
    project,
    formattedDate,
    skills,
    loading,
    error
  };
}

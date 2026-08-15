<template>
  <ProjectPage projectId="30">
    <h1>Stroke Prediction Model in R</h1>
    <p class="project-date">{{ formattedDate }}</p>
    <p>
        An end-to-end machine learning project that builds, evaluates, and deploys 
        a stroke prediction model in R using the tidymodels framework. The final model 
        is served as a REST API via plumber and vetiver.
    </p>

    <h2>Project Overview</h2>
    <p>
        According to the World Health Organization (WHO), stroke is the 2nd leading
        cause of death globally, responsible for approximately 11% of total deaths. 
        This project uses clinical and demographic features to predict whether a 
        patient is likely to suffer a stroke.
        
        The model was trained on a dataset of 5,110 patient records with 12 features
        (age, hypertension, heart disease, marital status, work type, residence type, 
        average glucose level, BMI, smoking status, and gender). The dataset was imbalanced,
        with only 249 stroke cases (4.9%).
        To address this, SMOTE (Synthetic Minority Over-sampling Technique) was applied 
        to balance the classes.
        </p>

    <h2>Methodology</h2>
    <p>
        This analysis built and evaluated three classification models 
        to predict stroke risk from clinical and demographic patient data. 
        Key steps included:

        The dataset contained 5,110 patient records with 11 features. 
        Significant class imbalance was identified — only ~4.9% of patients 
        experienced a stroke, making standard accuracy misleading as a sole metric.
    </p>

    <h3>Data Preprocessing</h3>
    <ul>
        <li>Missing BMI values (~3.9% of records) were imputed with the training-set median.</li>
        <li>Categorical variables were one-hot encoded.</li>
        <li>All numeric predictors were normalized (zero mean, unit variance).</li>
        <li>SMOTE (Synthetic Minority Oversampling Technique) was applied within each
            cross-validation fold to address class imbalance without leaking information
            from validation folds.</li>
    </ul>

    <h3>Model Building</h3>
    <p>
        Three classification models were trained and tuned via 5-fold stratified
        cross-validation:
    </p>
    <ul>
        <li>Logistic Regression (with L1 regularization via glmnet)</li>
        <li>Random Forest (tuned: mtry, min_n, trees via ranger)</li>
        <li>XGBoost (tuned: trees, learn_rate, tree_depth, loss_reduction)</li>
    </ul>

    <h3>Model Evaluation</h3>
    <p>
        Models were compared by cross-validation ROC AUC, then the best model was evaluated on the held-out test set using accuracy, sensitivity, specificity, F1, and ROC AUC.
    </p>

    <h2>Key Findings</h2>
    <p>
        Age was the single most important predictor — stroke risk rises sharply after age 60.
        Average glucose level and hypertension were the second and third ranked features, consistent with clinical literature.
        BMI alone was a weaker predictor unless combined with glucose and age.
        Patients who had ever been married and who were employed showed higher stroke rates, likely acting as proxies for age.
        The Random Forest model achieved the best balance of sensitivity and ROC AUC — important in clinical settings where missing a true stroke case (false negative) is costly.
    </p>

    <h2>Limitations and Recommendations</h2>
    <p>
        <ul>
        <li>Class imbalance: Even after SMOTE, models may still under-predict strokes 
            in the real world. A lower classification threshold (e.g., 0.3 instead of 0.5) 
            could improve sensitivity at the cost of specificity.</li>
        <li>Missing data: BMI was missing for ~200 records — a more sophisticated imputation (e.g., k-NN or multiple imputation) could improve model accuracy.</li>
        <li>Causality: This is a predictive model, not a causal one. Feature importance reflects predictive correlation, not clinical causation.</li>
        <li>External validation: The model should be validated on an independent, prospective dataset before clinical deployment.</li>
        <li>Next steps: Consider integrating additional clinical features (e.g., LDL cholesterol, family history), and calibrate the model’s probability outputs for clinical use.</li>
        </ul>
    </p>
    <p>
        View it on RPubs or GitHub:
        <ul>
            <li><a href="https://rpubs.com/djleamen/stroke-prediction" target="_blank" rel="noopener noreferrer">Build and deploy a stroke prediction model using R</a></li>
          <li><a href="https://github.com/djleamen/stroke-prediction" target="_blank" rel="noopener noreferrer">Social Media Performance Analysis</a></li>
        </ul>
    </p>
    
    <h2>Skills Developed</h2>
    <div class="skills-container">
      <div class="skill-bubble" v-for="skill in skills" :key="skill">{{ skill }}</div>
    </div>
  </ProjectPage>
</template>

<script>
import ProjectPage from '@/components/ProjectPage.vue';
import { apiService } from '@/services/api';

export default {
  components: {
    ProjectPage
  },
  async created() {
    try {
      this.projects = await apiService.getProjects();
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  },
  computed: {
    formattedDate() {
      const project = this.projects.find(p => p.id === '30');
      if (project && project.date) {
        const date = new Date(project.date);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }
      return '';
    }
  },
  data() {
    return {
      projects: [],
      skills: [
    "Machine Learning", "ML/AI", "Artificial Intelligence (AI)","Supervised Learning",
    "Data Preprocessing", "Data Science", "Data Analysis", "Data Visualization",
    "Statistical analysis", "Mathematics", "Data Pipelines", "MLOps", "APIs",
    "Software Development", "Analytical Skills", "Critical Thinking", "Research", 
    "Science", "Written Communication", "Git", "Version Control", "R", "tidymodels",
    "RStudio", "plumber", "vetiver", "Random Forest", "XGBoost", "Gradient Boosting", 
    "Feature Importance", "Hyperparameter Tuning", "Cross-Validation", "Model Evaluation"
  ]
    };
  }
};
</script>

<style scoped>
/* Project-specific styles only */
</style>

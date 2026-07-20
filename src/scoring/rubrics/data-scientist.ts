import { buildRubric } from "./_helpers";

export const dataScientistRubric = buildRubric("data-scientist", "Data Scientist", "mid", ["modeling", "statistics", "communication"], [
  { name: "Statistical foundations", weight: 20, description: "Hypothesis testing, experimental design, causal inference, probability.",
    scoringGuide: { 1: "Runs models without understanding assumptions.", 2: "Basic descriptive statistics.", 3: "Proper hypothesis testing, confidence intervals, A/B test design, power analysis.", 4: "Causal inference methods, Bayesian reasoning, experimental design for complex scenarios.", 5: "Advances statistical methodology. Novel experimental designs." } },
  { name: "ML & modeling", weight: 25, description: "Builds, evaluates, and deploys ML models appropriate to the problem.",
    scoringGuide: { 1: "Runs sklearn examples without understanding.", 2: "Basic classification/regression. No feature engineering.", 3: "Feature engineering, cross-validation, hyperparameter tuning, model selection with clear reasoning.", 4: "Deep learning, NLP, custom loss functions. Production ML with monitoring and retraining.", 5: "Novel model architectures. Research-level contributions. Mentors team on ML." } },
  { name: "Data wrangling & engineering", weight: 20, description: "Cleans, transforms, and prepares messy real-world data.",
    scoringGuide: { 1: "Cannot handle missing data.", 2: "Basic pandas operations.", 3: "Complex data pipelines, feature stores, handles messy real-world data at scale.", 4: "Designs data processing for TB-scale datasets. Spark, distributed computing.", 5: "Bridges DS and DE. Builds self-serve feature platforms." } },
  { name: "Business impact & communication", weight: 20, description: "Translates models into business decisions. Communicates results to non-technical stakeholders.",
    scoringGuide: { 1: "Shows accuracy metrics but no business context.", 2: "Basic presentations of results.", 3: "Connects model outputs to business KPIs. Clear visualizations. Actionable recommendations.", 4: "Shapes business strategy with data insights. Executive-level communication.", 5: "Defines how the org uses data science. Board-level impact." } },
  { name: "Code & reproducibility", weight: 15, description: "Writes production-quality code. Reproducible experiments. Version control.",
    scoringGuide: { 1: "Jupyter notebooks with no structure.", 2: "Organized notebooks but no version control.", 3: "Modular code, git, reproducible environments (Docker/conda), experiment tracking (MLflow/W&B).", 4: "Production ML code. CI/CD for models. Testing and monitoring.", 5: "ML platform contributions. Sets engineering standards for the DS team." } },
]);

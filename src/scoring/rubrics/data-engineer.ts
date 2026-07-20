import { buildRubric } from "./_helpers";

export const dataEngineerRubric = buildRubric("data-engineer", "Data Engineer", "mid", ["pipeline-design", "data-quality", "scale"], [
  { name: "Pipeline architecture", weight: 25, description: "Designs ETL/ELT pipelines, orchestration (Airflow/Dagster), batch and streaming.",
    scoringGuide: { 1: "Cannot explain ETL vs ELT.", 2: "Writes basic Python scripts to move data.", 3: "Builds orchestrated pipelines with error handling, retries, idempotency.", 4: "Designs lakehouse architectures, handles schema evolution, multi-source ingestion.", 5: "Architects enterprise data platforms. Real-time + batch hybrid systems at scale." } },
  { name: "SQL & data modeling", weight: 25, description: "Advanced SQL, dimensional modeling, star/snowflake schemas, slowly changing dimensions.",
    scoringGuide: { 1: "Basic SELECT only.", 2: "JOINs, GROUP BY, subqueries.", 3: "Window functions, CTEs, dimensional modeling. dbt proficiency.", 4: "Optimizes queries on billion-row tables. Designs data vaults. Manages complex SCD strategies.", 5: "Defines org-wide data modeling standards. Query performance guru." } },
  { name: "Cloud & infrastructure", weight: 20, description: "AWS/GCP/Azure data services, Spark, data lake/warehouse setup.",
    scoringGuide: { 1: "No cloud experience.", 2: "Uses S3/GCS for storage, basic Redshift/BigQuery queries.", 3: "Configures Glue/Dataflow, manages Spark jobs, cost-aware.", 4: "Designs multi-region data infrastructure. Optimizes Spark at TB scale.", 5: "Architects cloud data platforms used by 100+ analysts." } },
  { name: "Data quality & governance", weight: 15, description: "Data validation, lineage tracking, documentation, compliance.",
    scoringGuide: { 1: "No quality checks.", 2: "Basic row-count assertions.", 3: "Great Expectations or dbt tests. Data contracts. Lineage documentation.", 4: "Builds data quality frameworks. Implements PII detection, GDPR compliance in pipelines.", 5: "Establishes org-wide data governance. Automated anomaly detection." } },
  { name: "Collaboration & communication", weight: 15, description: "Works with analysts, scientists, and business stakeholders effectively.",
    scoringGuide: { 1: "Builds pipelines without understanding business context.", 2: "Responds to data requests but doesn't proactively engage.", 3: "Partners with analysts on requirements. Documents data models. Communicates delays early.", 4: "Shapes data strategy with business input. Mentors analysts on self-service.", 5: "Bridges technical and business. Drives data culture across the org." } },
]);

import { buildRubric } from "./_helpers";

export const devopsEngineerRubric = buildRubric("devops-engineer", "DevOps / Platform Engineer", "mid", ["infrastructure", "ci-cd", "reliability"], [
  { name: "Infrastructure as code", weight: 25, description: "Terraform/Pulumi, cloud resource management, networking, security groups.",
    scoringGuide: { 1: "Click-ops only. No IaC experience.", 2: "Basic Terraform for single resources.", 3: "Manages multi-environment IaC with modules, state management, drift detection.", 4: "Designs reusable platform modules. Multi-cloud or multi-account strategies.", 5: "Builds internal developer platforms. Infrastructure abstraction layers." } },
  { name: "CI/CD & automation", weight: 25, description: "Pipeline design, build optimization, deployment strategies, GitOps.",
    scoringGuide: { 1: "Manual deployments.", 2: "Basic CI with lint + test.", 3: "Multi-stage pipelines, caching, parallel jobs, rollback strategies.", 4: "Canary/blue-green deployments, feature flags, progressive delivery.", 5: "Builds CI/CD platforms used across the org. Sub-minute deployments." } },
  { name: "Containers & orchestration", weight: 20, description: "Docker, Kubernetes, service mesh, resource management.",
    scoringGuide: { 1: "Cannot write a Dockerfile.", 2: "Basic Docker builds and docker-compose.", 3: "K8s deployments, services, config maps, HPA. Helm charts.", 4: "Designs K8s architectures, implements service mesh, manages multi-cluster.", 5: "K8s platform engineering. Custom operators, admission controllers." } },
  { name: "Monitoring & incident response", weight: 20, description: "Observability stack, alerting, on-call, postmortems.",
    scoringGuide: { 1: "No monitoring.", 2: "Basic uptime checks.", 3: "Prometheus/Grafana, structured logging, PagerDuty integration, runbooks.", 4: "Distributed tracing, SLO-based alerting, chaos engineering.", 5: "Builds observability platforms. Defines reliability standards org-wide." } },
  { name: "Security & compliance", weight: 10, description: "Secrets management, network security, compliance automation.",
    scoringGuide: { 1: "Hardcoded secrets.", 2: "Uses Vault/SOPS for secrets.", 3: "Network policies, IAM least-privilege, vulnerability scanning in CI.", 4: "SOC2/ISO27001 automation, supply chain security, zero-trust networking.", 5: "Designs security architecture for regulated industries." } },
]);

import { Rubric } from "../../types";

export const backendDeveloperRubric: Rubric = {
  id: "backend-developer",
  role: "Backend Developer",
  level: "mid",
  totalWeight: 100,
  metadata: { priorities: ["system-design", "api-design", "reliability"], createdAt: "2026-07-16" },
  dimensions: [
    {
      id: "system-design", name: "System design & architecture", weight: 25,
      description: "Designs scalable services, makes appropriate technology choices, understands distributed system tradeoffs.",
      scoringGuide: {
        1: "Cannot discuss database choices beyond 'we use Postgres'. No understanding of scaling patterns.",
        2: "Basic MVC understanding. Can build simple CRUD APIs but no awareness of caching, queuing, or service boundaries.",
        3: "Designs multi-service systems. Understands caching layers, message queues, database indexing. Makes reasonable tradeoff decisions.",
        4: "Architects systems handling 10K+ RPS. Designs for fault tolerance, data consistency, and graceful degradation. Evaluates build-vs-buy rigorously.",
        5: "Designs platform-level infrastructure. Published architecture decision records. Handles complex distributed system challenges (consensus, partitioning, CQRS).",
      },
    },
    {
      id: "api-design", name: "API design & contracts", weight: 20,
      description: "Designs clean, versioned, well-documented APIs. Understands REST conventions, GraphQL tradeoffs, and API lifecycle.",
      scoringGuide: {
        1: "Inconsistent endpoints. No versioning. Exposes internal implementation details.",
        2: "Basic REST with CRUD routes. No pagination, filtering, or proper error responses.",
        3: "Clean RESTful APIs with proper status codes, pagination, filtering. OpenAPI specs. Understands backwards compatibility.",
        4: "Designs APIs consumed by multiple teams. Implements rate limiting, auth middleware, API gateways. Strong versioning strategy.",
        5: "Defines org-wide API standards. Evaluates REST vs GraphQL vs gRPC for specific use cases. Designs developer-facing APIs with excellent DX.",
      },
    },
    {
      id: "database", name: "Database & data modeling", weight: 20,
      description: "Designs schemas, writes efficient queries, understands indexing, migrations, and data lifecycle.",
      scoringGuide: {
        1: "Cannot write SQL beyond basic SELECT. No understanding of normalization or indexing.",
        2: "Creates simple schemas. Basic JOIN queries. No migration strategy or performance awareness.",
        3: "Designs normalized schemas with proper indexes. Writes efficient queries. Handles migrations safely. Familiar with SQL and at least one NoSQL database.",
        4: "Optimizes query performance at scale. Implements read replicas, sharding strategies, connection pooling. Designs for data integrity across services.",
        5: "Architects multi-database strategies (OLTP + OLAP). Handles data migration across large datasets with zero downtime. Deep understanding of database internals.",
      },
    },
    {
      id: "reliability", name: "Reliability & observability", weight: 15,
      description: "Writes code that handles failures gracefully. Implements logging, monitoring, alerting, and on-call practices.",
      scoringGuide: {
        1: "No error handling. Console.log for debugging. No awareness of monitoring.",
        2: "Basic try/catch. Some logging but unstructured. No monitoring setup.",
        3: "Structured logging, health checks, basic alerting. Handles timeouts and retries. Writes defensive code for external dependencies.",
        4: "Implements SLOs/SLIs, distributed tracing, custom dashboards. Designs circuit breakers and bulkhead patterns. Runs blameless postmortems.",
        5: "Builds observability platforms. Achieves 99.9%+ availability targets. Establishes reliability culture and on-call best practices org-wide.",
      },
    },
    {
      id: "security", name: "Security awareness", weight: 10,
      description: "Understands common vulnerabilities and writes secure code by default.",
      scoringGuide: {
        1: "Stores passwords in plaintext. No awareness of OWASP top 10.",
        2: "Uses bcrypt for passwords. Basic input validation. No understanding of auth flows.",
        3: "Implements OAuth2/JWT properly. SQL injection prevention. CORS configuration. Secrets management.",
        4: "Conducts threat modeling. Implements RBAC/ABAC. Handles PII and compliance (GDPR/SOC2) requirements in code.",
        5: "Designs security architecture. Penetration testing experience. Establishes org-wide security practices and training.",
      },
    },
    {
      id: "testing-ci", name: "Testing & CI/CD", weight: 10,
      description: "Writes comprehensive tests and maintains deployment pipelines.",
      scoringGuide: {
        1: "No tests. Manual deployments.",
        2: "Some unit tests. Basic CI pipeline exists but fragile.",
        3: "Unit + integration tests. Reliable CI/CD pipeline. Database test fixtures. Code coverage tracking.",
        4: "Contract testing, load testing, chaos engineering. Blue-green or canary deployments. Fast, reliable pipelines.",
        5: "Designs testing strategies for complex distributed systems. Builds deployment infrastructure used by multiple teams.",
      },
    },
  ],
};

import { Rubric } from "../../types";

export const frontendDeveloperRubric: Rubric = {
  id: "frontend-developer",
  role: "Frontend Developer",
  level: "mid",
  totalWeight: 100,
  metadata: {
    priorities: ["react-next", "ui-craft", "performance"],
    createdAt: "2026-07-16",
  },
  dimensions: [
    {
      id: "framework-mastery",
      name: "React / Next.js mastery",
      description:
        "Deep understanding of React component patterns, hooks, state management, SSR/SSG in Next.js. Not just usage — understanding of why and when.",
      weight: 25,
      scoringGuide: {
        1: "Knows basic JSX. Cannot explain useEffect cleanup or when to use useRef vs useState.",
        2: "Builds simple components. Uses useState/useEffect. Copy-pastes patterns without understanding rendering behavior.",
        3: "Comfortable with custom hooks, context, memoization. Understands client vs server components in Next.js App Router. Can debug re-render issues.",
        4: "Designs component architectures for complex apps. Optimizes bundle size, implements code splitting. Deep understanding of React reconciliation and fiber.",
        5: "Contributes to React ecosystem. Implements complex patterns (compound components, render props for edge cases). Can evaluate and migrate between state management approaches with clear tradeoff reasoning.",
      },
    },
    {
      id: "css-ui-craft",
      name: "CSS & UI implementation craft",
      description:
        "Can translate designs to pixel-perfect, responsive implementations. Understands CSS deeply — not just Tailwind class memorization.",
      weight: 20,
      scoringGuide: {
        1: "Relies entirely on component libraries. Cannot write custom CSS layouts.",
        2: "Basic flexbox/grid. Struggles with responsive design or complex layouts. Over-relies on absolute positioning.",
        3: "Strong responsive design. Comfortable with Tailwind AND raw CSS. Handles animations, transitions. Consistent spacing and typography.",
        4: "Creates design system components. Understands CSS specificity, cascade, custom properties deeply. Implements complex animations (framer-motion, CSS keyframes).",
        5: "Builds production design systems from scratch. Handles RTL, accessibility, dark mode, print styles. CSS architecture that scales across large teams.",
      },
    },
    {
      id: "typescript-quality",
      name: "TypeScript & code quality",
      description:
        "Uses TypeScript effectively beyond basic annotations. Writes maintainable, testable code with appropriate abstractions.",
      weight: 20,
      scoringGuide: {
        1: "Uses 'any' everywhere. No understanding of generics or utility types.",
        2: "Basic type annotations. Interfaces for props. Doesn't leverage discriminated unions or conditional types.",
        3: "Good use of generics, utility types, proper error handling. Code is readable with clear naming. Writes unit tests.",
        4: "Advanced patterns — mapped types, template literals, proper type narrowing. Strong testing culture (unit + integration + e2e). Refactors proactively.",
        5: "Designs type-safe APIs that prevent misuse at compile time. Mentors team on TypeScript patterns. Architecture-level code quality contributions.",
      },
    },
    {
      id: "performance",
      name: "Performance & web vitals",
      description:
        "Understands Core Web Vitals, bundle optimization, lazy loading, image optimization. Can diagnose and fix performance bottlenecks.",
      weight: 15,
      scoringGuide: {
        1: "No awareness of performance. Ships 5MB bundles without concern.",
        2: "Knows Lighthouse exists. Basic image optimization. Cannot diagnose layout shifts or long tasks.",
        3: "Monitors CWV. Implements lazy loading, code splitting, image formats (WebP/AVIF). Uses React.memo and useMemo appropriately.",
        4: "Profiles and optimizes render performance. Understands HTTP/2 priorities, prefetching strategies, service workers. Reduces LCP/CLS measurably.",
        5: "Architects for performance from day one. Implements streaming SSR, partial hydration, edge rendering. Published performance case studies.",
      },
    },
    {
      id: "api-data",
      name: "API integration & data handling",
      description:
        "Works effectively with REST/GraphQL APIs. Manages client-side state, caching, optimistic updates, and error states.",
      weight: 10,
      scoringGuide: {
        1: "Basic fetch calls with no error handling. No loading states.",
        2: "Uses Axios or fetch with try/catch. Basic loading/error states. No caching strategy.",
        3: "Proficient with React Query/SWR or Apollo. Implements optimistic updates, proper cache invalidation, retry logic.",
        4: "Designs API layers with proper abstraction. Handles offline-first, pagination, real-time subscriptions. Coordinates complex multi-API data flows.",
        5: "Builds full-stack type-safe APIs (tRPC, GraphQL code-gen). Designs data fetching patterns that scale across large applications.",
      },
    },
    {
      id: "collaboration",
      name: "Collaboration & ownership",
      description:
        "Works well with designers, backend engineers, and product. Takes ownership of features end-to-end. Communicates blockers early.",
      weight: 10,
      scoringGuide: {
        1: "Waits for detailed specs. Never pushes back on designs or asks clarifying questions.",
        2: "Executes assigned tasks. Occasionally asks questions. Limited initiative.",
        3: "Collaborates with design on feasibility. Raises edge cases. Reviews teammates' PRs thoughtfully. Documents their work.",
        4: "Drives features from spec to shipped. Proactively identifies UX improvements. Mentors junior developers. Cross-functional influence.",
        5: "Shapes product direction from frontend perspective. Establishes team patterns and culture. Trusted by product and design as a partner, not just an implementer.",
      },
    },
  ],
};

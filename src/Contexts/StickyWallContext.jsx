import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../CustomHooks/useLocalStorage";
const StickyContext = createContext([]);
export const StickyWallprovider = ({ children }) => {
  const [storedValues, setStoredValues] = useLocalStorage("sticky");
  const [stickyWalls, setStickyWalls] = useState(() => {
    const hasSeenExamples = localStorage.getItem("hasSeenExamplesSticky");
    if (!hasSeenExamples) {
      localStorage.setItem("hasSeenExamplesSticky", "true");
      const exampleStickies = [
        {
          id: crypto.randomUUID(),
          stickyName: "Ideas Board",
          time: new Date().toLocaleString(),
          location: "Creative Space",
          notes: [
            {
              id: crypto.randomUUID(),
              title: "New Feature",
              details:
                "Implement dark mode for better UX at night. Users have requested this feature multiple times. Need to: 1) Create dark theme color palette, 2) Add toggle switch in settings, 3) Persist preference in localStorage, 4) Test across all pages and components for consistency.",
              bgColor: "bg-[#98A7FD]",
            },
            {
              id: crypto.randomUUID(),
              title: "Bug Fix",
              details:
                "Fix responsive design issues on mobile devices. Current issues: Navigation menu overlaps content on small screens, form inputs are too small, images don't scale properly. Priority: High. Estimate: 2-3 hours. Test on iPhone, Android, and tablet sizes.",
              bgColor: "bg-[#FFB1B3]",
            },
            {
              id: crypto.randomUUID(),
              title: "Performance",
              details:
                "Optimize app performance and loading times. Ideas: Implement code splitting, lazy load images, minify CSS/JS, add caching strategy, use CDN for static assets. Current Lighthouse score: 65. Target: 90+. Check bundle size with webpack-bundle-analyzer.",
              bgColor: "bg-[#AAFFBA]",
            },
            {
              id: crypto.randomUUID(),
              title: "User Feedback",
              details:
                "Implement user feedback system to gather insights. Add feedback button in app header, create survey forms for feature requests, set up analytics to track user behavior. Use tools like Hotjar or Google Analytics. Schedule monthly review meetings to analyze feedback and prioritize improvements. Build feedback loop into development cycle.",
              bgColor: "bg-[#FFE5B4]",
            },
            {
              id: crypto.randomUUID(),
              title: "Security Audit",
              details:
                "Conduct comprehensive security review of the application. Check for SQL injection vulnerabilities, XSS attacks, CSRF protection. Review authentication and authorization logic. Ensure sensitive data is encrypted. Update dependencies to patch known vulnerabilities. Schedule penetration testing with security experts. Implement security headers and HTTPS everywhere.",
              bgColor: "bg-[#FFB3BA]",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          stickyName: "Quick Notes",
          time: new Date().toLocaleString(),
          location: "Workspace",
          notes: [
            {
              id: crypto.randomUUID(),
              title: "Remember",
              details:
                "Follow up with the client tomorrow to discuss project requirements and timeline. Key points to cover: Q1 deliverables, budget review, team assignments, and next sprint planning. Prepare slides showcasing previous work and mockups. Confirm meeting time and attendees by EOD today.",
              bgColor: "bg-[#FDF2B3]",
            },
            {
              id: crypto.randomUUID(),
              title: "Notes",
              details:
                "Establish code review standards for the team. Everyone should follow consistent naming conventions, add comments for complex logic, write unit tests for new features, and ensure no console errors before committing. Setup pre-commit hooks to enforce linting rules automatically.",
              bgColor: "bg-[#FFD4A9]",
            },
            {
              id: crypto.randomUUID(),
              title: "Reminder",
              details:
                "Schedule quarterly team building activities to improve morale and collaboration. Ideas: Virtual escape room, online game tournament, lunch and learn sessions, skill sharing workshops. Budget: $500 per quarter. Get feedback from team on preferred activities. Coordinate with HR for scheduling.",
              bgColor: "bg-[#D4C5F9]",
            },
            {
              id: crypto.randomUUID(),
              title: "Documentation",
              details:
                "Update project documentation and README files. Document API endpoints with request/response examples. Create setup guides for local development. Write user guides for key features. Keep architecture diagrams current. Add inline code comments for complex logic. Use JSDoc for function documentation. Host docs on wiki or GitHub Pages.",
              bgColor: "bg-[#BAFFC9]",
            },
            {
              id: crypto.randomUUID(),
              title: "Testing",
              details:
                "Improve test coverage across the application. Write unit tests for critical business logic. Add integration tests for API endpoints. Create end-to-end tests for user workflows. Aim for 80% code coverage. Set up continuous integration to run tests automatically. Fix flaky tests and improve test reliability. Use Jest, React Testing Library, and Cypress.",
              bgColor: "bg-[#BAE1FF]",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          stickyName: "Development Tasks",
          time: new Date().toLocaleString(),
          location: "Dev Team",
          notes: [
            {
              id: crypto.randomUUID(),
              title: "Refactoring",
              details:
                "Clean up legacy code and improve code quality. Remove duplicate code, simplify complex functions, improve variable naming. Apply SOLID principles and design patterns where appropriate. Update outdated dependencies. Break large components into smaller, reusable pieces. Improve error handling and logging throughout the codebase.",
              bgColor: "bg-[#E0BBE4]",
            },
            {
              id: crypto.randomUUID(),
              title: "API Integration",
              details:
                "Integrate third-party APIs for enhanced functionality. Connect payment gateway, email service, cloud storage, and analytics APIs. Implement proper error handling and retry logic. Add API response caching for better performance. Write integration tests. Document API endpoints and authentication methods. Handle rate limiting appropriately.",
              bgColor: "bg-[#FFDFD3]",
            },
            {
              id: crypto.randomUUID(),
              title: "Accessibility",
              details:
                "Improve application accessibility for all users. Add ARIA labels, ensure keyboard navigation works everywhere, improve color contrast ratios, add alt text to images. Test with screen readers. Follow WCAG 2.1 guidelines. Create accessible forms with proper labels and error messages. Support reduced motion preferences.",
              bgColor: "bg-[#C7CEEA]",
            },
            {
              id: crypto.randomUUID(),
              title: "Monitoring",
              details:
                "Set up comprehensive application monitoring and logging. Implement error tracking with Sentry or similar tool. Add performance monitoring for slow queries and pages. Create custom dashboards for key metrics. Set up alerts for critical errors and downtime. Log user actions for analytics. Monitor server resources and database performance.",
              bgColor: "bg-[#B5EAD7]",
            },
            {
              id: crypto.randomUUID(),
              title: "Deployment",
              details:
                "Automate deployment pipeline for faster releases. Set up CI/CD with GitHub Actions or Jenkins. Create automated build and test processes. Implement blue-green deployment strategy. Configure automatic rollback on failures. Add deployment notifications to team chat. Document deployment procedures and runbooks for on-call engineers.",
              bgColor: "bg-[#FFD9E8]",
            },
          ],
        },
      ];
      setStoredValues(exampleStickies);
      return exampleStickies;
    }

    return storedValues;
  });

  // Save to localStorage when stickyWalls changes
  useEffect(() => {
    setStoredValues(stickyWalls);
  }, [stickyWalls, setStoredValues]);

  return (
    <StickyContext.Provider value={{ stickyWalls, setStickyWalls }}>
      {children}
    </StickyContext.Provider>
  );
};

// eslint-disable-next-line
export const useStickyWalls = () => useContext(StickyContext);

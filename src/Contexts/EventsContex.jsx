import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../CustomHooks/useLocalStorage";

const TasksContext = createContext([]);

export const EventsProvider = ({ children }) => {
  const [storedValues, setStoredValues] = useLocalStorage("events");
  const [eventsAndTasks, setEventsAndTasks] = useState(() => {
    const hasSeenExamples = localStorage.getItem("hasSeenExamplesEvents");
    if (!hasSeenExamples) {
      localStorage.setItem("hasSeenExamplesEvents", "true");
      const exampleEvents = [
        {
          id: crypto.randomUUID(),
          Name: "Project Planning",
          time: new Date().toLocaleString(),
          location: "Conference Room",
          Tasks: [
            {
              id: crypto.randomUUID(),
              TaskName: "Define project scope",
              Notes:
                "Outline the key objectives and deliverables for the entire project. Create a comprehensive scope document that includes: project goals, success criteria, target audience, features to be built, and features explicitly not included (out of scope). This prevents scope creep later. Include timeline estimates and resource requirements.",
              priority: "Urgent",
            },
            {
              id: crypto.randomUUID(),
              TaskName: "Create timeline",
              Notes:
                "Set milestones and deadlines for all phases of the project. Break down into: Planning phase (1 week), Design phase (2 weeks), Development phase (4 weeks), Testing phase (1 week), Deployment (3 days). Define critical path items and dependencies. Schedule team meetings and client checkpoints. Create Gantt chart for visualization.",
              priority: "Urgent",
            },
            {
              id: crypto.randomUUID(),
              TaskName: "Assign team roles",
              Notes:
                "Distribute responsibilities among team members based on expertise and availability. Assign: Project Manager (oversee progress), Lead Developer (architecture decisions), Frontend Developer (UI implementation), Backend Developer (API development), QA Engineer (testing), and Designer (mockups/branding). Ensure everyone understands their role and expectations.",
              priority: "NotUrgent",
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          Name: "Team Meeting",
          time: new Date().toLocaleString(),
          location: "Virtual",
          Tasks: [
            {
              id: crypto.randomUUID(),
              TaskName: "Prepare agenda",
              Notes:
                "Gather topics from team members and organize for the upcoming meeting. Include: progress updates on current tasks, blockers and challenges, upcoming sprint planning, team feedback, policy changes, and open discussion time. Share agenda with attendees 24 hours before meeting. Estimate: 90 minutes total meeting time.",
              priority: "NotUrgent",
            },
            {
              id: crypto.randomUUID(),
              TaskName: "Review sprint goals",
              Notes:
                "Analyze current sprint progress and identify completed items versus outstanding work. Check burndown chart, discuss velocity, and adjust next sprint capacity if needed. Celebrate completed work and address any blockers preventing progress. Ensure all team members are aligned on priorities for the upcoming week.",
              priority: "CanWait",
            },
            {
              id: crypto.randomUUID(),
              TaskName: "Document action items",
              Notes:
                "Record all decisions made and tasks assigned during the meeting. Create follow-up tickets in project management system. Send meeting notes to all attendees within 2 hours of meeting completion. Track action items and ensure accountability by assigning owners and due dates to each task.",
              priority: "NotUrgent",
            },
            {
              id: crypto.randomUUID(),
              TaskName: "Discuss technical challenges",
              Notes:
                "Review current blockers and technical debt. Team members share challenges they're facing and brainstorm solutions together. Discuss architectural decisions, library choices, and best practices. Allocate time for pair programming sessions if needed. Create technical spikes for complex problems that need research before implementation.",
              priority: "Urgent",
            },
          ],
        },
  
      ];
      setStoredValues(exampleEvents);
      return exampleEvents;
    }
    return storedValues;
  });

  // Sync eventsAndTasks changes back to localStorage
  useEffect(() => {
    setStoredValues(eventsAndTasks);
  }, [eventsAndTasks, setStoredValues]);

  return (
    <TasksContext.Provider value={{ eventsAndTasks, setEventsAndTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

// eslint-disable-next-line
export const useEventsAndTasks = () => useContext(TasksContext);

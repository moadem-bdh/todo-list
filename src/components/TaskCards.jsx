import { useEventsAndTasks } from "../Contexts/EventsContex";
import TaskCard from "./TaskCard";
import { useLocation, useNavigate, useParams } from "react-router";
import { AnimatePresence } from "framer-motion";

export default function TaskCards({ priority }) {
  const { eventsAndTasks } = useEventsAndTasks();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentEvent = eventsAndTasks.find((task) => task.id == eventId);
  console.log(priority);
  if (!currentEvent || !currentEvent.Tasks || currentEvent.Tasks.length === 0) {
    return (
      <section className="w-full flex flex-col items-center justify-center min-h-[40vh] gap-4 px-4 text-center">
        <p className="text-base sm:text-lg text-[#2F090B] font-poppins font-semibold">
          No tasks yet. Add your first task to get started.
        </p>
        <button
          type="button"
          onClick={() =>
            navigate(`/events/${eventId}/task/new`, {
              state: { bgLocation: location },
            })
          }
          className="px-5 sm:px-6 py-3 bg-[#D7303A] text-white font-semibold font-poppins rounded-xl hover:bg-[#b32530] transition-colors"
        >
          Add New Task
        </button>
      </section>
    );
  }

  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(310px,1fr))] gap-x-4 gap-y-6 sm:gap-y-8 items-start">
      <AnimatePresence initial={false}>
        {currentEvent.Tasks.map((task) => {
          if (priority == "All Tasks") {
            return (
              <TaskCard
                key={task.id}
                id={task.id}
                TaskName={task.TaskName}
                Notes={task.Notes}
                Priority={task.priority}
              />
            );
          }

          if (priority == task.priority)
            return (
              <TaskCard
                key={task.id}
                id={task.id}
                TaskName={task.TaskName}
                Notes={task.Notes}
                Priority={task.priority}
              />
            );
        })}
      </AnimatePresence>
    </section>
  );
}

import { useEventsAndTasks } from "../Contexts/EventsContex";
import TaskCard from "./TaskCard";
import { useParams } from "react-router";

export default function TaskCards({priority}) {
  const { eventsAndTasks } = useEventsAndTasks();
  const { eventId } = useParams();
  const currentEvent = eventsAndTasks.find((task) => task.id == eventId);
  console.log(priority)
  return (
    <section className=" w-full grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))] gap-x-4 gap-y-8 items-start ">
      {currentEvent?.Tasks.map((task) => {
     
     if(priority == "All Tasks"){ return     <TaskCard
          key={task.id}
          id = {task.id}
          TaskName={task.TaskName}
          Notes={task.Notes}
          Priority={task.priority}
        />  } 

    if(priority == task.priority)


return  <TaskCard
          key={task.id}
          id = {task.id}
          TaskName={task.TaskName}
          Notes={task.Notes}
          Priority={task.priority}
        />
      


      }
      
      
     )}
    </section>
  );
}

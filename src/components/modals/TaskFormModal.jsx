import { useState } from "react";
import Close from "../../assets/close.svg";
import { useEventsAndTasks } from "../../Contexts/EventsContex";
import { useForm } from "../../CustomHooks/useForm";
import DropDown from "../DropDown";
import { useNavigate, useParams } from "react-router";

export default function TaskFormModal({ isEdit }) {
  const { setEventsAndTasks, eventsAndTasks } = useEventsAndTasks();
  const title = isEdit ? "Edit Task" : "Add New Task";
  const { eventId, taskId } = useParams();
  const currentTask = eventsAndTasks
    .find((event) => event.id == eventId)
    ?.Tasks.find((task) => task.id == taskId);

  const [newTask, setNewTask, resetNewTask, basedSetNewTask] = useForm({
    TaskName: isEdit ? currentTask.TaskName : "",
    Notes: isEdit ? currentTask.Notes : "",
    priority: isEdit ? currentTask.priority : "Priority",
    id: isEdit ? currentTask.id : 0,
  });
  const [isError, setIsError] = useState(false);
  const onDropDownChange = (value) => {
    basedSetNewTask((prev) => ({ ...prev, priority: value }));
  };

  const addTask = (task) => {
    setEventsAndTasks((prev) => {
      const updateds = [...prev];
      const currentEvent = updateds.find((event) => event.id == eventId);
      const updated = { ...currentEvent, Tasks: [...currentEvent.Tasks, task] };
      const lastEvents = updateds.map((event) =>
        event.id != eventId ? event : updated
      );
      return lastEvents;
    });
  };

  const editTask = (editedTask) => {
    setEventsAndTasks((prev) => {
      const copiedList = [...prev];
      const copiedevent = {
        ...copiedList.find((event) => event.id == eventId),
        Tasks: copiedList
          .find((event) => event.id == eventId)
          .Tasks.map((task) => (task.id == taskId ? editedTask : task)),
      };

      return copiedList.map((event) =>
        event.id == eventId ? copiedevent : event
      );
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimForm = {
      ...newTask,
      TaskName: newTask.TaskName.trim(),
      Notes: newTask.Notes.trim(),
      ...(!isEdit && { id: crypto.randomUUID() }),
    };

    if (
      !trimForm.TaskName ||
      !trimForm.Notes ||
      trimForm.priority === "Priority"
    ) {
      setIsError(true);
    } else {
      setIsError(false);
      isEdit ? editTask(trimForm) : addTask(trimForm);
      navigate(-1);
    }
  };

  return (
    <div className=" fixed inset-0 min-h-max z-50 h-screen flex items-center justify-center bg-black/40">
      <div className="bg-white my-8 rounded-[20px] w-2/5 min-w-120 max-w-95/100 py-6  shadow-lg max-h-[90vh] flex flex-col">
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-red-500/30 px-6 scrollbar-track-transparent hover:scrollbar-thumb-red-600/50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold font-poppins text-[#D7303A]">
              {title}
            </h2>
            <button
              onClick={() => navigate(-1)}
              className="p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-colors "
            >
              <img src={Close} alt="Close" className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
                  Task Name
                </label>
                <input
                  autoFocus
                  onChange={(e) => setNewTask(e)}
                  value={newTask.TaskName}
                  type="text"
                  name="TaskName"
                  className="w-full px-4 py-2 border-2 border-[#FF8F8F] rounded-xl focus:outline-none focus:border-[#D7303A] font-poppins"
                  placeholder="Enter task name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
                  Priority
                </label>

                <DropDown
                  onChange={onDropDownChange}
                  value={newTask.priority}
                  width="w-full"
                  height="h-11"
                  FirstLabel="Priority"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 font-poppins">
                  Notes
                </label>
                <textarea
                  value={newTask.Notes}
                  name="Notes"
                  onChange={(e) => setNewTask(e)}
                  className="w-full px-4 scrollbar-thin scrollbar-thumb-[#FF8F8F]  scrollbar-track-transparent py-2 border-2 border-[#FF8F8F] rounded-xl focus:outline-none focus:border-[#D7303A] font-poppins min-h-[100px] resize-none"
                  placeholder="Add your notes here..."
                />
              </div>
            </div>
            <div className=" h-6 pl-4">
              {isError && (
                <p className=" text-sm text-red-600 font-semibold font-poppins ">
                  All fields must be filled
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                  resetNewTask();
                }}
                className="px-6 py-2 rounded-xl bg-white border-2 border-[#D7303A] text-[#D7303A] font-semibold font-poppins hover:bg-[#FFF0F0] transition-colors"
              >
                Cancel
              </button>
              <button className="px-6 py-2 rounded-xl bg-[#D7303A] text-white font-semibold font-poppins hover:bg-[#b32530] transition-colors">
                {isEdit ? "Save Changes" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

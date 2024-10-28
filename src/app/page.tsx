import AddTask from "@/components/Tasks/AddTask/AddTask";
import UserWelcome from "@/components/UserWelcome/UserWelcome";
import TaskItem from "@/components/Tasks/TaskItem/TaskItem";

export default function Home() {
  return (
    <>
      <div className="py-10 px-20 space-y-5 h-full">
        <UserWelcome />
        <TaskItem />
      </div>
      <AddTask />
    </>
  );
}

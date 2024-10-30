import AddTask from "@/components/Tasks/AddTask";
import AllTasks from "@/components/Tasks/AllTasks";
import UserWelcome from "@/components/UserWelcome/UserWelcome";

export default function Home() {
  return (
    <>
      <div className="py-6 px-4 xs:px-2 sm:px-4 md:px-10 lg:px-20 space-y-5 h-full">
        <UserWelcome />
    <p className='font-bold text-center pt-2 text-[25px]'>All Tasks</p>
        
        <AllTasks />
      </div>
      <AddTask />
    </>
  );
}
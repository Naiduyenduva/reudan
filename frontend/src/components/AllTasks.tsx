import { useTask } from "./TaskProvide";
import CreateTask from "./CreateTask";
import TaskItem from "./TaskItem";
import UpdateTask from "./UpdateTask";

export interface taskProps {
    id: number,
    title: string,
    description: string,
    status: boolean
}
const AllTasks = () => {
    const { tasks, isopen, setIsopen, istrue, updateTaskId } = useTask();
    console.log(tasks)
    
    return <div className="w-96 border border-slate-400 m-5 p-3 rounded-lg">
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-10">All Tasks</h1>
            <button onClick={()=>setIsopen(true)} className="cursor-pointer bg-blue-500 p-1 rounded-lg h-8 text-white">add content</button>
        </div>
        {
            isopen && <CreateTask  />
        }
        {
            istrue && updateTaskId !== null && <UpdateTask />
        }
        {
            tasks.map((task:taskProps)=> (
                <TaskItem key={task.id} task={task} />
            ))
        }
    </div>
}
export default AllTasks;
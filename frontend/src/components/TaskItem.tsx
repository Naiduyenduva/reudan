import Dot from "../icons/Dot";
import { useTask } from "./TaskProvide";
import { taskProps } from "./AllTasks";

interface TaskItemProps {
    task: taskProps;
 }
const TaskItem = ({task}:TaskItemProps) => {
    const { deleteTask, setIstrue, setUpdateTaskId } = useTask();

    return (    
        <div>
            <div className="flex justify-between gap-5 bg-white p-3 mb-2 w-[360px] h-[103px] border border-slate-400 rounded-lg">
                <div className="grid">
                    <h2 className="text-xl">{task.title}</h2>
                    <h2 className="text-gray-700 text-sm">{task.description}</h2>
                </div>
                <div className="">
                    <div className="flex gap-2">    
                        <button onClick={()=>deleteTask(task.id)} className="bg-red-600 p-1 rounded-lg h-fit text-white">delete</button>
                        <button onClick={() => { setIstrue(true); setUpdateTaskId(task.id); }} className="bg-blue-500 p-1 rounded-lg h-fit text-white">update</button>
                    </div>
                    <div className="flex items-center mt-1">
                        <Dot color={task.status ? "green" : "orange"} size={8} />
                        <h1 className="text-md">{task.status ? "Completed" : "Pending"}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TaskItem;
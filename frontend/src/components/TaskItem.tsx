import Dot from "../icons/Dot";
import { useTask } from "./TaskProvider";
import { taskProps } from "./AllTasks";
import { Trash2 } from 'lucide-react';
import { SquarePen } from 'lucide-react';

interface TaskItemProps {
    task: taskProps;
 }
const TaskItem = ({task}:TaskItemProps) => {
    const { deleteTask, setIstrue, setUpdateTaskId } = useTask();

    return (    
            <div className="flex justify-between gap-5 bg-white p-3 mb-2 sm:w-[470px] h-[103px] border border-slate-400 rounded-lg">
                <div className="grid">
                    <h2 className="text-lg font-semibold">{task.title}</h2>
                    <h2 className="text-gray-700 text-sm">{task.description}</h2>
                </div>
                <div className="">
                    <div className="flex gap-2">    
                        <button onClick={()=>deleteTask(task.id)} className="p-1 rounded-lg h-fit text-white cursor-pointer"><Trash2 color="red" size={20} /></button>
                        <button onClick={() => { setIstrue(true); setUpdateTaskId(task.id); }} className="p-1 rounded-lg h-fit text-white cursor-pointer"><SquarePen color="gray" size={20} /></button>
                    </div>
                    <div className="flex items-center mt-1">
                        <Dot color={task.status ? "green" : "orange"} size={8} />
                        <h1 className="text-md">{task.status ? "Completed" : "Pending"}</h1>
                    </div>
                </div>
            </div>
    )
}
export default TaskItem;
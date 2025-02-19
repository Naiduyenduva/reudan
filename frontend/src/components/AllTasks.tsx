import { useTask } from "./TaskProvider";
import CreateTask from "./CreateTask";
import TaskItem from "./TaskItem";
import UpdateTask from "./UpdateTask";
import Button from "./Button";
import { useState } from "react";

export interface taskProps {
    id: number;
    title: string;
    description: string;
    status: boolean;  // Assuming `true` means "Completed", `false` means "Pending"
}

const AllTasks = () => {
    const { isopen, setIsopen, istrue, updateTaskId } = useTask();
    const { tasks }: { tasks: taskProps[] } = useTask();

    const [search, setSearch] = useState("");
    const [filtertask, setFilterTasks] = useState("All");  // Default to showing all tasks

    // Filter tasks based on search and status
    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            filtertask === "All" || 
            (filtertask === "Completed" && task.status) || 
            (filtertask === "Pending" && !task.status);

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="sm:w-[500px] border border-slate-400 sm:m-5 p-3 rounded-lg">
            <div className="grid justify-between">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold mb-10">All Tasks</h1>
                    <Button text="Add task" onClick={()=>setIsopen(true)} />
                </div>
                <div className="flex gap-10 mb-6">  
                    <input 
                        placeholder="Search" 
                        className="sm:w-60 h-10 pl-1 bg-slate-300 outline-none rounded-lg" 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                    <select 
                        className="sm:w-40 h-10 bg-slate-300 outline-none rounded-lg"
                        onChange={(e) => setFilterTasks(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Create and Update Task Components */}
            {isopen && <CreateTask />}
            {istrue && updateTaskId !== null && <UpdateTask />}

            {/* Display Filtered Tasks */}
            {filteredTasks.length > 0 ? (
                filteredTasks.map((task: taskProps) => (
                    <TaskItem key={task.id} task={task} />
                ))
            ) : (
                <p className="text-center text-gray-500">No tasks found</p>
            )}
        </div>
    );
};

export default AllTasks;

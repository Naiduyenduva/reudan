import { useState, useEffect } from "react";
import { useTask } from "./TaskProvide";
import { CircleX } from "lucide-react";
import { taskProps } from "./AllTasks";

const UpdateTask = () => {
    const { setIstrue, updateTask, updateTaskId, tasks } = useTask();
    
    // Find the task being updated
    const taskToUpdate:taskProps | undefined = tasks.find((task:taskProps) => task.id === updateTaskId);

    // Initialize state with existing task data
    const [formData, setFormData] = useState({
        title: taskToUpdate?.title || "",
        description: taskToUpdate?.description || "",
        status: taskToUpdate?.status || false
    });

    // Sync form state when `updateTaskId` changes
    useEffect(() => {
        if (taskToUpdate) {
            setFormData({ title: taskToUpdate.title, description: taskToUpdate.description,status:taskToUpdate.status });
        }
    }, [updateTaskId, taskToUpdate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "status" ? value === "true" : value  // Convert status to boolean
        }));
    };
    

    const handleSubmit = async () => {
        if (!formData.title.trim()) {
            alert("Title can't be empty");
            return;
        }

        try {
            await updateTask(updateTaskId,formData.title,formData.description,formData.status)
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white bg-opacity-90 rounded-lg shadow-xl border border-red-900 p-6 text-center w-72">
                <div className="grid gap-4">
                    <div className="flex justify-between">
                        <h1>Update Task</h1>
                        <button onClick={() => setIstrue(false)}>
                            <CircleX />
                        </button>
                    </div>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-60 h-10 pl-1 bg-slate-300 outline-none rounded-lg"
                    />
                    <input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-60 h-10 pl-1 bg-slate-300 outline-none rounded-lg"
                    />
                    <select name="status" value={String(formData.status)} onChange={handleChange} className="w-60 h-10 bg-slate-300 outline-none rounded-lg">
                        <option value="false">Pending</option>
                        <option value="true">Completed</option>
                    </select>
                    <button onClick={handleSubmit} className="bg-blue-500 p-2 rounded-lg text-white">
                        Update Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateTask;

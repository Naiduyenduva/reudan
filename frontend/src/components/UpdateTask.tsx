import { useState, useEffect } from "react";
import { useTask } from "../context/TaskProvider";
import { CircleX } from "lucide-react";
import { taskProps } from "./AllTasks";
import Button from "./Button";

const UpdateTask = () => {
    const { setIstrue, updateTask, updateTaskId, tasks } = useTask();
    const [ errorr, setError ] = useState("");

    const taskToUpdate:taskProps | undefined = tasks.find((task:taskProps) => task.id === updateTaskId);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
    
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "status" ? value === "true" : value  // Convert status to boolean
        }));
    };
    

    const handleSubmit = async () => {
        if (!formData.title.trim()) {
            setError("title can't be empty")
            return;
        }

        try {
            await updateTask(updateTaskId,formData.title,formData.description,formData.status)
            alert("task updated successfully")
        } catch (error) {
            console.error("Error updating task:", error);
            setError("Error updating task")
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white bg-opacity-90 rounded-lg shadow-xl border border-red-900 sm:p-6 p-2 text-center w-72">
                <h1 className="text-red-600">{errorr}</h1>
                <div className="grid gap-4">
                    <div className="flex justify-between">
                        <h1>Update Task</h1>
                        <button className="cursor-pointer" onClick={() => setIstrue(false)}>
                            <CircleX />
                        </button>
                    </div>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="sm:w-60 h-10 pl-1 bg-slate-300 outline-none rounded-lg"
                    />
                    <textarea 
                    name="description" 
                    value={formData.description} 
                    placeholder="description" 
                    className="h-16 pl-1 bg-slate-300 outline-none rounded-lg" 
                    onChange={handleChange}
                    ></textarea>

                    <select name="status" value={String(formData.status)} onChange={handleChange} className="sm:w-60 h-10 bg-slate-300 outline-none rounded-lg">
                        <option value="false">Pending</option>
                        <option value="true">Completed</option>
                    </select>
                    <Button text="Update Task" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default UpdateTask;

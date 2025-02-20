import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { taskProps } from "./AllTasks";

const TaskContext = createContext<any>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<taskProps[]>([]);
    const [isopen, setIsopen] = useState(false);
    const [istrue, setIstrue] = useState(false);
    const [updateTaskId, setUpdateTaskId] = useState<number | null>(null);

    async function fetchAllTasks() {
        const response = await axios.get("https://reudanproject-60037710589.development.catalystserverless.in/server/backend/all");
        setTasks(response.data.data);
    }

    async function createTask(title: string, description: string) {
        await axios.post("https://reudanproject-60037710589.development.catalystserverless.in/server/backend/add", { title, description });
        fetchAllTasks();
    }

    async function updateTask(id: number, title: string, description: string,status:boolean) {
        await axios.put(`https://reudanproject-60037710589.development.catalystserverless.in/server/backend/${id}`, { title, description,status });
        fetchAllTasks();
        setIstrue(false);
    }

    async function deleteTask(id: number) {
        await axios.delete(`https://reudanproject-60037710589.development.catalystserverless.in/server/backend/${id}`);
        fetchAllTasks();
    }

    useEffect(() => {
        fetchAllTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ 
            tasks, fetchAllTasks, createTask, updateTask, deleteTask,
            isopen, setIsopen, istrue, setIstrue, updateTaskId, setUpdateTaskId
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => useContext(TaskContext);

import axios from "axios";
import { useEffect, useState } from "react"


interface taskProps {
    id: number,
    title: string,
    description: string
}
const AllTasks = () => {
    const [tasks,setTasks] = useState<taskProps[]>([]);

    async function fetchAllTasks () {
        const response = await axios.get("http://localhost:3000/server/backend/all");
        setTasks(response.data.data)
    }
    useEffect(()=> {
        fetchAllTasks();
    },[]);

    async function handledelete (id:number) {
        await axios.delete(`http://localhost:3000/server/backend/${id}`)
        fetchAllTasks();
    }
    async function addTAsk () {
        await axios.delete(`http://localhost:3000/server/backend/add`)
        fetchAllTasks();
    }

    return <div>
        <h1 className="text-2xl font-bold mb-10">All Tasks</h1>
        <button className="bg-blue-600 rounded-lg p-2" onClick={addTAsk}>Add Task</button>
        {
            tasks.map((task:taskProps,index:number) => {
                return (
                    <div key={index} className="flex gap-5 bg-slate-900 p-3 w-fit h-fit mb-3 text-white rounded-lg">
                        <h2>{task.title}</h2>
                        <h2 className="text-gray-300">{task.description}</h2>
                        <button onClick={()=>handledelete(task.id)} className="bg-red-800 p-1 rounded-lg">delete</button>
                        <button className="bg-blue-800 p-1 rounded-lg">update</button>
                    </div>
                )
            })
        }
    </div>
}
export default AllTasks;
import axios from "axios";
import { useEffect, useState } from "react"
import CreateTask from "./CreateTask";

interface taskProps {
    id: number,
    title: string,
    description: string,
    status: boolean
}
const AllTasks = () => {
    const [tasks,setTasks] = useState<taskProps[]>([]);
    const [isopen,setIsopen] = useState(false)

    function handleModal () {
        setIsopen(!isopen)
    }

    async function fetchAllTasks () {
        const response = await axios.get("http://localhost:3000/server/backend/all");
        setTasks(response.data.data)
        console.log(response.data)
    }

    useEffect(()=> {
        fetchAllTasks();
    },[]);

    async function handledelete (id:number) {
        await axios.delete(`http://localhost:3000/server/backend/${id}`)
        fetchAllTasks();
    }
    
    
    return <div className="w-96 border border-slate-400 m-5 p-3 rounded-lg">
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-10">All Tasks</h1>
            <button onClick={handleModal} className="cursor-pointer bg-blue-500 p-1 rounded-lg h-8 text-white">add content</button>
        </div>
        {
            isopen && <CreateTask isopen={isopen} setIsopen={setIsopen} onclose={()=> {setIsopen(false)}} fetch={fetchAllTasks} />
        }
        {
            tasks.map((task:taskProps,index:number) => {
                return (
                    <div key={index} className="flex justify-between gap-5 bg-white p-3 mb-2 w-[360px] h-[103px] border border-slate-400 rounded-lg">
                        <div className="grid">
                            <h2 className="text-xl">{task.title}</h2>
                            <h2 className="text-gray-700 text-sm">{task.description}</h2>
                        </div>
                        <p> { task.status == false ? "Pending":"completed"}</p>
                        <div className="flex gap-2">    
                            <button onClick={()=>handledelete(task.id)} className="bg-red-600 p-1 rounded-lg h-fit text-white">delete</button>
                            <button className="bg-blue-500 p-1 rounded-lg h-fit text-white">update</button>
                        </div>
                    </div>
                )
            })
        }
    </div>
}
export default AllTasks;
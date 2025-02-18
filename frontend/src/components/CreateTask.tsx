import axios from "axios";
import { useState } from "react";
import { CircleX } from 'lucide-react';

const CreateTask = ({onclose,setIsopen,fetch}:any) => {

    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");

    async function handleSubmit () {
        try {
            if(title == "") {
                alert("title can't be empty")
            } else {

                const response = await axios.post("http://localhost:3000/server/backend/add",{
                    title,
                    description
                })
                console.log(response.data)
                fetch();
                setIsopen(false)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white bg-opacity-90 rounded-lg shadow-xl border border-red-900 p-6 text-center w-72">
                <div className="grid gap-4">
                    <div className="flex justify-between">
                        <h1>create task</h1>
                        <button onClick={onclose}><CircleX /></button>
                    </div>
                    <input placeholder="title" className="w-60 h-10 pl-1 bg-slate-300 outline-none rounded-lg" onChange={(e)=> {setTitle(e.target.value)}} />
                    <input placeholder="description" className="w-60 h-10 pl-1 bg-slate-300 outline-none rounded-lg" onChange={(e)=> {setDescription(e.target.value)}} />
                    <button onClick={handleSubmit} className="bg-blue-500 p-2 rounded-lg text-white">Add Task</button>
                </div>
            </div>
        </div> 
}

export default CreateTask;
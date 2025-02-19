import { useState } from "react";
import { CircleX } from 'lucide-react';
import { useTask } from "./TaskProvider";
import Button from "./Button";

const CreateTask = () => {
    const { createTask, setIsopen } = useTask();

    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ errorr, setError ] = useState("");

    async function handleSubmit () {
        try {
            if(title == "") {
                setError("title can't be empty")
                return;
            } 
            const response = await createTask(title,description)
            console.log(response)
            alert("task created successfully")

            setIsopen(false)
            
        } catch (error) {
            console.log(error)
            setError("Error creating task");
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white bg-opacity-90 rounded-lg shadow-xl border border-gray-900 sm:p-6 p-2 text-center w-72">
                <h1 className="text-red-600">{errorr}</h1>
                <div className="grid gap-4">
                    <div className="flex justify-between">
                        <h1>Create task</h1>
                        <button className="cursor-pointer" onClick={()=>setIsopen(false)}><CircleX /></button>
                    </div>
                    <input placeholder="title" 
                    className="h-10 pl-1 bg-slate-300 outline-none rounded-lg" 
                    onChange={(e)=> {setTitle(e.target.value)}} 
                    />
                    <textarea 
                    placeholder="description" 
                    className="h-16 pl-1 bg-slate-300 outline-none rounded-lg" 
                    onChange={(e)=> {setDescription(e.target.value)}}
                    ></textarea>
                    <Button text="Add Task" onClick={handleSubmit} />
                </div>
            </div>
        </div> 
    )
}

export default CreateTask;
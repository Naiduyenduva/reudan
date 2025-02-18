import axios from "axios";
import { useState } from "react";

const CreateTask = () => {
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");

    async function handleSubmit () {
        try {
            const response = await axios.post("http://localhost:3000/server/backend/add",{
                title,
                description
            })
            console.log(response.data)
        } catch (error) {
            console.log(error,"jhvghv")
        }
    }


    return <div>
        <h1>Hellow create task</h1>
        <input placeholder="title" onChange={(e)=> {setTitle(e.target.value)}} />
        <input placeholder="description" onChange={(e)=> {setDescription(e.target.value)}} />
        <button onClick={handleSubmit}>Submit</button>
    </div>
}

export default CreateTask;
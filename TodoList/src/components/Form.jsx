import { useState } from "react";
import { addItem } from "../reducer/todoReducer";
import { useDispatch } from "react-redux";

export const Form = ()=>{
    const dispatch = useDispatch(); 
    const addItemsLoccal=(event,{title,desc})=>{
        event.preventDefault();
        
        dispatch(addItem({title,desc}))
    }
    
    const [title,setTitle] =useState("");
    const [desc,setDesc] = useState("");
    return (<>
        <form className="flex flex-col gap-1 items-start" onSubmit={(e)=>{addItemsLoccal(e,{title,desc})}}>
            <label className="text-lg" htmlFor="title">Title</label>
            <input className="text-base focus:outline-cyan-300 w-full" name ="title" value = {title} onChange={(e)=>{setTitle(e.target.value)}} type="text" placeholder="Title"/>
            <label className="text-lg" htmlFor="desc">Description</label>
            <input className="text-base focus:outline-cyan-300  w-full" name = "desc" value = {desc} onChange={(e)=>{setDesc(e.target.value)}} type="text" placeholder="Description"/>
            <button className="bg-blue-500 min-w-36 text-center p-1 rounded text-white hover:opacity-80">
                Add Todo
            </button>
        </form>
    </>);
}
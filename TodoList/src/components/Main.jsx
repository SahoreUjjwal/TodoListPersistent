import { useEffect } from "react";
import { todoActions, todoSlector } from "../reducer/todoReducer";
import { useDispatch, useSelector } from "react-redux";

export const Main = ()=>{
    const dispatch = useDispatch();
    const items = useSelector(todoSlector);
    const actions = todoActions;
    useEffect(()=>{
        const getLists = async ()=>{
            const list = await fetch("https://jsonplaceholder.typicode.com/todos");
            const listJson =await list.json();
            dispatch(actions.setItems(listJson));
            
        }
        getLists();
      
    },[])
    return (
        <>
            <div className="mx-auto w-6/12 flex flex-col gap-2 h-3/4  overflow-auto">
                {items && items.map((item)=>(
                    <div className="min-h-16 flex flex-row justify-start p-2 items-center rounded shadow hover:bg-slate-200">
                        <span className="w-3/6">{item.title}</span>
                        <div className="w-3/6 flex flex-row justify-between">
                            <span className={item.completed?"bg-green-500 min-w-24 text-center p-1 rounded  text-white":"bg-red-500 min-w-24 text-center p-1 rounded text-white"}>{item.completed?"Completed":"Pending"}</span>
                            <button className="bg-blue-500 min-w-36 text-center p-1 rounded text-white hover:opacity-80" onClick={()=>{actions.toggle(item.id)}}>{item.completed?"Complete":"Mark incomplete"}</button>
                            <button className="bg-red-500 min-w-24 text-center p-1 rounded text-white hover:opacity-80" onClick={()=>{actions.remove(item.id)}}>Remove</button>
                        </div>
                      
                    </div>    
                ))
                }
            </div>
        </>
    )
}
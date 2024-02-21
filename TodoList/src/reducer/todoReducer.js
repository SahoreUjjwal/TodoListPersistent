import { createSlice, isPending } from "@reduxjs/toolkit";
const INITIAL_STATE = {items:[]};



const todoSlice = createSlice({
    name:"todo",
    initialState:INITIAL_STATE,
    reducers:{
        add:(state,action)=>{
            state.items = state.items.push({desc:action.payload})
        },
        toggle:(state,action)=>{
            state.items = state.items.map((itm)=>{
                if(itm.id === action.payload)
                {
                    itm.completed=!itm.completed;
                }
                return itm;
            })
        },
        remove:(state,action)=>{
            state.items = state.items.filter((item)=>{return item.id!=action.payload})
        },
        setItems:(state,action)=>{
            state.items = action.payload;
        }   
    }
})

export const todoReducer = todoSlice.reducer;
export const todoSlector= (state)=>state.items;
export const todoActions = todoSlice.actions;
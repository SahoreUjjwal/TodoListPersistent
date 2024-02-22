import { createAsyncThunk, createSlice, isPending } from "@reduxjs/toolkit";
const INITIAL_STATE = {items:[]};

export const updateItem = createAsyncThunk(
    "todo/update",
    async (args,thunkAPI)=>{
       const response= await fetch(`https://jsonplaceholder.typicode.com/posts/${args.item.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              id: args.item.id,
              title: args.item.title,
              body: args.item.body,
              userId: args.item.userId,
              completed:!args.item.completed
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
          console.log("hi",response);
        thunkAPI.dispatch(todoActions.toggle(args.item.id));
    }
)

export const removeItem = createAsyncThunk(
    "todo/remove",
    async (args,thunkAPI)=>{
        await fetch(`https://jsonplaceholder.typicode.com/posts/${args.item.id}`, {
            method: 'DELETE',
          });
        thunkAPI.dispatch(todoActions.remove(args.item.id));
    }
)

export const addItem = createAsyncThunk(
    "todo/add",
    async (args,thunkAPI)=>{
        const response =  await fetch(`https://jsonplaceholder.typicode.com/posts`,  {
            method: 'POST',
            body: JSON.stringify({
              userId:1,
              title:args.title,
              desc:args.desc,             
        }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
          const responseJson = await response.json();
        thunkAPI.dispatch(todoActions.add(responseJson));
    }
)

const todoSlice = createSlice({
    name:"todo",
    initialState:INITIAL_STATE,
    reducers:{
        add:(state,action)=>{
            state.items.push(action.payload)
        },
        toggle:(state,action)=>{
            state.items = state.items.map((itm)=>{
                console.log("1")
                if(itm.id === action.payload)
                {
                    console.log("2");
                    itm.completed=!itm.completed;
                }
                return itm;
            })
        },
        remove:(state,action)=>{
            console.log("removed");
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
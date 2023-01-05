import { createSlice } from "@reduxjs/toolkit";
import firebaseApp from '../Firebase';
import {getDatabase, push, ref, remove, update} from 'firebase/database'

const db = getDatabase(firebaseApp)
var todoRef = ref(db,"/todos");

var initialState ={}

const todoSlice =createSlice({
    name:'todo',
    initialState,
    reducers:{
        addText:(state,action)=>{
            if(action.payload.btnTxt==='Add New Task'){
                push(todoRef,action.payload.todo)
            }
            else{
                update(todoRef,{title:action.payload})
            }
        },
        editText:(state,action)=>{
            todoRef = ref(db, "/todos/" + action.payload);
        },
        deleteData:(state,action)=>{
            const del = ref(db,"/todos/"+action.payload)
            remove(del)
        },
        deleteAllData:(state,action)=>{
            remove(ref(db,"/todos"))
        },
        checkHandle:(state,action)=>{
            if(!action.payload.done){
                const todoRef = ref(db,"/todos/"+action.payload.id)
                update(todoRef,{done:true})
              }
              else{
                const todoRef = ref(db,"/todos/"+action.payload.id)
                update(todoRef,{done:false})
              }
        },
        deleteCompData:(state,action)=>{
            action.payload.map((item)=>{
                if(item.done){
                  remove(ref(db,"/todos/"+item.id))
                }
            })
        }
    }
})

export const {addText,editText,deleteData,deleteAllData,checkHandle,deleteCompData} = todoSlice.actions

export default todoSlice.reducer
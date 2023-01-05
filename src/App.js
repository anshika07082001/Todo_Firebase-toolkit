import { useEffect, useRef, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import firebaseApp from './Firebase';
import {getDatabase, onValue, push, ref, remove, update} from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux';
import { addText, checkHandle, deleteAllData, deleteData, editText } from './features/todoSlice';
function App() {

  const db = getDatabase(firebaseApp)
  // var state=useSelector(state=>state.todoSlice)
  var dispatch = useDispatch()
  var [btnTxt,setBtnTxt]=useState('Add New Task')
  var [title,setTitle]=useState('')
  var [todolist,setTodoList]=useState([])
  var [edit,setEdit]=useState('')
  var inpRef = useRef()
  const todoRef = ref(db,"/todos");

  useEffect(()=>{
    onValue(todoRef, (snapshot)=>{
      const todos = snapshot.val()
      const newTodoList=[]
      for(let id in todos){
        newTodoList.push({id,...todos[id]});
      }
      setTodoList(newTodoList)
    });
  },[db])
  // Input Handler Function
  const inpChangeHandler=(e)=>{
    setTitle(e.target.value)
  }
  // function adds data in a list
  // console.log(state)
  const addData=()=>{
    if(inpRef.current.value!=''){
    if(btnTxt=='Add New Task'){
      const todo={
        title,
        done:false
      }
      dispatch(addText({todo:todo,btnTxt:btnTxt}))
    }
    else{
      dispatch(addText(inpRef.current.value))
      setBtnTxt('Add New Task')
    }
    inpRef.current.value=''
  }
  else{
    alert('Fill Details')
  }
  }
  // Function Edits Data
  const editHandler=(id,title)=>{
    inpRef.current.value=title
    dispatch(editText(id))
    setBtnTxt('Update Text')
  }
  // function check Uncheck the completed and incompleted tasks 
  const checkHandler=(id,item)=>{
    dispatch(checkHandle(item))
    // if(!item.done){
    //   const todoRef = ref(db,"/todos/"+id)
    //   update(todoRef,{done:true})
    // }
    // else{
    //   const todoRef = ref(db,"/todos/"+id)
    //   update(todoRef,{done:false})
    // }
  }
  // Function deletes Task
  const deleteHandler=(id)=>{
    dispatch(deleteData(id))
  }
  // Function Deletes All Tasks
  const deleteAll =()=>{
    dispatch(deleteAllData())
  }
  // Function deletes Completed tasks
  const deleteCompleted =()=>{

    todolist.map((item)=>{
      if(item.done){
        remove(ref(db,"/todos/"+item.id))
      }
    })
  }

  return (
    <div className="container">
      <h1>TodoInput</h1>
      <TodoForm btnTxt={btnTxt} addData={addData} inpChangeHandler={inpChangeHandler} inpRef={inpRef} todolist={todolist} editHandler={editHandler} deleteAll={deleteAll} deleteHandler={deleteHandler} checkHandler={checkHandler} deleteCompleted={deleteCompleted}/>
    </div>
  );
}

export default App;
import React, { useState } from 'react'

const TodoForm = (props) => {
    var [filter,setFilter]=useState([])
    return (
    <>
    <div className='todo__container'>
        <div className='input__todo'>
            <div className='bookI'>
                <i class="fa fa-book"></i>
            </div>
            <input placeholder='New Todo' type='text' onChange={props.inpChangeHandler} ref={props.inpRef}/>
        </div>
        <button className='button' onClick={props.addData}>{props.btnTxt}</button>
    </div>
    <h2>TodoList</h2>
    <div className='btnDiv'>
        <button className='button btnDiv-btn' onClick={()=>setFilter([])}>All</button>
        <button className='button btnDiv-btn' onClick={()=>setFilter(['done',true])}>Done</button>
        <button className='button btnDiv-btn' onClick={()=>setFilter(['done',false])}>Todo</button>
    </div>
    <div className='todo__list'>
        {props.todolist.map((item)=>{
            if(item[filter[0]]===filter[1]){
                return (
                <div className='lists'>
                    <label style={{marginLeft:'10px'}} className={item.done?'line__throungh':''}>{item.title}</label>
                    <div className='icons__pD'>
                        <input type='checkbox' onChange={()=>props.checkHandler(item.id,item)} checked={item.done}/>
                        <i style={{color:'#ffc930'}} class='fas fa-pen' onClick={()=>props.editHandler(item.id,item.title)}></i>
                        <i style={{color:'#e92158'}} class="fa fa-trash-o" onClick={()=>props.deleteHandler(item.id)}></i>
                    </div>
                </div>
                )
            }
        })}
    </div>
    <div className='btnDiv'>
        <button className='button del-btn' onClick={props.deleteCompleted}>Delete Done Tasks</button>
        <button className='button del-btn' onClick={props.deleteAll}>Delete All Tasks</button>
    </div>
    </>
    )
}

export default TodoForm
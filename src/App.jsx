import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Logo from './Components/logo';
import { v4 as uuidv4 } from "uuid";
import { Eye, EyeOff, CircleAlert } from 'lucide-react';

import { Check } from 'lucide-react';


function App() {

const [task, setTask] = useState("")
const [todos, setTodos] = useState([])
const [Showfinished,setShowfinished] = useState(false)
const [count,setCount] = useState(0);

useEffect(() => {
    
let todoString = localStorage.getItem("todos")
if(todoString){
let todos = JSON.parse(localStorage.getItem("todos"))
setTodos(todos)
   
}
}, [])

const saveTOLS = (localsave) => {
localStorage.setItem("todos", JSON.stringify(todos))
}

const handleAdd = (e)=>{
setCount(prev => prev + 1);
setTodos([...todos, {id: uuidv4(), task, isCompleted: false}])
setTask("")
saveTOLS()
}

const handleChange = (e)=>{
setTask(e.target.value)
setCount(count)
}


const handleEdit = (e, id)=>{
  if(count>0)
  setCount(prev => prev-1);
  let t = todos.find(i=> i.id === id);
 if(t){
  setTask(t.task);
 } 

let newTodos = todos.filter(item=>{
  return item.id!==id
})
setTodos(newTodos)
saveTOLS()
}

const toggleFinished = (event) => {
setShowfinished(!Showfinished)
}


const handleDelete = (e, id)=>{
  
  let index = todos.findIndex(item=>{
    return item.id === id;
     
  })

  let newTodos = todos.filter(item=>{
  return item.id!==id

})

setTodos(newTodos)
if (count>0){
  setCount(prev => prev - 1);
}
saveTOLS()
}

const handleCompleted = (e,id) => {
  let taskId=id;
  let index = todos.findIndex(item=>{
    return item.id === id;
  })

let newTodos = [...todos];
newTodos[index].isCompleted = !newTodos[index].isCompleted;
setTodos(newTodos)
if (count>0){
  setCount(prev => prev - 1);
}
saveTOLS()

}

  return (
    <>
   <Navbar/>
   
     <div className='container flex flex-col mx-auto w-full my-5 border-2 border-blue-900 shadow-2xl rounded-xl p-5 bg-violet-200 min-h-[90vh] 
      bg-cover bg-center' style={{backgroundImage:'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2gOp_o0HxgwsnD2iyj3XXC2eFq5Q8KyYD6A&s")'}}>
      <h1 className='font-bold text-center text-2xl text-white flex-col '> 
        <Logo/>Your Task manager</h1>
      
      <div className="AddTodo my-5 mx-3 flex flex-col lg:flex-row flex-1 gap-2 w-full lg:items-center">
        <h2 className='text-lg font-bold lg:mb-0 mb-2'> Add your Tasks</h2>
        

        <input onChange={handleChange}  value={task}  type="text" placeholder="Type Here " className='w-full lg:w-2/5  text-start bg-white border-rounded rounded-lg p-2' />
        {/*Logic to test the input size length */}
        {(task.length>0) && (task.length <=3) && (<div className="h-2 w-10"><CircleAlert className="text-md text-red-500"/><span className="text-red-500 text-md mt-1">Enter more than 3 characters!</span></div>)}

        {/*Logic to test empty entry */}
        <div className='flex flex-row justify-between w-full lg:w-auto items-center mt-2 lg:mt-0'> {/*Div logic to keep Save and History button wrapped for side-by-side */}
        <button onClick={handleAdd} disabled={task.length<=3} className='bg-violet-600 w-2/5 lg:w-20 h-10 border-2 border-[white] hover:bg-violet-800 font-bold text-white rounded-lg lg:mx-6'>Save</button>
      
      
      <button className="flex justify-center items-center py-5 lg:mx-5 h-10 bg-violet-400 w-1/2 border-2 border-blue-950 rounded-full" onClick={()=> setShowfinished(!Showfinished)}> {Showfinished ? (<button><span className="flex items-center"><EyeOff className="text-white"/>Hide history</span></button>):(<button><span className="flex items-center" ><Eye className="text-white"/>Show history</span></button>)}
      </button>
       </div>
      </div>
      
      <h2 className='text-xl font-bold mx-5 text-fuchsia-950 mt-0 mb-3'>{count} New Active Tasks</h2>
      <hr className='mx-5 border border-violet-500 w-1/2' />
  <div className='flex flex-col lg:flex-row w-full gap-6 '> {/*THIS IS NEW DIV FOR IMAGE IMPLEMENTATION */}
      
      <div className="todos m-3.5 w-full lg:w-2/3">
        {todos.length === 0 && <div className='m-5 font-bold text-fuchsia-950'>Add To-Dos to Work Upon!</div>} 
        {todos.map(item=>{
       
       return (
      Showfinished || !item.isCompleted) && <div key={item.id} className="todo flex flex-col sm:flex-row w-full justify-between items-start sm:items-center bg-amber-100 m-2 p-3 gap-3 rounded-lg shadow-sm">
        <div className='flex flex-row items-start gap-3 w-full sm:w-auto flex-1 min-w-0'>

        <button onClick={(e)=>handleCompleted (e,item.id)} className='bg-amber-200 m-15px w-24 h-10 border-2
         border-[white] hover:bg-amber-300 py-1 text-sm font-bold text-orange-600 rounded-lg shrink-0'>{item.isCompleted?"Completed":"Mark Done"}</button>
        
       
         <div className={item.isCompleted ? "line-through" : ""}>{item.task}</div>
         </div>
         
         <div className="buttons flex flex-row gap-2 w-full sm:w-auto justify-end shrink-0">
         
          <button onClick={(e)=>handleEdit (e, item.id)} className=' bg-green-500 lg:m-15px w-20 h-10 border-2 border-[white] hover:bg-green-600 p-3 py-1 text-sm
           font-bold text-white rounded-lg lg:mx-2'>Edit</button>
          <button onClick={ (e)=> {handleDelete (e, item.id)}}  className=' bg-red-400 lg:m-15px w-20 h-10 border-2 border-[white]
           hover:bg-red-500 lg:p-3 lg:py-1 text-sm font-bold text-white rounded-lg lg:mx-1'>Delete</button>
         </div>
         </div>
         
         })} 
       <div className='w-full lg:w-1/3 flex justify-center items-center p-4 mt-6 lg:mt-0'>
        <img className='h-auto sm:w-1/2 lg:w-full w-2/3 object-contain' 
        src="https://cdni.iconscout.com/illustration/premium/thumb/developer-illustration-svg-download-png-3560991.png" alt="DeveloperImg" />
      </div>
  </div> {/*Image implementation div*/}
      
        </div>
       </div>
   </>
  )
}

export default App



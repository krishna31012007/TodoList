import { useState , useEffect } from 'react'
import Navbar from './components/Navbar';
import deleteIcon from './assets/delete.svg';
import edit from './assets/edit.svg'
import Footer from './components/footer'
import { v4 as uuidv4 } from "uuid";
import './App.css'

function App() {

// 
//  use states
// 
 const [todo, settodo] = useState("") /* state for todo */
 const [showOnlyPending, setShowOnlyPending] = useState(false); /* we dont do it as array as from that we store our todos twice */
  // const [todos, settodos] = useState([]) /* todos array contain array of 1 elemetn as todo statement and second as boolean is completed */
  
  
  //******we first use the use state as normal in above but that cause an error as react first render the page and does not store any todo so we ask chat gpt to solve this and he gave us this for the local storage 
 const [todos, settodos] = useState(() => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
});



/* for the locak storage */
  useEffect(() => {
   
     localStorage.setItem("todos",JSON.stringify(todos))

  }, [todos]) /* when ever todos are change the local storage get updated accordingly */
  

// 
// handle functions
// 
const handleDelete = (e,id) =>{ 
  if (!confirm("Are you sure you want to delete this todo?")) { /* before deleting we confirm  */
  return;
}
  let newtodos = todos.filter((item)=>{  /* filter give a array that satisfies the condition means all that elements into newtodos which are not equal to that on we deleted */
   return  item.id!==id
  });  
 settodos(newtodos); /* will set the todos to newtodos */

}



const handleEdit = (e,id) =>{
  {document.querySelector('#addbtn').innerHTML= "Save"}
  let t = todos.filter(i=>i.id===id);  /* store that todo which we want to change */
  settodo(t[0].todo); /* this will set the todo value to that todo which we click for edit t[0] means in the array the 0th object*/
  let newtodos = todos.filter((item)=>{
   return  item.id!==id /* this will remove that todo */
  });  
 settodos(newtodos); /* and return the new todos array */ /* and after that we can change the todo */

}



const handleAdd = () =>{  /* and when we click on the add button this handleadd functioni add that input(todo) to the exsitsing todos array as a value iscompleted to be false and again make the todo vsalue empty */
  settodos([...todos,{id: uuidv4(), todo , isCompleted: false}]) /* add {todo,iscompleted} */
  settodo("")
  {document.querySelector('#addbtn').innerHTML = "ADD"}
  {document.querySelector('#deleteall').style.display = "block"}

}



const handlechange = (e) =>{ /* this handlechange function make the todo value to equal given input */
  settodo(e.target.value)
}



const handlecheckbox = (e) =>{ /* this handlecheckbox function handle todo item if they chekced then strik them */
 let id =  e.target.name;  /* now in id it will store that todo's which we clicked on checkbox cause we pass that id */
 let index = todos.findIndex(item=>{
  return item.id === id ;  /* this will return that index in todos array where the id is present */
 });
 let newtodos = [...todos];  /* make a new array same as todos */
 newtodos[index].isCompleted = !newtodos[index].isCompleted;  /* convert the isCompleted boolean statement */
 settodos(newtodos); /* return the array to todos */

}

const handledeleteall =()=>{ /* this will delete the all todos in localstorage */
  if (!confirm("Are you sure you want to delete all of these todo?")) { /* before deleting we confirm  */
  return;
  }
  localStorage.removeItem("todos")
  settodos([]);
  {document.querySelector('#deleteall').style.display = "none" }
}

// 
// main
// 

  return (
    <>
    {/* i pass the state beacuse i want to control this through navbar */}
    <Navbar setShowOnlyPending={setShowOnlyPending} />


      <div className="container m-4 p-0 mb-0 bg-purple-100 rounded-t-xl min-h-[84vh] w-auto sm:max-w-[100rem]" >


        <div className="addtodo flex justify-between mb-2 p-6 border-purple-500">

          <h1 className='text-black font-bold text-xl'>Add Todo</h1>

          <div className="inputs flex">
            {/* when ever the input change we use the inchange event which calls the handlechange function whihc takes value of that todo */}
            <input onChange={handlechange} value={todo} type="text" placeholder='Add your Todo' className='bg-white outline-none w-[45vw] mx-4 rounded-[5px] px-3'/>  {/* in this input the value means its initial value of that input is todo */}
            {/* when ever we click on the add button handlechange function calls */}
            <button id='addbtn' onClick={handleAdd} disabled={todo.length<=0} className='disabled:bg-purple-700 border-black bg-purple-950 text-white w-[48px] rounded-2xl'>ADD</button>
          </div>
          
        </div>


        <hr className='opacity-50 h-1'/>


        <div className='flex justify-between items-center'><h2 className='p-6 text-[20px] font-bold'>Your Todos</h2> <button id='deleteall' onClick={handledeleteall} className='m-6 bg-purple-950 h-[30px] px-4 rounded-2xl text-white hover:bg-purple-600'>Delete All</button></div>

        <div className="todos">

          {todos.length ===0 && <div className='text-xl text-black m-4'>No todos to display</div>}
  

          
          {todos.filter(item =>(showOnlyPending)? !item.isCompleted : true) /* if your iscompleted is false then showpending from youtask button will give true with means the map will run for that todo and if your showpendinf is false then your whole todo will show*/
            .map((item) => { {/* to display every todo we use for loop of react which is map */}
            return (
            <>

            <div key={item.id} className="todo flex  p-6 border-[1px] rounded-[8px] border-transparent hover:border-purple-200">

              {/* in this checkbox we catch the id of the todo as name and when ever we click or change the checkbox it calls the function handlecheckbox and send the value item.iscompleted */}
              
              <input name ={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} id="" className='mx-6'/>
              
              <div className='flex justify-between w-full items-center'>

                <div className={`w-[80vw] overflow-hidden ${item.isCompleted? "line-through":""}`}>{item.todo}</div>
                <div className='buttons flex'>
                  <img onClick={(e)=>handleEdit(e,item.id)} src={edit} alt="" className='bg-purple-950 p-1 mx-2 hover:bg-purple-700'/>
                  <img onClick={(e)=>handleDelete(e,item.id)} src={deleteIcon} alt="delete" className='bg-purple-950 p-1 hover:bg-purple-700'/>
                </div>
          
              </div>


            </div>

            </>
            )
           })}


        </div>
        

      </div>

      <Footer/>
    </>
  )
}

export default App


import './App.css';
import Card from './page/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';




const App = () => {
  const[todo, setTodo]=useState([])
  const[newadd,setNewAdd]=useState('')

  useEffect(()=>{
    const data=localStorage.getItem("data")
    if(data){
      setTodo(JSON.parse(data))
    }
  },[])

  const addHp=()=>{
   
    let add={
      id: Math.random(),
        title: newadd,
        isCompleted: false,
        isDeleted: false
    }
    todo.push(add)
    setTodo([...todo])

    localStorage.setItem("data",JSON.stringify(todo))
   
  }  


  const completedHp=(id)=>{
    const todofind=todo.find((e)=>e.id===id);
      todofind.isCompleted=true
      setTodo([...todo])   
      localStorage.setItem("data",JSON.stringify(todo))
  }
  const deleteHp=(id)=>{
      const todofind=todo.find(e=>e.id===id);
      todofind.isDeleted=true
      setTodo([...todo])
      localStorage.setItem("data",JSON.stringify(todo))
  }




  return ( 

    <div className="App">
        <div className='add-containar'>
          <TextField id="standard-basic" label="Enter Task's" variant="standard"  onChange={(data)=>setNewAdd(data.target.value)} />
          <Button className="btn"  onClick={addHp} >{<AddIcon />}</Button>
          <br/>
        </div>

        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          color="gray"
        >
          <Typography color="error">Pending Task's</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div className='data-in'>
            {
              todo.map((e)=>{
                if(!e.isCompleted){
                  return(
                    <div>
                      {
                        !e.isDeleted && <Card id={e.id} title={e.title} completedHp={completedHp} isCompleted={e.isCompleted} deleteHp={deleteHp}/>
                      }
                    </div>
                  )
                }
                else
                {
                  return <></>
                }
              })
            }
          </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
       <Accordion>
       <AccordionSummary
         expandIcon={<ExpandMoreIcon />}
         aria-controls="panel1a-content"
         id="panel1a-header"
       >
         <Typography color="green">Completed Task's</Typography>
       </AccordionSummary>
       <AccordionDetails>
         <Typography>
         <div className='data-com-in'>
            {
                todo.map((e) => {
                  if(e.isCompleted){

                   return (
                   <div>
                     {
                        !e.isDeleted && <Card key={e.id} id={e.id} title={e.title} deleteHp={deleteHp}/> 
                     }
                   </div>
                   )
                  } 
                  else {
                    return null
                  }  
                })
              
              }
              
            </div>
         </Typography>
       </AccordionDetails>
     </Accordion>
    </div>

    );

}
 
export default App;

import QuizItem from "../partials/QuizItem";
import { useState } from "react";

interface QuestionProps{
    onChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function QuizGen({onChange}:QuestionProps){


    const [answers, setAnswer]= useState <{id:number,content:string, checked:boolean}[]>([])
    function addOption(){
        const randomNumber = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
        setAnswer([...answers, {id:randomNumber, content:'',checked:false}])

    }
    function deleteOption(id:number){
        setAnswer(answers.filter(item=>item.id!==id))
    }
    function updateContent(content:string,id:number){
        setAnswer(answers.map((item)=>item.id === id ? {...item, content:content}:item))
    }
    function updateChecked(checked:boolean, id:number){
        setAnswer(answers.map((item)=>item.id === id ? {...item, checked:checked}:item))
    }

    return(
        <>
        
        <input onChange={onChange} type="text" placeholder="Introduce la pregunta" />
        <div>
            <button onClick={addOption}>Agregar Opción de respuesta</button>
        </div>
        <div>
            {
                answers.map(item=><div key={item.id} ><QuizItem inputInfo={(val)=>updateContent(val, item.id)} checkboxInfo={(val)=>updateChecked(val,item.id)} /><button onClick={()=>deleteOption(item.id)}>eliminar</button></div>)
            }
            
        </div>
        <div style={{ marginTop: '2rem' }}>
  <h3>Resumen de opciones:</h3>
  <ul>
    {answers.map((item) => (
      <li key={item.id}>
        <strong>Texto:</strong> {item.content || "(vacío)"} — 
        <strong> ¿Correcta?:</strong> {item.checked ? "Sí" : "No"}
      </li>
    ))}
  </ul>
</div>
        </>
    )

}
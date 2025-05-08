'use client'
import { useState } from "react";
interface Answers{
    id:number;
    content:string;
    checked:boolean
}
interface QuizData{
    id:number;
    question:string;
    answers:Answers[]
}

export default function QuizGenerator(){

   
    const [questions, setQuestions] = useState<QuizData[]>([]);
    function handleAddQuestion(){
        const randomNumber = Math.floor(Math.random() * 1000) + 1;
        setQuestions([...questions,{id:randomNumber,question:'',answers:[]}])
    }
    function handleAddAnswer(id:number){
        const randomNumber = Math.floor(Math.random() * 1000) + 1;
        setQuestions(questions.map(question=>question.id===id?{...question,answers:[...question.answers, {id:randomNumber,content:'',checked:false}]}:question))
    }
    function handleDelete(questionId:number, answerId?:number){
        if (answerId !== undefined) {
            const deletedItem=questions.map(question=>question.id===questionId?{...question, answers:question.answers.filter(answer=>answer.id!==answerId)}:question)
            setQuestions(deletedItem)
        }
        else{

            const deletedItem= questions.filter(question=>question.id!==questionId)
            setQuestions(deletedItem)
        }      

    }

    function updateQuestion(event: React.ChangeEvent<HTMLInputElement>,id:number){
        const q=questions.map(item=>item.id===id?{...item, question:event.target.value}:item)
        setQuestions(q)
    }
    function updateAnswer(event: React.ChangeEvent<HTMLInputElement>,questionId:number, optionId:number){
        function changeOptions(item: 'content' | 'checked',value:string|boolean){
            return( questions.map(
                question => question.id ===questionId?{...question, answers: question.answers.map(answer=>
                    answer.id===optionId?{...answer, [item]:value}:answer
                ) }:question
            ))
           
        }

        if (event.target.type==='text'){
            
    
            setQuestions(changeOptions('content',event.target.value))
        }
        if (event.target.type==='checkbox'){
            setQuestions(changeOptions('checked',event.target.checked))
        }
        
    }
    function sendQuiz(){
        const hasCheckedAnswer = questions.every(question => 
            question.answers.some(answer => answer.checked === true)
        );
    
        if (!hasCheckedAnswer) {
            alert('Debe haber al menos una opción marcada como correcta.');
        }
        
        for (const question of questions) {
            if (question.question === '') {
                alert('Hay preguntas vacías');
                return; // Detener la ejecución si encontramos un campo vacío
            
            }
            if(question.answers.length<2){
                alert('Agrega al menos dos opciones por pregunta');
                return; 
            }
    
            for (const answer of question.answers) {
                if (answer.content === '') {
                    alert('Hay opciones vacías');
                    return; // Detener la ejecución si encontramos una respuesta vacía
                }
        
            }
        }
    
        // Si todo está bien, llamar a handleSaveData
        handleSaveData();
    }
    const handleSaveData = async () => {
        try {
          const response = await fetch('/api/save-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(questions), // Aquí estamos enviando el array de objetos como JSON
          });
      
          if (response.ok) {
            // Si la respuesta es exitosa, puedes hacer algo, como mostrar un mensaje
            console.log('Datos enviados correctamente');
          } else {
            // Si hubo un error en la respuesta, manejarlo
            console.error('Error al enviar los datos');
          }
        } catch (error) {
          console.error('Error en la petición', error);
        }
      };
    return(
        <>
        <h2>CREA TU QUIZ</h2><br/>
        <button onClick={handleAddQuestion}>Agrega una pregunta</button><br/>
        <div>
        {
            questions.map(question=>
                <div key={question.id}>
                <button onClick={()=>handleDelete(question.id)}>Eliminar</button><br/>
                <input value={question.question} onChange={(event)=>updateQuestion(event, question.id)}type="text" placeholder="Escribe tu pregunta" /><br/>
                <button onClick={()=>handleAddAnswer(question.id)}>Agregar una Opción de respuesta</button><br/>
                {
                    question.answers.map(answer=><div key={answer.id}>
                    <button onClick={()=>handleDelete(question.id,answer.id)}>Eliminar</button><br/>
                    <input value={answer.content} onChange={(event)=>updateAnswer(event, question.id,answer.id)} type="text" placeholder="Escribe una respuesta" /><br/>
                    <input checked={answer.checked} onChange={(event)=>updateAnswer(event, question.id,answer.id)} type="checkbox" />
                    </div>)
                }
                </ div>
            )
        }
        </div>
        {
            questions.length>0&&<button onClick={sendQuiz}>Enviar Quiz</button>
        }     
        
        </>
    )
}

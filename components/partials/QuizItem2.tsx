interface onchangeHandlers{
    inputInfo:(content:string)=>void,
    checkboxInfo:(checked:boolean)=>void,
    clickHandler:(id:number)=>void,
    id:number
}


export default function QuizItem2({inputInfo,checkboxInfo, clickHandler, id}:onchangeHandlers){

    function inputHandler(e: React.ChangeEvent<HTMLInputElement>){
        inputInfo(e.target.value)
    }
    function checkboxHandler(e: React.ChangeEvent<HTMLInputElement>){
        checkboxInfo(e.target.checked)
    }
    
    

    return(
        <>
        <button onClick={()=>clickHandler(id)}>Eliminar</button>
        <input onChange={inputHandler} type="text" placeholder="Escriba la opcion aqui"></input>
        <label> ¿respueta correcta?
            <input onChange={checkboxHandler} type="checkbox"></input>
        </label>
        </>
        
    )
}
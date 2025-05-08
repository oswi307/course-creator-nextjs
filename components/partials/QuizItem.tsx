interface onchangeHandlers{
    inputInfo:(content:string)=>void,
    checkboxInfo:(checked:boolean)=>void
}


export default function QuizItem({inputInfo,checkboxInfo}:onchangeHandlers){

    function inputHandler(e: React.ChangeEvent<HTMLInputElement>){
        inputInfo(e.target.value)
    }
    function checkboxHandler(e: React.ChangeEvent<HTMLInputElement>){
        checkboxInfo(e.target.checked)
    }
    
    

    return(
        <>
        <input onChange={inputHandler} type="text" placeholder="Escriba la opcion aqui"></input>
        <label> ¿respueta correcta?
            <input onChange={checkboxHandler} type="checkbox"></input>
        </label>
        </>
        
    )
}
'use client'
import {useState, useEffect} from "react"
import { useRouter } from 'next/navigation'
interface NotesProps{
    id:number;
    title:string;
    content:string
}

export default function Notes(){
    const route=useRouter()
   

    const [notes, setNotes]=useState<NotesProps[]>([])
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    // 🚀 Cargar notas del localStorage al montar el componente
  useEffect(() => {
    const storedNotes = localStorage.getItem('my-notes')
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    }
  }, [])

    useEffect(() => {
        localStorage.setItem('my-notes', JSON.stringify(notes));
      }, [notes]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const form= new FormData(e.currentTarget)
        const title=form.get('title') as string
        const content=form.get('content') as string
        setNotes([...notes,{id:randomNumber,title:title, content:content}])
        e.currentTarget.reset();

    }
    function goPage(id:number){
        route.push(`/${id}`)
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Introduce el título" name="title"></input>
            <textarea placeholder="Introduce la nota" name="content"></textarea>
            <button type="submit">Agregar</button>
            </form>
            <div>
                <h2>Lista de notas</h2>
                <ul>
                    {notes.map((note)=><p key={note.id}>Título: {note.title} - content: {note.content.slice(0, 10)}...<button onClick={()=>goPage(note.id)}>Ver</button></p>)}
                </ul>
            </div>
        </div>
        
    )
}
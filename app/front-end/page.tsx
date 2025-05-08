'use client'
import { useEffect, useState } from 'react';
import QuizViewer from '../../components/resources/QuizViewer';


// Define QuizProps interface
interface QuizProps {
  id: number;
  question: string;
  answers: {
    id: number;
    content: string;
    checked: boolean;
  }[];
}

export default function VerDatos() {
  // Typing the 'datos' state as an array of QuizProps
  const [datos, setDatos] = useState<QuizProps[]>([]);
  const [contador, setContador]= useState(0)

  useEffect(() => {
    fetch('/archivos/datos.json') // Replace with the actual JSON file path
      .then(res => res.json())
      .then(data => setDatos(data))
      .catch(err => console.error('Error loading JSON:', err));
  }, []);

  // Ensure datos has data before passing it to QuizViewer
  if (!datos.length) {
    return <p>Cargando datos...</p>;
  }
  if(datos.length>contador){
    return(
      <>
      <QuizViewer data={datos[contador]} /><br/>
      <button onClick={()=>setContador(contador+1)}>Siguiente</button>
      </>)
  }
return(
  <p>esa era la ultima pregunta</p>
)
  
}

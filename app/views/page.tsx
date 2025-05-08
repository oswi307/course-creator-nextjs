'use client'
import { useEffect, useState } from 'react'

export default function VerDatos() {
  const [datos, setDatos] = useState<any>(null)

  useEffect(() => {
    fetch('/archivos/datos.json') // Cambia por el nombre real del archivo
      .then(res => res.json())
      .then(data => setDatos(data))
      .catch(err => console.error('Error cargando el JSON:', err))
  }, [])

  return (
    <div>
      <h2>Datos cargados:</h2>
      <pre>{JSON.stringify(datos, null, 2)}</pre>
    </div>
  )
}

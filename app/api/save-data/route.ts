// app/api/guardardatos/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Ruta absoluta dentro del proyecto, por ejemplo en "public/archivos"
    const dir = path.join(process.cwd(), 'public', 'archivos')
    
    // Asegura que el directorio exista
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    // Escribe el archivo con un nombre único
    const filePath = path.join(dir, `datos.json`)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')

    return NextResponse.json({ message: 'Archivo guardado correctamente' })
  } catch (error) {
    console.error('Error al guardar el archivo:', error)
    return NextResponse.json({ error: 'Error al guardar archivo' }, { status: 500 })
  }
}

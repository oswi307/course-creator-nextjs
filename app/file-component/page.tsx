'use client';
import { useState, useEffect } from "react";
import FilesUploader from "@/components/resources/FilesUploader";

interface FileType {
  id: number;
  file: File | null;
}

export default function Contador() {
  const [contador, setContador] = useState<FileType[]>([]);

  function aumentar() {
    const numero = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    setContador([...contador, { id: numero, file: null }]);
  }

  function eliminar(id: number) {
    const nuevoArr = contador.filter((item) => item.id !== id);
    setContador(nuevoArr);
  }

  function updateFile(event: React.ChangeEvent<HTMLInputElement>, id: number) {
    const file = event.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Solo se permiten archivos de imagen.");
        return;
      }

      setContador((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, file: file } : item
        )
      );
    }
  }

  async function envioImagenes() {
    const hayVacios = contador.some((e) => e.file === null);

    if (hayVacios) {
      alert("Existen archivos no asignados.");
      return;
    }

    // Generar JSON
    const json = contador.map((item) => ({
      id: item.id,
      fileName: item.file?.name,
      type: item.file?.type,
      size: item.file?.size,
    }));

    try {
      const res = await fetch("/api/guardardatos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });

      const result = await res.json();
      console.log("Respuesta del servidor:", result);
      alert("¡Datos enviados correctamente!");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un error al enviar los datos.");
    }
  }

  useEffect(() => {
    console.log("Contador actualizado:", contador);
  }, [contador]);

  return (
    <>
      <button id="boton" onClick={aumentar}>Agregar</button>

      {contador.map((e) => (
        <div key={e.id}>
          <button onClick={() => eliminar(e.id)}>X</button>
          <FilesUploader onChange={(event) => updateFile(event, e.id)} />
        </div>
      ))}

      {
        contador.length > 0 && (
          <button onClick={envioImagenes}>
            Agregar imágenes
          </button>
        )
      }
    </>
  );
}

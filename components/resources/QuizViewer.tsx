import { useState } from 'react';

interface Data {
  data: QuizProps;
}

interface QuizProps {
  id: number;
  question: string;
  answers: Answer[];
}

interface Answer {
  id: number;
  content: string;
  checked: boolean;
}

export default function QuizViewer({ data }: Data) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  const isCorrect = (id: number) => {
    const selected = data.answers.find(a => a.id === id);
    return selected?.checked ?? false;
  };

  return (
    <div>
      <p><strong>{data.question}</strong></p>
      <div className="answers-container">
        {data.answers.map((item) => (
          <div
            key={item.id}
            className={`answer ${selectedId === item.id ? 'selected' : ''}`}
            onClick={() => handleSelect(item.id)}
          >
            {item.content}
          </div>
        ))}
      </div>

      {selectedId !== null && (
        <p>
          {isCorrect(selectedId)
            ? '✅ ¡Correcto!'
            : '❌ Incorrecto'}
        </p>
      )}
    </div>
  );
}

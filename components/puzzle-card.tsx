"use client";
import { useState } from "react";

export function PuzzleCard({ data }: { data: any }) {
  const [selected, setSelected] = useState<number | null>(null);
  const ok = selected === data.correctIndex;
  return (
    <div className="rounded border bg-white p-3">
      <p className="font-semibold">{data.question}</p>
      <div className="mt-2 space-y-2">
        {data.options.map((option: string, i: number) => (
          <button key={option} onClick={() => setSelected(i)} className="block w-full rounded border p-2 text-left">
            {option}
          </button>
        ))}
      </div>
      {selected !== null && <p className="mt-2 text-sm">{ok ? "✅ Correcto" : "❌ Incorrecto"} · {data.explanation}</p>}
    </div>
  );
}

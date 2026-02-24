"use client";

import { ComicPreview } from "@/components/comic-preview";
import { useEditorStore } from "@/store/editor-store";

export default function EditorPage({ params }: { params: { issueId: string } }) {
  const { pages, addPage, addTextBlock, addComicBlock } = useEditorStore();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold">Editor de ejemplar {params.issueId}</h1>
      <div className="my-4 flex gap-2">
        <button onClick={addPage} className="rounded bg-ugt-red px-3 py-2 text-white">Añadir página</button>
        <form action="/api/publish" method="post">
          <input name="issueId" value={params.issueId} hidden readOnly />
          <button className="rounded border px-3 py-2">Publicar issue</button>
        </form>
      </div>
      <div className="space-y-4">
        {pages.map((p) => (
          <section key={p.id} className="rounded bg-white p-4 shadow">
            <h2 className="font-semibold">Página {p.order}</h2>
            <div className="mt-2 flex gap-2">
              <button onClick={() => addTextBlock(p.id)} className="rounded border px-2 py-1">+ Texto</button>
              <button onClick={() => addComicBlock(p.id)} className="rounded border px-2 py-1">+ Cómic</button>
            </div>
            <div className="mt-3 space-y-2">
              {p.blocks.map((b) => (
                <div key={b.id} className="rounded border p-3">
                  <p className="text-sm font-medium">Bloque: {b.type}</p>
                  {b.type === "comic" ? <ComicPreview data={b.content} /> : <pre>{JSON.stringify(b.content)}</pre>}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

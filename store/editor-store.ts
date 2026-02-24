"use client";
import { create } from "zustand";

type Block = { id: string; type: string; content: any };
type Page = { id: string; order: number; blocks: Block[] };

type EditorState = {
  pages: Page[];
  addPage: () => void;
  addTextBlock: (pageId: string) => void;
  addComicBlock: (pageId: string) => void;
};

export const useEditorStore = create<EditorState>((set) => ({
  pages: [{ id: "p-1", order: 1, blocks: [] }],
  addPage: () => set((s) => ({ pages: [...s.pages, { id: `p-${s.pages.length + 1}`, order: s.pages.length + 1, blocks: [] }] })),
  addTextBlock: (pageId) =>
    set((s) => ({
      pages: s.pages.map((p) =>
        p.id === pageId
          ? { ...p, blocks: [...p.blocks, { id: crypto.randomUUID(), type: "text", content: { text: "Nuevo texto" } }] }
          : p
      )
    })),
  addComicBlock: (pageId) =>
    set((s) => ({
      pages: s.pages.map((p) =>
        p.id === pageId
          ? {
              ...p,
              blocks: [
                ...p.blocks,
                {
                  id: crypto.randomUUID(),
                  type: "comic",
                  content: {
                    panels: [
                      {
                        background: "hospital_corridor",
                        characters: [{ id: "worker1", animation: "fadeIn" }],
                        speech: { text: "Esto no es correcto…", type: "dialogue" },
                        duration: 3
                      }
                    ]
                  }
                }
              ]
            }
          : p
      )
    }))
}));

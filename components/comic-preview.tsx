"use client";
import { motion } from "framer-motion";

export function ComicPreview({ data }: { data: any }) {
  const panel = data?.panels?.[0];
  return (
    <div className="rounded border bg-white p-3">
      <p className="mb-2 text-xs text-neutral-500">Vista previa cómic animado</p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded bg-neutral-100 p-4">
        <p className="font-semibold">Fondo: {panel?.background}</p>
        <p className="mt-2">💬 {panel?.speech?.text}</p>
      </motion.div>
    </div>
  );
}

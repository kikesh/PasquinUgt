import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold text-ugt-red">UGT Sanidad Salamanca · Editorial</h1>
      <p className="mt-4">Plataforma para crear, revisar, publicar y compartir ejemplares digitales.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/dashboard" className="rounded bg-ugt-red px-4 py-2 text-white">Ir al dashboard</Link>
      </div>
    </main>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const issues = await prisma.issue.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard editorial</h1>
        <form action="/api/issues" method="post">
          <input name="title" defaultValue="Nuevo ejemplar" hidden />
          <button className="rounded bg-ugt-red px-4 py-2 text-white">Crear issue</button>
        </form>
      </div>
      <div className="rounded bg-white p-4 shadow">
        <h2 className="mb-3 font-semibold">Ejemplares</h2>
        <ul className="space-y-2">
          {issues.map((issue: { id: string; title: string; status: string; publicSlug: string }) => (
            <li key={issue.id} className="flex items-center justify-between rounded border p-3">
              <span>{issue.title} · {issue.status}</span>
              <div className="flex gap-2">
                <Link href={`/editor/${issue.id}`} className="rounded border px-3 py-1">Editar</Link>
                {issue.status === "published" && <Link href={`/read/${issue.publicSlug}`} className="rounded border px-3 py-1">Leer</Link>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

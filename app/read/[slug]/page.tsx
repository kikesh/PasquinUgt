import { prisma } from "@/lib/prisma";

export default async function Reader({ params, searchParams }: { params: { slug: string }; searchParams: { page?: string } }) {
  const issue = await prisma.issue.findUnique({
    where: { publicSlug: params.slug },
    include: { pages: { include: { blocks: true }, orderBy: { order: "asc" } } }
  });
  if (!issue || issue.status !== "published") return <main className="p-6">No disponible.</main>;

  const pageIndex = Number(searchParams.page || "1") - 1;
  const current = issue.pages[pageIndex] || issue.pages[0];

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">{issue.title}</h1>
      <p className="text-sm">Página {current?.order} · Deep-link: /read/{issue.publicSlug}?page={current?.order}</p>
      <article className="mt-4 rounded bg-white p-4 shadow">
        {current?.blocks.map((block: { id: string; type: string; content: unknown }) => (
          <section key={block.id} className="mb-3 rounded border p-3">
            <h2 className="font-semibold">{block.type}</h2>
            <pre className="text-xs">{JSON.stringify(block.content, null, 2)}</pre>
          </section>
        ))}
      </article>
      {issue.allowPdfDownload && issue.pdfUrl && <a className="mt-4 inline-block rounded border px-3 py-2" href={issue.pdfUrl}>Descargar PDF</a>}
    </main>
  );
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const formData = await req.formData();
  const issueId = String(formData.get("issueId"));

  const issue = await prisma.issue.findUnique({ where: { id: issueId }, include: { pages: { include: { blocks: true } } } });
  if (!issue) return NextResponse.json({ error: "Issue no encontrado" }, { status: 404 });

  await prisma.issue.update({
    where: { id: issueId },
    data: { status: "published", publishedAt: new Date(), visibility: "public" }
  });

  await prisma.issueVersion.create({
    data: {
      issueId,
      snapshot: issue
    }
  });

  return NextResponse.redirect(new URL(`/read/${issue.publicSlug}`, req.url));
}

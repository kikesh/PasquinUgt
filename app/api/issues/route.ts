import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildIssueSlug } from "@/lib/slug";

export async function POST(req: Request) {
  const formData = await req.formData();
  const title = String(formData.get("title") || "Ejemplar sin título");

  const issue = await prisma.issue.create({
    data: {
      title,
      publicSlug: buildIssueSlug(title),
      pages: {
        create: {
          order: 1,
          template: "default",
          blocks: {
            create: [{ type: "text", order: 1, content: { text: "Primera página" } }]
          }
        }
      }
    }
  });

  return NextResponse.redirect(new URL(`/editor/${issue.id}`, req.url));
}

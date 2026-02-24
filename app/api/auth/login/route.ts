import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const token = await signToken({ userId: user.id, role: user.role });
  const response = NextResponse.json({ ok: true });
  response.cookies.set("session", token, { httpOnly: true, secure: true, sameSite: "lax", path: "/" });
  return response;
}

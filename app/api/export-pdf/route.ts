import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: Request) {
  const { url } = await req.json();
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();

  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=issue.pdf"
    }
  });
}

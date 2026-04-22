import { NextResponse } from "next/server"
import { appendToSheet } from "@/lib/google-sheets"

export async function POST(req: Request) {
  try {
    const { name, email, companyName, message } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    await appendToSheet(name, email, companyName ?? "", message ?? "")

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[booking] Error:", err)
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 })
  }
}

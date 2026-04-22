import { NextResponse } from "next/server"
import { JWT } from "google-auth-library"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Payload = {
  project?: string
  name?: string
  email?: string
  lang?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets"

let cachedClient: JWT | null = null

function getJwtClient(): JWT {
  if (cachedClient) return cachedClient

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  let privateKey = process.env.GOOGLE_PRIVATE_KEY

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Google service account credentials are not configured. Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in .env.local — see docs/GOOGLE_SHEETS_SETUP.md.",
    )
  }

  // Env vars often store the PEM with literal \n escapes; normalize them.
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n")
  }
  // Some platforms wrap the value in surrounding quotes.
  privateKey = privateKey.trim().replace(/^"(.*)"$/s, "$1")

  cachedClient = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: [SHEETS_SCOPE],
  })
  return cachedClient
}

async function appendRow(values: string[]): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!sheetId) {
    throw new Error("GOOGLE_SHEET_ID is not configured.")
  }
  const tab = process.env.GOOGLE_SHEET_TAB ?? "Sheet1"

  const client = getJwtClient()
  const { token } = await client.getAccessToken()
  if (!token) throw new Error("Failed to obtain Google access token.")

  const range = encodeURIComponent(`${tab}!A1`)
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append` +
    `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [values] }),
    cache: "no-store",
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    throw new Error(`Sheets API ${res.status}: ${detail}`)
  }
}

export async function POST(req: Request) {
  let body: Payload
  try {
    body = (await req.json()) as Payload
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  const project = (body.project ?? "").trim()
  const name = (body.name ?? "").trim()
  const email = (body.email ?? "").trim()

  if (!project || !name || !email) {
    return NextResponse.json(
      { ok: false, error: "All fields are required." },
      { status: 400 },
    )
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    )
  }

  try {
    await appendRow([
      new Date().toISOString(),
      project,
      name,
      email,
      body.lang ?? "",
      "schedule-call",
    ])
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[schedule-call] Sheets append failed:", err)
    const message = err instanceof Error ? err.message : "Unknown error"
    // Don't leak credential errors to the client.
    const safe = /credentials are not configured|GOOGLE_SHEET_ID/.test(message)
      ? "Submission endpoint is not configured."
      : "Failed to record submission."
    return NextResponse.json({ ok: false, error: safe }, { status: 502 })
  }
}

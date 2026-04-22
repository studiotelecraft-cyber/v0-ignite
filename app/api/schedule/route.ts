import { NextResponse } from "next/server"

const SHEET_ID = "1u4ASVURWErzFzJZ20cZF_h1Pc4mZkrEjw8oLx4IAtlw"
const SHEET_RANGE = "Sheet1!A:E"

async function getAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!
  const rawKey = process.env.GOOGLE_PRIVATE_KEY!
  const privateKey = rawKey.replace(/\\n/g, "\n")

  const now = Math.floor(Date.now() / 1000)
  const header = { alg: "RS256", typ: "JWT" }
  const payload = {
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj))
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")

  const signingInput = `${encode(header)}.${encode(payload)}`

  // Import private key and sign
  const keyData = privateKey
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "")
  const binaryKey = Buffer.from(keyData, "base64")

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  )

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    Buffer.from(signingInput)
  )

  const sig = Buffer.from(signature)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")

  const jwt = `${signingInput}.${sig}`

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  })

  if (!tokenRes.ok) {
    const err = await tokenRes.text()
    throw new Error(`Failed to get access token: ${err}`)
  }

  const { access_token } = await tokenRes.json()
  return access_token
}

export async function POST(req: Request) {
  try {
    const { name, email, companyName, message } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    console.log("[v0] GOOGLE_SERVICE_ACCOUNT_EMAIL:", process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "NOT SET")
    console.log("[v0] GOOGLE_PRIVATE_KEY set:", !!process.env.GOOGLE_PRIVATE_KEY)
    console.log("[v0] GOOGLE_PRIVATE_KEY starts with:", process.env.GOOGLE_PRIVATE_KEY?.slice(0, 40))

    const accessToken = await getAccessToken()
    console.log("[v0] Access token obtained successfully")

    const dateTime = new Date().toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_RANGE)}:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [[name, email, companyName ?? "", message ?? "", dateTime]],
        }),
      }
    )

    if (!appendRes.ok) {
      const err = await appendRes.text()
      console.log("[v0] Google Sheets API error response:", err)
      throw new Error(`Google Sheets API error: ${err}`)
    }

    console.log("[v0] Row appended to Google Sheets successfully")
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[v0] Error writing to Google Sheets:", err)
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 })
  }
}

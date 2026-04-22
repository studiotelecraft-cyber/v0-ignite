import { NextResponse } from "next/server"

const SHEET_ID = "1u4ASVURWErzFzJZ20cZF_h1Pc4mZkrEjw8oLx4IAtlw"
const SHEET_RANGE = "Sheet1!A:E"

const FALLBACK_EMAIL = "ignite-google-sheet@just-terminus-474803-a7.iam.gserviceaccount.com"
const FALLBACK_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDzCObYJvQQaKaQ
5cPdhOs94xjTQnIjLpi4mdq6NT7w71zdg/kmd72iKdITaiB0sS22Q86F7EinuwUR
WGddHITybf1ZD+KZxaJ3lEu0xPVLn8AvCLL7JmBJl79oufFhC7CIwt7an2QZEiDj
ztoaycm3mEv69Vx+MsHGP9sgbEIWySNSX4HxvD/Uu/G/XmjrUiGu8W3X749Vll8
L4Uz9V13Kl4dNtAg9k9FonZbEHQaJdnyZTYhAwJqAE0POWrxWlBX2B6wUMFvaLba
4DigCyErMVFKKPrtnplwq2SVIXLvyMAGnVzj7Sapbo+1Zhrgpp1m/kjLbGvizhjp
OFXNgDJwlAgMBAAECggEAZ43Y8qvyXZWBt4a3RMmQhJ+hoc6TnIsLtsiTqrjqVzX
ef2JuxGXL7u9b3DrhlmcyP5G3y1eJA7ML7z6YWFPBEB0ukIbUukm8NrCA64bqr+z
jMgdGX/4Tk/ftLn3gLEYTU8qYs1WsDIStb/Pg+f4WDbz+TvHCFeGhsEvgHfoS1Or
NmwP4jwMF3SQPWhGYebtc4H+9ewKIctSH0D/5mrxIjj9+Z2qcrNE5G7v1VqEzuce
yZ9K98b0mkIJsbLjl8Fw5JfDaOYwK9ttRobOjvMDr8Fn59Uisy0gTFA1x0kylg8v
waBj91I0xn7R1kU04CQHwOVN8mjxWFwigBhi3Itj4dwKBgQD/Zl+BYAVEdLgX/JP6
pmJMlusWhHDPwcpWmeGfft2IU8yNWmj+Ez/Cz+EKinhJ5wBT4Cmc2ew6U9EZ6it3
vTRzNLRdRBLJh3QHtSJC2dTmRwEqKzi6u9QTfhZCPBFPFUASNNyh2FtS5vkka/Zx
5dK/SxusUdcdCPJSnzuKmZ94KwKBgQDzmxdCespeL7BZCtgDGOk55a89ev+B4Xu1
vyHQhE/mD8fsE3ievFm2zuzqTCXb4ek7vujyV3E9Rxqr7q5Qj0lsuHEEl8pMLcx2
v+vFgN/kmKD3/3f9i94EMLQkYuv5G115NmTiH+WJi2buGOVgxLAt80uxd9bA6qSQ
et8aMBE7wKBgQDVr6C+zUj68rFImHJzZ5ydOjQtndgJa7nQZWWqHepacsqVhgyMc
CyL4YQHXr2wD49tngMTEh4c2x37kbqWr35f2bwCwL77UNKa1El7J2iC1uu5jXoke
pzBRmB3QGy2/y+hTAtBepVGMqxHdfE3cLO4i632qm7SAzdEO6gEme4cCwKBgQDgl
AATd6QMxKYs0IRoBpUsnQS7ByN6l2c3HGeOFgyaqb3DdAflPvruP0HGlkDovxIH1
G5ozCCaZeW2rR7VH63DjW/5FH7KOHEK8zx4KzE6cLeFoAAqcok8hSc0pJlEpLAM2
deD3XjR8YxmXMzhzx6AsHHmRuEsxOqBP2hbHy7x3QKBgQDwT4o/4X8kosQXw/nv
GCnEuRwVUkc3KUGC+rZ2DX8G1D6kNVJN419J+wv9N83nRWwYPhKEqsXv40cUEgq1
8N16+kkqU3+sTBmJ/GxZeng0HyBTCCHqXRHLxSnp0EcyHuaza0jYJ9/sc/gyQtxA
ipIcLH6VCU+TnTKkmwOXtO0H1w==
-----END PRIVATE KEY-----`

async function getAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || FALLBACK_EMAIL
  const rawKey = process.env.GOOGLE_PRIVATE_KEY || FALLBACK_KEY
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

    const accessToken = await getAccessToken()

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
      throw new Error(`Google Sheets API error: ${err}`)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[schedule] Error:", err)
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 })
  }
}

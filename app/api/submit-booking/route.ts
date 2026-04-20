import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, companyName, message } = body

    if (!name || !email || !companyName || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })

    const dateTime = new Date().toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, email, companyName, message, dateTime]],
      },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[submit-booking] Error:", error)
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 })
  }
}

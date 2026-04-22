# Google Sheets integration for the "Book a Free 30-Minute Strategy Call" form

When the user clicks **Submit** in the schedule-call pop-up, the browser
POSTs to `/api/schedule-call`. That server route authenticates with
Google as a **service account** and appends one row to your Google Sheet
via the Sheets REST API.

```
Browser form  ──►  /api/schedule-call  ──►  Google Sheets API  ──►  row appended
                    (Next.js server)         (service-account JWT)
```

No secrets ever reach the browser — the private key stays in server-side
environment variables.

---

## What a submission writes

Each submit appends **one row** with these columns, in order:


| A (Submitted At)   | B (Project)      | C (Name) | D (Company Email) | E (Lang) | F (Source)      |
| ------------------ | ---------------- | -------- | ----------------- | -------- | --------------- |
| ISO 8601 timestamp | textarea content | input    | input             | en / th  | `schedule-call` |


You can either put a matching header row in row 1 of the sheet, or leave
the sheet empty — the code uses `append` with `INSERT_ROWS`, so it just
appends after the last used row in either case.

---

## One-time setup

### 1. Prepare the sheet

1. Open your sheet:
  [https://docs.google.com/spreadsheets/d/1u4ASVURWErzFzJZ20cZF_h1Pc4mZkrEjw8oLx4IAtlw/edit](https://docs.google.com/spreadsheets/d/1u4ASVURWErzFzJZ20cZF_h1Pc4mZkrEjw8oLx4IAtlw/edit)
2. (Optional) Paste this header row into row 1:
  `Submitted At | Project | Name | Company Email | Lang | Source`
3. Note the tab/worksheet name. Default is `Sheet1`; set
  `GOOGLE_SHEET_TAB` in `.env.local` if yours is different (e.g. `Leads`).

### 2. Create a Google Cloud project and service account

1. Go to [https://console.cloud.google.com/](https://console.cloud.google.com/) and create a project (or
  reuse an existing one).
2. Enable the **Google Sheets API**:
  [https://console.cloud.google.com/apis/library/sheets.googleapis.com](https://console.cloud.google.com/apis/library/sheets.googleapis.com)
3. Open **IAM & Admin → Service Accounts → Create service account**.
  - Name: `ignite-sheets` (anything is fine)
  - Role: none required (the sheet's own sharing controls access)
  - Click **Done**.
4. On the service account's page, open the **Keys** tab, then
  **Add key → Create new key → JSON**. This downloads a JSON file that
   looks like:
   Treat this file like a password. Do **not** commit it. We only need
   two fields from it (`client_email` and `private_key`).

### 3. Share the sheet with the service account

Without this step every API call will return **403 / PERMISSION_DENIED**.

1. Copy the `client_email` from the JSON
  (e.g. `ignite-sheets@your-project-id.iam.gserviceaccount.com`).
2. In the Google Sheet, click **Share**.
3. Paste that email, set the role to **Editor**, untick
  "Notify people", and click **Share**.

### 4. Configure the Next.js app

1. In the project root, copy `.env.local.example` to `.env.local`.
2. Fill it in:
  ```bash
   GOOGLE_SHEET_ID=1u4ASVURWErzFzJZ20cZF_h1Pc4mZkrEjw8oLx4IAtlw
   GOOGLE_SHEET_TAB=Sheet1
   GOOGLE_SERVICE_ACCOUNT_EMAIL=ignite-sheets@your-project-id.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"
  ```
  - The whole private key goes on one line. Either keep it wrapped in
  double quotes with literal `\n` escapes (as shown), or — if your
  hosting platform supports multi-line secret values — paste the
  real line breaks without quotes. The server handles both.
  - Do **not** escape the `-----BEGIN PRIVATE KEY-----` / `END` markers.
3. Install the new dependency and start dev:
  ```bash
   pnpm install
   pnpm dev
  ```
4. For production (Vercel, Netlify, etc.), add the same four variables
  in the host's **Environment Variables** UI and redeploy.

### 5. Verify

1. Load the site, open the **Book a Free 30-Minute Strategy Call** pop-up.
2. Fill in Project / Name / Company Email and click **Submit**.
3. You should see the green success message and, within ~1 second, a new
  row in the Google Sheet.

---

## Troubleshooting


| Symptom                                  | Likely cause                                                                          | Fix                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| "Submission endpoint is not configured." | `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, or `GOOGLE_PRIVATE_KEY` missing    | Check `.env.local`, restart `next dev`                        |
| 403 / `PERMISSION_DENIED` in server logs | Sheet is not shared with the service account                                          | Share the sheet with the `client_email`, role Editor          |
| 403 / `SERVICE_DISABLED`                 | Sheets API not enabled on the Cloud project                                           | Enable it at the Cloud Console link in step 2.2 above         |
| `error:0909006C` / `PEM routines` error  | Private key line breaks were lost (e.g. `\n` was not expanded)                        | Keep the key quoted with literal `\n`, or paste real newlines |
| Row appends to the wrong tab             | Default tab name is not `Sheet1`                                                      | Set `GOOGLE_SHEET_TAB=<your tab name>` in `.env.local`        |
| "Failed to record submission." in the UI | Generic upstream error — check the server terminal / function logs for the real cause | The route logs the full API response for debugging            |


---

## Security notes

- The service account's private key is only read on the server
(`process.env.GOOGLE_PRIVATE_KEY`); it is never sent to the browser.
- The route validates all three input fields server-side and does a
basic email format check before touching the Sheets API.
- If a key is ever leaked, revoke it in the Cloud Console
(**Service Accounts → Keys → Delete**) and generate a new one — the
previous key stops working immediately.


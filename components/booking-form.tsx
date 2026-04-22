"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface BookingLabels {
  title?: string
  subtitle?: string
  firstName: string
  email: string
  organization: string
  message: string
  captcha: string
  submit: string
}

interface BookingFormProps {
  labels: BookingLabels
  /** "white" = white card style (main page), "gradient" = blue gradient style (service pages) */
  variant?: "white" | "gradient"
}

const CAPTCHA_ANSWER = "28"

export function BookingForm({ labels, variant = "white" }: BookingFormProps) {
  const [form, setForm] = useState({ name: "", email: "", organization: "", message: "", captcha: "" })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [captchaError, setCaptchaError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.captcha.trim() !== CAPTCHA_ANSWER) {
      setCaptchaError(true)
      return
    }
    setCaptchaError(false)
    setStatus("submitting")
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          companyName: form.organization,
          message: form.message,
        }),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
      setForm({ name: "", email: "", organization: "", message: "", captcha: "" })
    } catch {
      setStatus("error")
    }
  }

  if (variant === "gradient") {
    return (
      <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 p-10 md:p-12 rounded-3xl shadow-2xl">
        {labels.title && <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{labels.title}</h2>}
        {labels.subtitle && <p className="text-white/90 mb-8 leading-relaxed">{labels.subtitle}</p>}

        {status === "success" ? (
          <div className="py-12 text-center text-white font-semibold text-lg">
            ขอบคุณ! เราจะติดต่อกลับเร็วๆ นี้
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder={labels.firstName}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                className="bg-white border-0 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl shadow-sm"
              />
              <Input
                placeholder={labels.email}
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                className="bg-white border-0 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl shadow-sm"
              />
            </div>
            <Input
              placeholder={labels.organization}
              value={form.organization}
              onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
              className="bg-white border-0 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl shadow-sm"
            />
            <Textarea
              placeholder={labels.message}
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="bg-white border-0 text-gray-900 placeholder:text-gray-500 resize-none rounded-xl shadow-sm"
            />
            <div className="flex items-center gap-4">
              <Label className="text-white font-semibold text-lg shrink-0">{labels.captcha}</Label>
              <Input
                value={form.captcha}
                onChange={(e) => { setForm((f) => ({ ...f, captcha: e.target.value })); setCaptchaError(false) }}
                className={`bg-white border-0 text-gray-900 max-w-[120px] h-12 rounded-xl shadow-sm ${captchaError ? "ring-2 ring-red-400" : ""}`}
              />
            </div>
            {captchaError && <p className="text-yellow-200 text-sm">คำตอบไม่ถูกต้อง</p>}
            {status === "error" && <p className="text-yellow-200 text-sm">เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</p>}
            <Button
              type="submit"
              disabled={status === "submitting"}
              className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60"
            >
              {status === "submitting" ? "กำลังส่ง..." : labels.submit}
            </Button>
          </form>
        )}
      </div>
    )
  }

  // White variant
  return (
    <div className="bg-white rounded-3xl p-10 md:p-12 shadow-2xl border border-gray-200 h-full">
      {labels.title && (
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            {labels.title}
          </h2>
          {labels.subtitle && <p className="text-gray-600 text-lg leading-relaxed">{labels.subtitle}</p>}
        </div>
      )}

      {status === "success" ? (
        <div className="py-12 text-center text-green-600 font-semibold text-lg">
          ขอบคุณ! เราจะติดต่อกลับเร็วๆ นี้
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="booking-name" className="text-gray-900 font-semibold text-base">
                {labels.firstName}
              </Label>
              <Input
                id="booking-name"
                placeholder={labels.firstName}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-email" className="text-gray-900 font-semibold text-base">
                {labels.email}
              </Label>
              <Input
                id="booking-email"
                type="email"
                placeholder={labels.email}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="booking-org" className="text-gray-900 font-semibold text-base">
              {labels.organization}
            </Label>
            <Input
              id="booking-org"
              placeholder={labels.organization}
              value={form.organization}
              onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
              className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="booking-message" className="text-gray-900 font-semibold text-base">
              {labels.message}
            </Label>
            <Textarea
              id="booking-message"
              placeholder={labels.message}
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="border-2 border-gray-200 focus:border-blue-400 rounded-xl resize-none bg-gray-50 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
            <Label className="text-gray-900 font-bold text-lg shrink-0">{labels.captcha}</Label>
            <Input
              value={form.captcha}
              onChange={(e) => { setForm((f) => ({ ...f, captcha: e.target.value })); setCaptchaError(false) }}
              className={`max-w-[120px] h-12 border-2 border-gray-300 focus:border-blue-400 rounded-xl ${captchaError ? "border-red-400" : ""}`}
            />
          </div>
          {captchaError && <p className="text-red-500 text-sm">คำตอบไม่ถูกต้อง</p>}
          {status === "error" && <p className="text-red-500 text-sm">เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</p>}
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-60"
          >
            {status === "submitting" ? "กำลังส่ง..." : `${labels.submit} →`}
          </Button>
        </form>
      )}
    </div>
  )
}

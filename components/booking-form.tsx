"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface BookingLabels {
  title: string
  subtitle: string
  firstName: string
  email: string
  organization: string
  message: string
  submit: string
}

interface BookingFormProps {
  labels: BookingLabels
  variant?: "white" | "gradient"
}

export function BookingForm({ labels, variant = "gradient" }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/submit-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Submission failed")
      }

      setStatus("success")
      setFormData({ name: "", email: "", companyName: "", message: "" })
    } catch (err: unknown) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.")
    }
  }

  if (variant === "white") {
    return (
      <div className="bg-white rounded-3xl p-10 md:p-12 shadow-2xl border border-gray-200 h-full">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
            {labels.title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">{labels.subtitle}</p>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">ส่งข้อมูลเรียบร้อยแล้ว</p>
            <p className="text-gray-500">ทีมงานจะติดต่อกลับหาคุณโดยเร็วที่สุด</p>
            <Button
              className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full px-8"
              onClick={() => setStatus("idle")}
            >
              ส่งข้อมูลอีกครั้ง
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name-white" className="text-gray-900 font-semibold text-base">
                  {labels.firstName}
                </Label>
                <Input
                  id="name-white"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={labels.firstName}
                  required
                  className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-white" className="text-gray-900 font-semibold text-base">
                  {labels.email}
                </Label>
                <Input
                  id="email-white"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={labels.email}
                  required
                  className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName-white" className="text-gray-900 font-semibold text-base">
                {labels.organization}
              </Label>
              <Input
                id="companyName-white"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder={labels.organization}
                required
                className="h-12 border-2 border-gray-200 focus:border-blue-400 rounded-xl bg-gray-50 focus:bg-white transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message-white" className="text-gray-900 font-semibold text-base">
                {labels.message}
              </Label>
              <Textarea
                id="message-white"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={labels.message}
                rows={5}
                required
                className="border-2 border-gray-200 focus:border-blue-400 rounded-xl resize-none bg-gray-50 focus:bg-white transition-all"
              />
            </div>

            {status === "error" && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "กำลังส่ง..." : `${labels.submit} →`}
            </Button>
          </form>
        )}
      </div>
    )
  }

  // gradient variant (default — used in service pages)
  return (
    <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-400 p-10 md:p-12 rounded-3xl shadow-2xl">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{labels.title}</h2>
      <p className="text-white/90 mb-8 leading-relaxed">{labels.subtitle}</p>

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-white mb-2">ส่งข้อมูลเรียบร้อยแล้ว</p>
          <p className="text-white/80">ทีมงานจะติดต่อกลับหาคุณโดยเร็วที่สุด</p>
          <Button
            className="mt-6 bg-white text-blue-600 hover:bg-white/90 rounded-full px-8 font-bold"
            onClick={() => setStatus("idle")}
          >
            ส่งข้อมูลอีกครั้ง
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={labels.firstName}
              required
              className="bg-white border-0 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl shadow-sm"
            />
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={labels.email}
              required
              className="bg-white border-0 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl shadow-sm"
            />
          </div>
          <Input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder={labels.organization}
            required
            className="bg-white border-0 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl shadow-sm"
          />
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={labels.message}
            rows={5}
            required
            className="bg-white border-0 text-gray-900 placeholder:text-gray-500 resize-none rounded-xl shadow-sm"
          />

          {status === "error" && (
            <p className="text-white/90 text-sm bg-white/20 rounded-xl px-4 py-2">{errorMessage}</p>
          )}

          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "กำลังส่ง..." : labels.submit}
          </Button>
        </form>
      )}
    </div>
  )
}

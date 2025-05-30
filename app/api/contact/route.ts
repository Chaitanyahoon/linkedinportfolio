import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate the form data
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // For development, we'll just log the email content
    // In production, you would integrate with an email service like:
    // - Resend (recommended for Next.js)
    // - SendGrid
    // - Nodemailer with SMTP
    // - AWS SES

    const emailContent = {
      to: "chaitanya.patil@email.com", // Your email address
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><em>This message was sent from your portfolio contact form.</em></p>
      `,
    }

    // Log the email content for development
    console.log("📧 Email would be sent:", emailContent)

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(
      {
        message: "Email sent successfully",
        dev: true,
        note: "In development mode - check console for email content",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

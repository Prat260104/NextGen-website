import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
    try {
        const { name, email, subject, message } = await request.json();

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Create a transporter using your email service
        // Replace with your actual email configuration
        const transporter = nodemailer.createTransport({
            service: "gmail", // or your email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Email to send to NextGen team
        const mailOptions = {
            from: email,
            to: process.env.CONTACT_EMAIL || "contact@nextgensupercomputing.org",
            subject: `New Contact Form: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, "<br>")}</p>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Optional: Send confirmation email to the user
        const confirmationEmail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "We received your message - NextGen SuperComputing",
            html: `
                <h2>Thank you for reaching out!</h2>
                <p>Hi ${name},</p>
                <p>We've received your message and will get back to you as soon as possible.</p>
                <p>Best regards,<br>NextGen SuperComputing Team</p>
            `,
        };

        await transporter.sendMail(confirmationEmail);

        return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}

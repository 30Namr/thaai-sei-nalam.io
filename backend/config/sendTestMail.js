// sendTestMail.js
import transporter from "./transporter.js";

async function sendTestMail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "test@example.com", // change to your email for testing
      subject: "Test Email ✔",
      text: "Hello! This is a test email from Nodemailer + Gmail + App Password 🚀",
    });

    console.log("✅ Test mail sent:", info.response);
  } catch (error) {
    console.error("❌ Error sending mail:", error);
  }
}

sendTestMail();

const transporter = require("../config/email");

exports.sendResetEmail = async (req, res) => {
  try {
    const { email, resetLink } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Reset email sent!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};

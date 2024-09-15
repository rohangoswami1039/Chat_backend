const auth = require("../utils/Firebase/firebase_config");
const { sendEmail } = require("../utils/emailService");

const sendSignUpLink = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const actionCodeSettings = {
    url: `${process.env.BACKEND_HOSTED_URL}/completeSignUp`, // Change to your frontend URL
    handleCodeInApp: true, // This must be true for email link sign-in
  };

  try {
    // Generate email sign-in link
    const link = await auth.generateSignInWithEmailLink(
      email,
      actionCodeSettings
    );

    // TODO: Send the link via email (you can use nodemailer or another email service)
    const emailContent = `
      <h1>Sign Up</h1>
      <p>Click the link below to complete your sign up:</p>
      <a href="${link}">Complete Sign Up</a>
    `;

    // Send the email
    const info = await sendEmail(email, "Complete Your Sign Up", emailContent);

    // For demo purposes, we'll just return the link in the response
    return res.status(200).json({ message: "Signup email sent", link, info });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send signup email" });
  }
};

const completeSignUp = async (req, res) => {
  const { email, oobCode } = req.query;

  if (!email || !oobCode) {
    return res.status(400).json({ error: "Email and code are required" });
  }

  try {
    // Verify the email link
    const emailVerified = await auth.verifyPasswordResetCode(oobCode);

    if (emailVerified !== email) {
      return res.status(400).json({ error: "Invalid email or link" });
    }

    // You can now create the user in your system (e.g., in Prisma DB)
    // For demonstration, return success response
    return res
      .status(200)
      .json({ message: "Email verified and signup completed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to verify email link" });
  }
};
module.exports = { sendSignUpLink, completeSignUp };

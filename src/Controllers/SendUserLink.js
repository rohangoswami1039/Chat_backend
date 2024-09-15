const auth = require("../utils/Firebase/firebase_config");
const { sendEmail } = require("../utils/emailService");
const {
  generateSignUpToken,
  verifySignUpToken,
} = require("../utils/bcryptUtils");

const { findUserByEmail, createUser } = require("../Services/userService");

const sendSignUpLink = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const token = generateSignUpToken(email, name, password);

  try {
    // Generate email sign-in link
    const link = `${process.env.BACKEND_HOSTED_URL}/api/users/completeSignUp?token=${token}`;
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 10px;">
        <div style="text-align: center; padding-bottom: 20px;">
          <h1 style="color: #333;">Welcome to Radius, ${name}</h1>
          <p style="color: #555;">We're excited to have you on board. Click the button below to complete your sign-up process.</p>
        </div>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${link}" style="background-color: #28a745; color: white; text-decoration: none; padding: 15px 30px; font-size: 16px; border-radius: 5px;">Confirm Email</a>
        </div>
        <div style="text-align: center; color: #555; padding-top: 10px;">
          <p>If you didn’t sign up for this account, you can safely ignore this email.</p>
        </div>
        <div style="text-align: center; color: #999; font-size: 12px; padding-top: 20px;">
          <p>© 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    `;
    const info = await sendEmail(email, "Complete Your Sign Up", emailContent);
    return res.status(200).json({ message: "Signup email sent", info });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send signup email" });
  }
};

const completeSignUp = async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ error: "Email and code are required" });
  }

  try {
    // Verify the email link
    const decoded = verifySignUpToken(token);
    if (!decoded || !decoded.email) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    const email = decoded.email;
    const name = decoded.name;
    const password = decoded.password;
    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        console.log("User already exists needed to signin");
        return res.status(400).json({ error: "User already exists" });
      } else {
        const newUser = await createUser(email, name, password);
        return res
          .status(201)
          .json({ message: "User created successfully", newUser });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Something went wrong", Message: error });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to verify email link" });
  }
};
module.exports = { sendSignUpLink, completeSignUp };

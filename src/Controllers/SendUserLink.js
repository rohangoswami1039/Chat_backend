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

    console.log(decoded);
    const email = decoded.email;
    const name = decoded.name;
    const password = decoded.password;
    console.log(email, name, password);

    try {
      const existingUser = await findUserByEmail(email);
      console.log("Existing User >>> ", existingUser);
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

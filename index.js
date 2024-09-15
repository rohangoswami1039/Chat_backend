require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const { completeSignUp } = require("./src/Controllers/SendUserLink");
const userRoutes = require("./src/routes/userRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Routes of the Backend Server

//app.use("/api/users", userRoutes);
app.get("/complete-signup", completeSignUp);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

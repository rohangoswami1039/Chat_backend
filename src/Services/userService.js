// src/services/userService.js
const prisma = require("../prisma/prisma");
const { hashPassword } = require("../utils/bcryptUtils");

const createUser = async (email, name, password) => {
  const hashedPassword = await hashPassword(password);
  let userName = name.replace(/\s+/g, "") + Math.floor(Math.random() * 1000);
  console.log(userName);
  return await prisma.user.create({
    data: {
      username: userName,
      name,
      email,
      password: hashedPassword,
    },
  });
};

const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: { username },
  });
};

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

module.exports = { createUser, findUserByUsername, findUserByEmail };

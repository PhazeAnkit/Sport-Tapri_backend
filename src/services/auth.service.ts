import bcrypt from "bcrypt";
import { prisma } from "../db/prisma";
import { generateAccessToken } from "../utils/jwt";

const SALT = 10;

type regiterationPayload = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  interest?: string;
};

const authService = {
  async registerUser(data: regiterationPayload) {
    const email = data.email.trim().toLowerCase();
    const existingUser: number = await prisma.user.count({
      where: {
        email: email,
      },
    });

    if (existingUser > 0) {
      throw new Error("User Already Registered");
    }
    const hasedPassword = await bcrypt.hash(data.password, SALT);
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hasedPassword,
        interest: data.interest,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    return user;
  },

  async loginUser(data: { email: string; password: string }) {
    const email = data.email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        password: true,
      },
      where: {
        email,
      },
    });

    if (!user) throw new Error("User is not Registered");

    const passwordCheck = await bcrypt.compare(data.password, user.password);

    if (!passwordCheck) throw new Error("Invalid credentials");

    return generateAccessToken(user.id, user.email);
  },
};

export default authService;

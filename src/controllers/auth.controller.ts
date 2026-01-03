import { Request, Response } from "express";
import { error } from "node:console";
import authService from "../services/auth.service";

const authController = {
  async register(req: Request, res: Response) {
    const { username, email, firstName, lastName, password, interest } =
      req.body;
    if (
      !email ||
      !username ||
      !firstName ||
      !lastName ||
      !password ||
      !interest
    )
      return res.status(400).json({
        error: "Request is missing field",
      });

    try {
      const user = await authService.registerUser({
        username,
        email,
        firstName,
        lastName,
        password,
        interest,
      });
      return res.status(201).json({ data: user });
    } catch (error: any) {
      if (error.message == "User Already Registered")
        return res.status(409).json({ error: error.message });
      return res.status(500).json({ error: "Something went wrong" });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Request is missing field" });

    try {
      const user = await authService.loginUser({ email, password });
      return res.status(201).json({ data: user });
    } catch (error: any) {
      if (error.message == "User is not Registered")
        return res.status(404).json({ error: error.message });
      if (error.message == "Invalid credentials")
        return res.status(401).json({ error: error.message });
      return res.status(500).json({ error: "Something went wrong" });
    }
  },
};

export default authController;

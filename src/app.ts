import express from "express";
import authRoutes from "./routes/auth.routes";
import favouriteRoutes from "./routes/favourite.routes";
import { auth } from "./middlewares/auth.middleware";
import matchRoutes from "./routes/match.routes";
import { me } from "./controllers/me.controller";
import cookieParser from "cookie-parser";

import cors from "cors";

const app = express();
const serverStartTime = Date.now();

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(serverStartTime);
app.get("/me", auth, me);
app.use("/auth", authRoutes);
app.use("/favourite", favouriteRoutes);
app.use("/matches", matchRoutes);
app.post("/logout", (_req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({ message: "Logged out" });
});

app.get("/", (req, res) => {
  const uptimeMs = Date.now() - serverStartTime;
  const uptimeSeconds = Math.floor(uptimeMs / 1000);
  return res.status(200).json({
    message: "Welcome to Sport Tapri Server",
    serverUptime: `${uptimeSeconds}s`,
  });
});

export default app;

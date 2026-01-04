import express from "express";
import authRoutes from "./routes/auth.routes";
import favouriteRoutes from "./routes/favourite.routes";
import { auth } from "./middlewares/auth.middleware";
import { me } from "./controllers/me.controller";
import cookieParser from "cookie-parser";

const app = express();
const serverStartTime = Date.now();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(serverStartTime);

app.get("/me", auth, me);
app.use("/auth", authRoutes);
app.use("/favourite", favouriteRoutes);

app.post("/logout", (_req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
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



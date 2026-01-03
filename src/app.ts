import express from "express";
import authRoutes from "./routes/auth.routes";
import favouriteRoutes from "./routes/favourite.routes";

const app = express();
const serverStartTime = Date.now();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(serverStartTime);

app.use("/auth", authRoutes);
app.use("/favourite", favouriteRoutes);
app.get("/", (req, res) => {
  const uptimeMs = Date.now() - serverStartTime;
  const uptimeSeconds = Math.floor(uptimeMs / 1000);
  return res.status(200).json({
    message: "Welcome to Sport Tapri Server",
    serverUptime: `${uptimeSeconds}s`,
  });
});

export default app;

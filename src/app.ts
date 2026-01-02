import express from "express";

const app = express();
const serverStartTime = Date.now();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(serverStartTime);

app.get("/", (req, res) => {
  const uptimeMs = Date.now() - serverStartTime;
  const uptimeSeconds = Math.floor(uptimeMs / 1000);
  return res.status(200).json({
    message: "Welcome to Sport Tapri Server",
    serverUptime: `${uptimeSeconds}s`,
  });
});

export default app;

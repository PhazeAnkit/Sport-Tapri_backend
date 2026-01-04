import app from "./app";

const PORT = process.env.PORT || "4000";
app.listen(PORT, () => {
  console.log(`Server has been Started on http://localhost:${PORT}`);
});

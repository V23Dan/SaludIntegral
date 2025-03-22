import app from "./app.js";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/SaludIntegral", {
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

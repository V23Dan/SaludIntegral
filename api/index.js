import app from "./app.js";
import mongoose from "mongoose";
import { crearRolesIniciales } from "./src/controllers/rol.controller.js";

mongoose
  .connect("mongodb://localhost:27017/SaludIntegral", {})
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

mongoose.connection.once("open", async () => {
  await crearRolesIniciales();
  console.log("Roles inicializados");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

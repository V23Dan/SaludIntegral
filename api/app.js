import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();

const corsOp = {
    origin: "http://localhost:4200",
    credentials: true,
}

app.use(cors(corsOp));
app.use(express.json());
app.use(cookieParser());

//rutas

app.use("/auth", authRoutes);
app.use("/user", userRoutes)

export default app;
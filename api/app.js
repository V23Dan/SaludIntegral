import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import routinesRoutes from "./src/routes/routine.routes.js";
import PhysicalDataRoutes from "./src/routes/physicalData.routes.js";
import BodyReportRoutes from "./src/routes/bodyReport.routes.js";
import cookieParser from "cookie-parser";

const app = express();

const corsOp = {
    origin: "http://localhost:4200",
    credentials: true,
}

app.use(cors(corsOp));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/physicalData", PhysicalDataRoutes);
app.use("/routines", routinesRoutes);
app.use("/bodyReport", BodyReportRoutes);

export default app;
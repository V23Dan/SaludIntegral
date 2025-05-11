import mongoose from "mongoose";

const physicalDataSchema = new mongoose.Schema(
  {
    sexo: {
      type: String,
      required: true,
    },
    altura: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    peso: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    edad: {
      type: Number,
      required: true,
    },
    usuario: {
      type: String,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const PhysicalData = mongoose.model("PhysicalData", physicalDataSchema);
export default PhysicalData;

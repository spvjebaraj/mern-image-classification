const mongoose = require("mongoose");
const { Decimal128 } = require("mongodb");

const classificationSchema = new mongoose.Schema(
  {
    probability: {
      type: Decimal128,
    },
    probability_percent: {
      type: String,
    },
    class_name: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Classification = mongoose.model("Classification", classificationSchema);

module.exports = Classification;

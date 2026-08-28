const { Schema, model } = require("mongoose");

const goldPricingSchema = new Schema(
  {
    prices: {
      gold18: {
        type: Number,
        required: true,
        min: 0,
      },

      gold21: {
        type: Number,
        default: null,
        min: 0,
      },

      gold22: {
        type: Number,
        default: null,
        min: 0,
      },

      gold24: {
        type: Number,
        default: null,
        min: 0,
      },
    },

    profitPercent: {
      type: Number,
      default: 7,
      min: 0,
    },

    taxPercent: {
      type: Number,
      default: 9,
      min: 0,
    },

    source: {
      type: String,
      trim: true,
      default: "manual",
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = model("GoldPricing", goldPricingSchema);

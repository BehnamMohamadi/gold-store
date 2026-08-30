const { Schema, model } = require("mongoose");

const orderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "product is required"],
    },

    productSnapshot: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        required: true,
        trim: true,
      },

      sku: {
        type: String,
        required: true,
        trim: true,
      },

      coverImage: {
        type: String,
        default: "",
      },
    },

    quantity: {
      type: Number,
      required: true,
      min: [1, "quantity must be at least 1"],
    },

    pricingSnapshot: {
      goldWeight: {
        type: Number,
        required: true,
      },

      karat: {
        type: Number,
        required: true,
      },

      goldPricePerGram: {
        type: Number,
        required: true,
      },

      goldValue: {
        type: Number,
        required: true,
      },

      wage: {
        type: {
          type: String,
          enum: ["percent", "fixed"],
          required: true,
        },

        value: {
          type: Number,
          required: true,
        },

        enabled: {
          type: Boolean,
          required: true,
        },

        amount: {
          type: Number,
          required: true,
        },
      },

      profit: {
        percent: {
          type: Number,
          required: true,
        },

        amount: {
          type: Number,
          required: true,
        },
      },

      accessoriesPrice: {
        type: Number,
        required: true,
      },

      tax: {
        percent: {
          type: Number,
          required: true,
        },

        amount: {
          type: Number,
          required: true,
        },
      },
    },

    unitPrice: {
      type: Number,
      required: true,
      min: [0, "unit price cannot be negative"],
    },

    totalPrice: {
      type: Number,
      required: true,
      min: [0, "total price cannot be negative"],
    },
  },
  {
    _id: false,
  },
);

const orderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: [true, "order number is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },

    items: {
      type: [orderItemSchema],

      validate: {
        validator(items) {
          return Array.isArray(items) && items.length > 0;
        },

        message: "order must have at least one item",
      },

      required: true,
    },

    totalItems: {
      type: Number,
      required: true,
      min: [1, "total items must be at least 1"],
    },

    totalAmount: {
      type: Number,
      required: true,
      min: [0, "total amount cannot be negative"],
    },

    status: {
      type: String,

      enum: {
        values: ["pending", "confirmed", "cancelled", "expired"],

        message: "invalid order status",
      },

      default: "pending",
    },

    paymentStatus: {
      type: String,

      enum: {
        values: ["unpaid", "pending", "paid", "failed", "refunded"],

        message: "invalid payment status",
      },

      default: "unpaid",
    },

    priceExpiresAt: {
      type: Date,
      required: [true, "price expiration is required"],
    },
  },
  {
    timestamps: true,
  },
);

/*
  Each user can have only one
  pending/current order.
*/
orderSchema.index(
  {
    user: 1,
  },
  {
    unique: true,

    partialFilterExpression: {
      status: "pending",
    },
  },
);

module.exports = model("Order", orderSchema);

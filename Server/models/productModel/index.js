import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the size sub-schema for size variants
const sizeSchema = new Schema({
  value: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
    enum: ["ml", "l", "g", "kg"], // Adjust units as needed
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensure price is not negative
  },
});

// Main Product Schema
const productSchema = new Schema(
  {
    brandName: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    sizes: {
      type: [sizeSchema],
      validate: {
        validator: function (sizes) {
          return sizes.length > 0; // Ensure there's at least one size
        },
        message: "At least one size is required",
      },
    },
    stock: {
      type: Number,
      default: 1,
      min: [0, "Stock cannot be negative"],
    },
    image: {
      type: String,
      trim: true,
      // validate: {
      //   validator: function (url) {
      //     return /^https?:\/\/.+\.(jpg|jpeg|png|webp|svg|gif)$/.test(url); // Simple image URL validation
      //   },
      //   message: "Please provide a valid image URL",
      // },
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    isWeeklyOffer: {
      type: Boolean,
      default: false,
    },
    isVegan: {
      type: Boolean,
      default: false,
    },
    isLactosFree: {
      type: Boolean,
      default: false,
    },
    isGlutenFree: {
      type: Boolean,
      default: false,
    },
    offer: {
      discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        validate: {
          validator: function (value) {
            return value >= 0 && value <= 100; // Ensure the value is within range
          },
          message: "Discount percentage must be between 0 and 100",
        },
      },
      discountprice: {
        type: Number,
        default: 0,
        min: 0,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
        validate: {
          validator: function (endDate) {
            const startDate = this.get("offer.startDate");
            return !startDate || endDate >= startDate;
          },
          message: "End date must be after the start date",
        },
      },
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Middleware to validate discount price based on sizes
productSchema.pre("save", function (next) {
  const product = this;

  if (!product.sizes || product.sizes.length === 0) {
    return next(new Error("Product must have at least one size."));
  }

  // Calculate lowest price
  const lowestPrice = Math.min(...product.sizes.map((size) => size.price));

  // Ensure discount price is not greater than the lowest size price
  if (product.offer.discountprice > lowestPrice) {
    product.offer.discountprice = lowestPrice;
  }

  next();
});

// Middleware to validate discount price based on sizes
productSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.offer && update.offer.discountprice) {
    const product = await this.model.findOne(this.getQuery());
    if (!product) return next(new Error("Product not found"));

    const lowestPrice = Math.min(...product.sizes.map((size) => size.price));

    if (update.offer.discountprice > lowestPrice) {
      update.offer.discountprice = lowestPrice;
    }
  }

  next();
});

// Export the model
const Product = mongoose.model("Product", productSchema);
export default Product;

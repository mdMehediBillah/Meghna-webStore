import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categoryConfigurationSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    featuredProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    filters: {
      type: Map,
      of: String, // Key-value pairs for filter configuration
    },
    sortOptions: [
      {
        key: String,
        label: String,
      },
    ],
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "CategoryConfiguration",
  categoryConfigurationSchema
);

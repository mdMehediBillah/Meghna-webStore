import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the Category Schema
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // URL of the category image
      required: false,
    },
    isFeatured: {
      type: Boolean,
      default: false, // Indicates whether the category is featured
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
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Export the model
const Category = mongoose.model("Category", categorySchema);
export default Category;

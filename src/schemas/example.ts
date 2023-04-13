import mongoose, { Schema, Document } from "mongoose";

export interface Example extends Document {}

export const ExampleSchema = mongoose.model<Example>(
  "Example",
  new Schema({}, { timestamps: true })
);

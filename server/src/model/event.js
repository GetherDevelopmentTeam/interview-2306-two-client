import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  title: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: "",
  },
  time: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});

export const Event = model("event", eventSchema);

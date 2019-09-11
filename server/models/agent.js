const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be property schema
const AgentSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      maxlength: 100
    },
    agency: {
        required: true,
        type: String,
        maxlength: 1000
    },
    location: {
      required: true,
      type: String,
      maxlength: 1000
    },
    contact: {
      required: true,
      type: Number
    },
    region: {
      required: true,
      type: String
    },
    images: {
      type: Array,
      required: true,
    }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Agent", AgentSchema);

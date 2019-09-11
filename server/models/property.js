const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// geolocation schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

// this will be property schema
const PropertySchema = new Schema(
  {
    title: {
      required: true,
      type: String,
      maxlength: 100
    },
    price: {
      required: true,
      type: Number
    },
    description: {
      required: true,
      type: String,
      maxlength: 10000
    },
    propertyFor: {
      required: true,
      type: String
    },
    location: {
      required: true,
      type: String,
      maxlength: 1000
    },
    owner: {
      required: true,
      type: String,
      maxlength: 1000
    },
    bedrooms: {
      type: Number,
      maxlength: 1000
    },
    area: {
      type: Number,
      maxlength: 10000
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
  //  geometry: GeoSchema
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Property", PropertySchema);

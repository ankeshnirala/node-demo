const mongoose = require("mongoose");

const pgSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
      index: true,
    },

    state: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
    },

    longitude: {
      type: Number,
    },

    genderType: {
      type: String,
      enum: ["MALE", "FEMALE", "UNISEX"],
      required: true,
    },

    totalBeds: {
      type: Number,
      default: 0,
    },

    availableBeds: {
      type: Number,
      default: 0,
    },

    rentStartingFrom: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
      index: true,
    },

    amenities: {
      wifi: {
        type: Boolean,
        default: false,
      },

      food: {
        type: Boolean,
        default: false,
      },

      ac: {
        type: Boolean,
        default: false,
      },

      parking: {
        type: Boolean,
        default: false,
      },

      washingMachine: {
        type: Boolean,
        default: false,
      },

      gym: {
        type: Boolean,
        default: false,
      },

      cctv: {
        type: Boolean,
        default: false,
      },

      powerBackup: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PG", pgSchema);
const { default: mongoose } = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    governmentId: { type: String },
    verificationStatus: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

ownerSchema.virtual('pgs', {
  ref: 'PG',
  localField: '_id',
  foreignField: 'owner',
});

module.exports = mongoose.model('Owner',ownerSchema)

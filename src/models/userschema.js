const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    role: { type: String, enum: ['TENANT', 'OWNER', 'ADMIN'], default: 'TENANT' },
    avatar: { type: String },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model('User',userSchema);

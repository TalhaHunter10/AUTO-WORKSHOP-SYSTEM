const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name !"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please add an email !"],
    },
    phoneno: {
      type: String,
      unique: false,
      required: [true, "Please add a phone no. !"],
    },
    password: {
      type: String,
      required: [true, "Password is required !"],
    },
    status: {
      type: String,
      required: [true, "Status could not be set"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

//Encrypt Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Token = require("../models/tokenModel");

const sendEmail = require("../utils/sendEmail");
const VerificationCode = require("../models/verificationCodeModel");
const WM = require("../models/wmModel");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "6h" });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneno } = req.body;

  if (!name || !email || !password || !phoneno) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const userExistsEmail = await User.findOne({ email });

  if (userExistsEmail) {
    if (userExistsEmail.status === "user-pending") {
      const verificationCodeValue = Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase();

      const verificationCode = await VerificationCode.create({
        code: verificationCodeValue,
        user: userExistsEmail._id,
      });

      const message = `
  <h2>Hello ${name}</h2>
  <p>Kindly enter the code below on the verification screen</p>
  <p>This code is valid for 1 hour !!!</p>
  <h3>Verification Code: ${verificationCodeValue}</h3>

  <p>Regards...</p>
  <p>Capital Autos</p>
`;

      const subject =
        "Email Verification for Captial Autos Account Registration";
      const send_to = email;
      const sent_from = process.env.EMAIL_USER;

      try {
        await sendEmail(subject, message, send_to, sent_from);
      } catch (error) {
        res.status(500);
        throw new Error("Email could not be Sent. Please try again !");
      }

      res.status(200).json({
        _id: userExistsEmail._id,
        message: "Verification Code Sent Successfully !",
      });
    }

    res.status(400).json({ message: "Email has already been registered",status:400, type: "exists" });
    throw new Error("Email has already been registered");
  }

  const user = await User.create({
    name,
    email,
    password,
    phoneno,
    status: "user-pending",
  });

  if (user) {
    const verificationCodeValue = Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase();

    const verificationCode = await VerificationCode.create({
      code: verificationCodeValue,
      user: user._id,
    });

    const message = `
  <h2>Hello ${user.name}</h2>
  <p>Kindly enter the code below on the verification screen</p>
  <p>This code is valid for 1 hour !!!</p>
  <h3>Verification Code: ${verificationCodeValue}</h3>

  <p>Regards...</p>
  <p>Capital Autos</p>
`;

    const subject = "Email Verification for Captial Autos Account Registration";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    try {
      await sendEmail(subject, message, send_to, sent_from);
    } catch (error) {
      res.status(500);
      throw new Error("Email could not be Sent. Please try again !");
    }

    res.status(201).json({
      _id: user._id,
      message: "Verification Code Sent Successfully !",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    res.status(400);
    throw new Error("Please provide both email and verification code");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ message: "User not found",status:400, type: "notFound" });
    throw new Error("Invalid user data");
  }

  const codeEntry = await VerificationCode.findOne({
    code: verificationCode,
    user: user._id,
  });

  if (!codeEntry) {
    res.status(400).json({ message: "Invalid verification code",status:400, type: "inValid" });
    throw new Error("Invalid verification code");
  }

  const isExpired = new Date() > codeEntry.expiresAt;
  if (isExpired) {
    res.status(400).json({ message: "Verification code has expired",status:400, type: "expired" });
    throw new Error("Verification code has expired");
  }

  user.status = "user";
  await user.save();

  // Optionally, you can delete the verification code after successful verification
  await VerificationCode.deleteOne({ _id: codeEntry._id });

  res.status(200).json({
    _id: user._id,
    message: "Email Verified Successfully!",
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const user = await User.findOne({ email, status: "user" });

  if(user){
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    res.status(400).json({ message: "Invalid email or password !",status:400, type: "inValid" });
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 7200),
    sameSite: "none",
    secure: true,
  });

  const { _id, name, phoneno, status } = user;

    res.status(200).json({
      _id,
      name,
      email,
      phoneno,
      status,
      token,
    });
}

const wm = await WM.findOne({ email, status: "wm" });

if(wm){
  const passwordIsCorrect = password === wm.password;

  if (!passwordIsCorrect) {
    res.status(400).json({ message: "Invalid email or password !",status:400, type: "inValid" });
    throw new Error("Invalid email or password");
  }

  const token = generateToken(wm._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 7200),
    sameSite: "none",
    secure: true,
  });

  const { _id, name, phoneno, status } = wm;

  
    res.status(200).json({
      _id,
      name,
      email,
      phoneno,
      status,
      token,
    });
}

res.status(400).json({ message: "User not found !",status:400, type: "notFound" });
 
});

const registerWM = asyncHandler(async (req, res) => {
  const { name, email, password, phoneno } = req.body;

  if (!name || !email || !password || !phoneno) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const wmExistsEmail = await WM.findOne({ email });

  if (wmExistsEmail) {
    res.status(400);
    throw new Error("Email has already been registered");
  }

  const wm = await WM.create({
    name,
    email,
    password,
    phoneno,
    status: "wm",
  });

  if (wm) {
    res.status(201).json({
      _id: wm._id,
      name: wm.name,
      email: wm.email,
      phoneno: wm.phoneno,
      status: wm.status,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.json(false);
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    const user = await User.findById(verified.id).select("-password");
    if (user) {
      res.json({
        verified: true,
        id: verified.id,
        status: user.status,
        user: user,
        token: token,
      });
    }
    const wm = await WM.findById(verified.id).select("-password");
    if (wm) {
      res.json({
        verified: true,
        id: verified.id,
        status: wm.status,
        user: wm,
        token: token,
      });
      res.json(false);
    }
  }

  return res.json(false);
});

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const wm = await WM.findById(req.user._id);

  if (!user && !wm) {
    res.status(404);
    throw new Error("User not Found!!");
  }

  const { oldpassword, password } = req.body;
  if (!oldpassword || !password) {
    res.status(400);
    throw new Error("Please add old and new password");
  }

  

  if (user) {
    const passwordIsCorrect = await bcrypt.compare(oldpassword, user.password);
    if (passwordIsCorrect) {
      user.password = password;
      await user.save();

      res.status(200).json({ message: "Password Change Successful" });
    } else {
      res
        .status(400)
        .json({ message: "Old password is incorrect", status: 400 });
      throw new Error("Old password is incorrect");
    }
  } else if (wm) {
    const passwordIsCorrect = await bcrypt.compare(oldpassword, wm.password);
    if (passwordIsCorrect) {
      wm.password = password;
      await wm.save();

      res.status(200).json({ message: "Password Change Successful" });
    } else {
      res
        .status(400)
        .json({ message: "Old password is incorrect", status: 400 });
      throw new Error("Old password is incorrect");
    }
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  const wm = await WM.findOne({ email });

  if (!user && !wm) {
    res.status(404).json({ message: "User not Found", status: 404 });
    throw new Error(
      "This email is not registered with any account. Please Try Again"
    );
  }

  if (user) {
    if (user.status === "user-pending") {
      res.status(400).json({
        message: "Please verify your email first",
        status: 400,
        type: "notVerified",
      });
      throw new Error("Please verify your email first");
    }

    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }

    const resetToken = Math.random().toString(36).slice(2, 8).toUpperCase();

    await new Token({
      userId: user._id,
      token: resetToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * (60 * 1000), //30 minutes
    }).save();

    const message = `
  <h2>Hello ${user.name}</h2>
  <p>Below is the code to reset password for your account.</p>
  <p>The code is valid for 30 minutes.</p>

  <h3>Recovery Code: ${resetToken}</h3>

  <p>Regards...</p>
  <p>Capital Autos</p>
`;

    const subject = "Recovery code to reset password for Capital Autos Account";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    try {
      await sendEmail(subject, message, send_to, sent_from);
      res.status(200).json({ success: true, message: "Reset Email Sent" });
    } catch (error) {
      res.status(500);
      throw new Error("Email could not be Sent. Please try again !");
    }
  }

  if (wm) {
    let token = await Token.findOne({ userId: wm._id });
    if (token) {
      await token.deleteOne();
    }

    const resetToken = Math.random().toString(36).slice(2, 8).toUpperCase();

    await new Token({
      userId: wm._id,
      token: resetToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * (60 * 1000), //30 minutes
    }).save();

    const message = `
  <h2>Hello ${wm.name}</h2>
  <p>Below is the code to reset password for your account.</p>
  <p>The code is valid for 30 minutes.</p>

  <h3>Recovery Code: ${resetToken}</h3>

  <p>Regards...</p>
  <p>Capital Autos</p>
`;

    const subject = "Recovery code to reset password for Capital Autos Account";
    const send_to = wm.email;
    const sent_from = process.env.EMAIL_USER;

    try {
      await sendEmail(subject, message, send_to, sent_from);
      res.status(200).json({ success: true, message: "Reset Email Sent" });
    } catch (error) {
      res.status(500);
      throw new Error("Email could not be Sent. Please try again !");
    }
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { resetToken } = req.params;

  if (!email || !password || !resetToken) {
    res.status(400);
    throw new Error("Please provide email, password and reset token");
  }

  const user = await User.findOne({
    email,
  });

  const wm = await WM.findOne({
    email,
  });

  if (!user && !wm) {
    res.status(404);
    throw new Error("User not Found");
  }

  const userToken = await Token.findOne({
    token: resetToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res
      .status(500)
      .json({ message: "Invalid or Expired Token !", status: 500 });
    throw new Error("Invalid or Expired Token !");
  }

  const wmToken = await Token.findOne({
    token: resetToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!wmToken) {
    res
      .status(500)
      .json({ message: "Invalid or Expired Token !", status: 500 });
    throw new Error("Invalid or Expired Token !");
  }

  if (userToken) {
    const user = await User.findById(userToken.userId);
    if (user) {
      user.password = password;
      await user.save();
      await userToken.deleteOne();
      res.status(200).json({ message: "Password Reset Successful" });
    }
  }

  if (wmToken) {
    const wm = await WM.findById(wmToken.userId);
    if (wm) {
      wm.password = password;
      await wm.save();
      await wmToken.deleteOne();
      res.status(200).json({ message: "Password Reset Successful" });
    }
  }
});

const logOut = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

module.exports = {
  registerUser,
  verifyEmail,
  login,
  logOut,
  loginStatus,
  forgotPassword,
  resetPassword,
  changePassword,
  registerWM,
};

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
 
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role} = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res, next) => {
  try {
    // const { credential } = req.body;
    const credential =
    req.body?.credential ||
    req.body?.id_token ||
    req.query?.credential ||
    req.query?.id_token;

    if (!credential) {
      res.status(400);
      throw new Error("Google credential is required");
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture } = payload;

    if (!email) {
      res.status(400);
      throw new Error("Google account email not found");
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || "Google User",
        email,
        password: "GOOGLE_AUTH_USER",
        role: "user",
        avatar: picture || "",
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

const googleCallback = async (req, res, next) => {
  try {
    
    const credential =
    req.body?.credential ||
    req.body?.id_token ||
    req.query?.credential ||
    req.query?.id_token;

    if (!credential) {
      res.status(400);
      throw new Error("Google credential is required");
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || "Google User",
        email,
        password: "GOOGLE_AUTH_USER",
        role: "user",
        avatar: picture || "",
      });
    }

    const token = generateToken(user._id);

    const redirectPath =
    user.role === "admin" ? "/" : "/submit-ticket";

    // return res.redirect(redirectUrl);
    return res.redirect(
  `${frontendUrl}/google-success?token=${token}&role=${user.role}&redirect=${redirectPath}&name=${encodeURIComponent(
    user.name
  )}&email=${encodeURIComponent(user.email)}`
);
  } catch (error) {
    next(error);
  }
 };


 const startGoogleAuth = (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
     redirect_uri: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    response_type: "id_token",
    scope: "openid email profile",
    nonce: Date.now().toString(),
    prompt: "select_account",
    response_mode: "form_post",
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
};
module.exports = { registerUser, loginUser , googleLogin, googleCallback, startGoogleAuth};
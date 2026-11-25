const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const { apiResponse } = require("../utils/apiResponse");

// ==========================================
// REGISTER
// ==========================================
const register = async (req, res, next) =>  {
  try {
    const { name, email, password, phone } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json(
        apiResponse(false, "Name, email and password are required", null)
      );
    }

    if (password.length < 8) {
      return res.status(400).json(
        apiResponse(false, "Password must be at least 8 characters long", null)
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 2. Check whether the email already exists
    const existingUser = await pool.query(
      `SELECT id FROM users
       WHERE LOWER(email) = LOWER($1)
       AND deleted_at IS NULL`,
      [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json(
        apiResponse(false, "Email address already registered", null)
      );
    }

    // 3. Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 4. Create customer account
    const userResult = await pool.query(
      `INSERT INTO users (name, email, password_hash, user_type, account_status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, user_type`,
      [name.trim(), normalizedEmail, passwordHash, "CUSTOMER", "ACTIVE"]
    );

    const user = userResult.rows[0];

    // 5. Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userType: user.user_type,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // 6. Send success response
    return res.status(201).json(
      apiResponse(true, "Registration successful", {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
        },
      })
    );

  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json(
        apiResponse(false, "Email address already registered", null)
      );
    }

    next(error);
  }
};

// ==========================================
// LOGIN
// ==========================================
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const userResult = await pool.query(
      `SELECT id, name, email, password_hash, user_type, account_status
       FROM users
       WHERE email = $1 AND deleted_at IS NULL`,
      [email.toLowerCase()]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json(
        apiResponse(false, "Invalid email or password", null)
      );
    }

    const user = userResult.rows[0];

    // 2. Account status check
    if (user.account_status !== "ACTIVE") {
      return res.status(403).json(
        apiResponse(false, "Your account is not active. Please contact support.", null)
      );
    }

    // 3. Password check
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json(
        apiResponse(false, "Invalid email or password", null)
      );
    }

    // 4. Get profile
    let profile = null;

    if (user.user_type === "CUSTOMER") {
      const profileResult = await pool.query(
        `SELECT id, phone, height, weight
         FROM customer_profiles
         WHERE user_id = $1`,
        [user.id]
      );

      profile = profileResult.rows[0] || null;

    } else if (user.user_type === "STAFF") {
      const profileResult = await pool.query(
        `SELECT sp.id, sp.employee_code, r.name AS role
         FROM staff_profiles sp
         JOIN roles r ON r.id = sp.role_id
         WHERE sp.user_id = $1`,
        [user.id]
      );

      profile = profileResult.rows[0] || null;
    }

    // 5. Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userType: user.user_type,
        role: profile?.role || null,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // 6. Send response
    return res.status(200).json(
      apiResponse(true, "Login successful", {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
          profile,
        },
      })
    );

  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET CURRENT USER
// ==========================================
const getMe = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json(
        apiResponse(false, "No token provided", null)
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userResult = await pool.query(
      `SELECT id, name, email, user_type
       FROM users
       WHERE id = $1`,
      [decoded.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json(
        apiResponse(false, "User not found", null)
      );
    }

    return res.status(200).json(
      apiResponse(true, "User fetched", userResult.rows[0])
    );

  } catch (error) {
    next(error);
  }
};

// ==========================================
// EXPORT
// ==========================================
module.exports = { register, login, getMe };
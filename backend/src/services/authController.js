const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const { apiResponse } = require("../utils/apiResponse");

// ==========================================
// REGISTER
// ==========================================
const register = async (req, res, next) => {
  console.log(">>> REGISTER FUNCTION HIT (authController.js)");

  let client;

  try {
    const { name, email, password, phone } = req.body;

    // Validate required fields
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

    // Get database connection
    client = await pool.connect();

    // Start transaction
    await client.query("BEGIN");

    // Check existing email
    const existingUser = await client.query(
      `SELECT id FROM users
       WHERE LOWER(email) = LOWER($1)
       AND deleted_at IS NULL`,
      [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
      await client.query("ROLLBACK");

      return res.status(409).json(
        apiResponse(false, "Email address already registered", null)
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Registration is always CUSTOMER
    const userType = "CUSTOMER";

    // Insert into users table
    const userResult = await client.query(
      `INSERT INTO users (
        name,
        email,
        password_hash,
        user_type,
        account_status
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, user_type`,
      [
        name.trim(),
        normalizedEmail,
        passwordHash,
        userType,
        "ACTIVE"
      ]
    );

    const user = userResult.rows[0];
    console.log(">>> USER CREATED:", user);

    // Automatically create customer profile
    if (user.user_type === "CUSTOMER") {
      const profileResult = await client.query(
        `INSERT INTO customer_profiles (
          user_id,
          phone
        )
        VALUES ($1, $2)
        RETURNING id, user_id`,
        [
          user.id,
          phone?.trim() || null
        ]
      );

      console.log(">>> PROFILE CREATED:", profileResult.rows[0]);
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userType: user.user_type
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
      }
    );

    // Commit transaction
    await client.query("COMMIT");
    console.log(">>> TRANSACTION COMMITTED");

    return res.status(201).json(
      apiResponse(true, "Registration successful", {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.user_type
        }
      })
    );

  } catch (error) {
    console.error(">>> REGISTER ERROR:", error.message, error.code);

    // Rollback transaction if an error occurs
    if (client) {
      await client.query("ROLLBACK").catch(() => {});
    }

    if (error.code === "23505") {
      return res.status(409).json(
        apiResponse(false, "A record with this unique value already exists", null)
      );
    }

    next(error);

  } finally {
    if (client) {
      client.release();
    }
  }
};


// ==========================================
// LOGIN
// ==========================================
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

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

    if (user.account_status !== "ACTIVE") {
      return res.status(403).json(
        apiResponse(false, "Your account is not active. Please contact support.", null)
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordValid) {
      return res.status(401).json(
        apiResponse(false, "Invalid email or password", null)
      );
    }

    let profile = null;

    if (user.user_type === "CUSTOMER") {
      const profileResult = await pool.query(
        `SELECT id, phone, date_of_birth, height, weight
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

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userType: user.user_type,
        role: profile?.role || null
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
      }
    );

    return res.status(200).json(
      apiResponse(true, "Login successful", {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
          profile
        }
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

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

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
// EXPORT CONTROLLERS
// ==========================================
module.exports = {
  register,
  login,
  getMe
};
import { Strategy as LocalStrategy } from "passport-local";
import { pool } from "../models/database.js";
import bcrypt from "bcrypt";
import passport from "passport";

export function initialize() {
  const authenticateUser = async (email, password, done) => {
    const [user] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    if (!user[0]) {
      return done(null, false);
    }

    try {
      if (await bcrypt.compare(password, user[0].password)) {
        return done(null, user[0]);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => {
    done(null, { id: user.id, email: user.email });
  });
  passport.deserializeUser((user, done) => {
    pool.query("SELECT * FROM users WHERE id = ?", [user.id]);
    return done(null, user);
  });
}

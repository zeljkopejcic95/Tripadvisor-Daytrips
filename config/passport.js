import { Strategy as LocalStrategy } from "passport-local";
import { pool } from "../models/database.js";
import bcrypt from "bcrypt";
import passport from "passport";

export function initialize() {
  const authenticateUser = async (username, password, done) => {
    const [user] = await pool.query(`SELECT * FROM users WHERE username = ?`, [
      username,
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

  passport.use(new LocalStrategy(authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return done(null, id);
  });
}

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../database/models/userModel";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '1045948515949-ohdj517qol8ob5t0f7odv7cb3r6k27o7.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4000/users/auth/google/callback'
  },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await UserModel.findOne({ email: profile.emails?.[0].value });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await UserModel.create({
          profileImage: "",
          username: profile.displayName,
          email: profile.emails?.[0].value,
          password: "", 
          role: "user",
        });

        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

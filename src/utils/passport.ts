import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../database/models/userModel";
import { sendEmail } from "../services/emailService";
import { newUserNotificationTemplate } from "../templates/emailTemplete";
import { GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config";

passport.use(new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID || '1045948515949-1r8ngef631l9vi0hqr6il06js0h82csu.apps.googleusercontent.com', 
    clientSecret: GOOGLE_CLIENT_SECRET || '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',
    callbackURL: GOOGLE_CALLBACK_URL || 'https://devsoso-bn.onrender.com/users/auth/google/callback',
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

         const adminUsers = await UserModel.find({ role: "admin" });
        for (const admin of adminUsers) {
          await sendEmail(
            admin.email,
            "New User Registration via Google",
            newUserNotificationTemplate(newUser.username, newUser.email)
          );
        }


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

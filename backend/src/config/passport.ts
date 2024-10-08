import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import User, { UserDocument } from '../models/User';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
    try {
      let user: UserDocument | null = await User.findOne({ googleId: profile.id });

      if (!user) {
        // Crear un nuevo usuario si no existe
        user = await User.create({
          googleId: profile.id,
          email: profile.emails![0].value,
          name: profile.displayName
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Cambia el tipo de 'user' a cualquier tipo compatible (por ejemplo, { id: string }).
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  User.findById(id, (err: any, user: UserDocument | null) => {
    done(err, user);
  });
});

export default passport;




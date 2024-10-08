declare module 'passport' {
    import { Request } from 'express';
    import { Strategy as PassportStrategy } from 'passport-strategy';
  
    export interface Passport {
      use(strategy: PassportStrategy): this;
      authenticate(strategy: string, callback?: (err: any, user?: any, info?: any) => void): any;
      serializeUser(fn: (user: any, done: (err: any, id?: any) => void) => void): void;
      deserializeUser(fn: (id: any, done: (err: any, user?: any) => void) => void): void;
      initialize(options?: { userProperty: string }): any;
      session(options?: { pauseStream: boolean }): any;
    }
  
    const passport: Passport;
    export default passport;
  }
  
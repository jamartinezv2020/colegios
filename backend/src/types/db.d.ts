declare module './db' {
    const connectDB: () => Promise<void>;
    export default connectDB;
  }
  
  
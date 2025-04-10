export const ENV_CONFIG = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/hexagonal-db',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

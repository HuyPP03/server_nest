export default () => ({
  app: {
    port: parseInt(process.env.PORT) || 8080,
    saltOrRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  },
  database: {
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_DATABASE || 'server_nest',
  },
});

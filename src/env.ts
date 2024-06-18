export default () => ({
  app: {
    port: parseInt(process.env.PORT) || 8080,
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    allowedOrigins: (process.env.ALLOWED_ORIGINS || '').split(','),
    saltOrRounds: parseInt(process.env.SALT_ROUNDS) || 10,
    jwtSecret: process.env.JWT_SECRET || '123456',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2 days',
  },
  database: {
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_DATABASE || 'server_nest',
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT, 10) || 587,
    user: process.env.MAIL_USER || 'phuhuyqhqb@gmail.com',
    pass: process.env.MAIL_PASS || 'rxoi awpy iyfb kmar',
    from: process.env.MAIL_FROM_NAME || 'phuhuyqhqb@gmail.com',
  },
});

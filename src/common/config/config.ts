import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    jwtSecret: process.env.JWT_SECRET,
    api_secret: process.env.API_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    port: process.env.PORT,
    api_key: process.env.API_KEY,
    // emailPort: process.env.PORT_OF_EMAIL,
    // emailHost: process.env.HOST_OF_EMAIL,
    // emailFrom: process.env.EMAIL_OF_USER,
    // emailAppPasswod: process.env.EMAIL_USER_APP_PASSWORD,
    // cloud_name: process.env.CLOUD_NAME,
    // smtp_username: process.env.SMTP_USERNAME,
    // smtp_password: process.env.SMTP_PASSWORD,
    // smtp_port: process.env.SMTP_PORT,
    // smtp_hostname: process.env.SMTP_HOSTNAME,
}));

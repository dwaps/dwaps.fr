// Config env for Vercel
const { writeFileSync } = require("fs");
const { resolve } = require("path");

require("dotenv").config("./src/.env");

const envVars = `export const environment = {
    SMS: {
      API_KEY: '${process.env.SMS_API_KEY}',
      LOGIN: '${process.env.SMS_LOGIN}',
      SALT: ${process.env.SMS_SALT},
    },
}`;

try {
  writeFileSync(
    resolve("src", "environments", "environment.development.ts"),
    envVars
  );
} catch (e) {
  console.error(e);
}

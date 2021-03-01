const bcrypt = require('bcrypt');
const { config } = require('dotenv');
const jwt = require('jsonwebtoken');

config();

const secretKey = process.env.JWT_KEY;

async function hashPassword(password) {
  const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
  const hashed = await bcrypt.hashSync(password, salt);
  return hashed;
};

async function generateToken (payload, secret = secretKey) {
    const token = await jwt.sign(payload, secret, { expiresIn: "1d" });
    return token;
  }

module.exports = {
  generateToken,
  hashPassword
};

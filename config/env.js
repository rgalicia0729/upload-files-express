require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV;
const NODE_PORT = process.env.NODE_PORT;

const PATH_FILE = process.env.PATH_FILE;

module.exports = {
  NODE_ENV,
  NODE_PORT,
  PATH_FILE,
}

const Pool =require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
user:process.env.User,
password:process.env.Password,
host:process.env.Host,
port:5432,
database:process.env.Database
})

module.exports = pool;

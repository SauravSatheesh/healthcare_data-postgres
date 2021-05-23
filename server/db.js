const Pool =require("pg").Pool;


const pool = new Pool({
user:"postgres",
password:"saurav123",
host:"localhost",
port:5432,
database:"healthcaredata"
})

module.exports = pool;

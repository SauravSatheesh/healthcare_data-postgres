const pool =require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.loginClient = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const client = await pool.query(
        "SELECT * FROM client WHERE username=$1 ",
        [username]
    )
    if (client.rows[0]) {
       const login = await bcrypt.compare(password,client.rows[0].password);
        if (login) {

            const token = jwt.sign({ id: client.rows[0].client_id }, process.env.jwtSecret, { expiresIn: 3600 });
            res.status(200).json({
                token,
                client: {
                    id: client.rows[0].client_id,
                    username: client.rows[0].username
                }
            });

        }
        else {
            res.status(404).json({ message: "Invalid credentials" });
        }
    }
    else {
        res.status(404).json({ message: "Invalid credentials" });
    }
}

exports.addClient = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const password2=req.body.password2;
    const client = await pool.query(
        "SELECT * FROM client WHERE username=$1",
        [username]
    )
    if (client.rows.length>0) {
        res.status(409).json({ message: "Username already taken" });
    }
    else {
        if(password!==password2){
            return res.status(404).json({message:"Password does not match"})
        }
        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error('Something went wrong with bcrypt');
        const hash = await bcrypt.hash(password, salt);
        if (!hash) throw Error('Something went wrong hashing the password');
        const newClient = await pool.query(
         "INSERT INTO client (username,password) VALUES ($1,$2) RETURNING *",
        [username,hash]
        );
        const token = jwt.sign({ id:newClient.rows[0].client_id}, process.env.jwtSecret, { expiresIn: 3600 });
        res.status(200).json({token,
            client:{ id:newClient.rows[0].client_id,
                username:newClient.rows[0].username}})
    }
}


exports.getClient = async (req, res) => {
    try {
        const client = await pool.query(
            "SELECT client_id,username FROM client WHERE client_id=$1",
            [req.client.id]
        )
        res.status(200).json({id:client.rows[0].client_id,username:client.rows[0].username});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
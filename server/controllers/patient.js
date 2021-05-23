const pool=require("../db");

exports.getPatients=async(req,res)=>{
    try {
        const patients =await pool.query(
          "SELECT * FROM patient"  
        )
        res.status(200).json(patients.rows);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}


exports.addPatient = async(req,res)=>{
    const patient=req.body;
    try {
       const newPatient= await pool.query(
           "INSERT INTO patient  (first_name,last_name,email,phone) VALUES ($1,$2,$3,$4) RETURNING *",
           [patient.first_name,patient.last_name,patient.email,patient.phone]
       );
       res.status(200).json(newPatient.rows[0]);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

exports.updatePatient = async(req,res)=>{
const id =req.params.id; 
const newDetails=req.body;   
try {
const patient= await pool.query(
    "UPDATE patient SET first_name=$1,last_name=$2,email=$3,phone=$4 WHERE patient_id=$5 RETURNING *",
     [newDetails.first_name,newDetails.last_name,newDetails.email,newDetails.phone,id]
)
 res.status(200).json(patient.rows[0]);
} catch (error) {
    res.status(404).json({message:"No patient with this id"});
}
}

exports.deletePatient = async(req,res)=>{
    const id =req.params.id;
    try {
        const patient= await pool.query(
            "SELECT * FROM patient WHERE patient_id=$1",
            [id]
        )
        if(patient.rows[0])
       { await pool.query(
            "DELETE FROM patient WHERE patient_id=$1",
            [id]
        )
        res.status(200).json({message:"Patient details deleted successfully"})}
        else{res.status(404).json({message:"No patient with this id "}) }
    } catch (error) {
       res.status(404).json({message:"No patient with this id "}) 
    }
}


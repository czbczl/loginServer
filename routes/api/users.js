//@login &register
const express = require("express");
const router = express.Router();
router.get("/test",(req,res) => {
    // res.json({msg:"login works"})
    console.log("jlS")
})
module.exports=router;

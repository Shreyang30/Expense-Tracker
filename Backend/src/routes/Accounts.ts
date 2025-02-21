import express from "express";
import db from "../Database/database";
import ensureAuthenticated from "../middleware/islogged";

const router=express.Router();

router.post("/addaccount",ensureAuthenticated,async (req,res)=>{
    try {const {id,accountname,balance}=req.body;
    const newAccount= await db.query("INSERT INTO accounts (id,accountname,balance) VALUES ($1,$2,$3)",[id,accountname,balance]);
    console.log(newAccount);
    res.send("Succesfully added account");}
    catch(err:any){
        console.log(err);
        res.send(err.message)
    }
})

router.post("/deleteaccount",ensureAuthenticated,async(req,res) => {
    try{const accountid=req.body.accountid;
    await db.query("DELETE FROM accounts WHERE accountid=$1",[accountid]);
    res.send("Successfully deleted the account"); }   
    catch(err:any){
        console.log(err);
        res.send(err.message);
    }
})

export default router;
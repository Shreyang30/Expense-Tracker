import express from"express";
import db from "../Database/database";
import ensureAuthenticated from "../middleware/islogged";

const router = express.Router();

router.get("/Income",ensureAuthenticated,async(req,res)=>{
    console.log(req.user);
    res.send("Income");
})

router.get("/Expense",ensureAuthenticated,async(req,res)=>{
    res.send("Expense");
})


router.post("/Expense",ensureAuthenticated,async(req,res) =>{
    try{
        const date = new Date(req.body.date);
        const id=req.user!.id;
        const {amount,description,type,accountid,categoryid} = req.body;
        await db.query("INSERT INTO transactions (id,accountid,categoryid,amount,transactiondate,description,type) VALUES ($1,$2,$3,$4,$5,$6,$7)",[id,accountid,categoryid,amount,date,description,type]);
        await db.query("UPDATE accounts SET balance = balance - $1 WHERE id = $2",[amount,id]);
        console.log("Successfully added");
        res.send("Successfully added transaction");
    } catch(err:any){
        console.log(err);
        res.statusCode=500;
        res.send(err.message);
    }
})

router.post("/Income",ensureAuthenticated,async(req,res) =>{
    try{
        const date = new Date(req.body.date);
        const {amount,description,type,id,accountid,categoryid} = req.body;
        await db.query("INSERT INTO transactions (id,accountid,categoryid,amount,transactiondate,description,type) VALUES ($1,$2,$3,$4,$5,$6,$7)",[id,accountid,categoryid,amount,date,description,type]);
        await db.query("UPDATE accounts SET balance = balance + $1 WHERE id = $2",[amount,id]);
        console.log("Successfully added");
        res.send("Successfully added transaction");
    } catch(err:any){
        console.log(err);
        res.statusCode=500;
        res.send(err.message);
    }
})

export default router;
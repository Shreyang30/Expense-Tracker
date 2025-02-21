import express from "express";
import db from "../Database/database";
import ensureAuthenticated from "../middleware/islogged";

const router = express.Router();

router.post("/addcategory",ensureAuthenticated,async(req,res) => {
    try {const {id,categoryname}=req.body;
    const newCategory= await db.query("INSERT INTO categories (id,categoryname) VALUES ($1,$2)",[id,categoryname]);
    console.log(newCategory);
    res.send("Succesfully added Category");}
    catch(err:any){
        console.log(err);
        res.send(err.message)
    }
})

router.post("/deletecategory",ensureAuthenticated,async(req,res) => {
    try{
        const {id}=req.body;
        await db.query("DELETE FROM categories WHERE id=$1",[id]);
        res.send("Succesfully deleted Category");
    }catch(err:any){
        console.log(err);
        res.send(err.message);    
    }
})

export default router;
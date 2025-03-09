import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import db from "../Database/database";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import env from "dotenv"

const router = express.Router();
const saltRounds =12;


router.get("/logout", (req, res) => {
    req.logout( function(err){
        if(err) {
            return (err);
        }
        req.session.destroy((sessionErr) => {
            if (sessionErr) {
                return res.status(500).json({ message: "Logout failed", error: sessionErr });
            }
    return res.json({message: "User successfully logged out"})
        });
    });
  });


router.get("/home",(req,res) => {
    res.send("Home");
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err:Error | null, user:Express.User | false) => {
        if (err) return res.status(500).json({ message: "Server error", error: err });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        req.logIn(user, (loginErr) => {
            if (loginErr) return res.status(500).json({ message: "Login error", error: loginErr });

            return res.json({ message: "Login successful", user });
        });
    })(req, res, next);
});

router.get("/auth/google",
    passport.authenticate("google", {
        scope:["email","profile"],
    })
)

router.get("/auth/google/home",
    passport.authenticate("google",{session:false}) , (req,res) => {
        const user = req.user as any;
        console.log(user);
        
        const token= jwt.sign({id:user?.id,email:user?.email.value},process.env.SESSION_SECRET as string,{expiresIn:"1h"})
        
        const frontendurl= req.headers.origin || "http://localhost:5173";
        console.log(frontendurl);
        res.redirect(`${frontendurl}/signin?token=${token}`)
    }
    )

router.post("/signup",async (req,res) => {
    const name:string = req.body.name;
    const email:string = req.body.email;
    const password = req.body.password;
    
    try{
         const check=await db.query("SELECT * FROM Users WHERE email=$1",[email]);

        if((check.rows.length)>0){
            res.status(400).json({message:"User Already Exists"});
        } else{
            bcrypt.hash(password,saltRounds,async (err,hash) =>{
                if (err){
                    res.status(500).json({message:Error})
                } else{
                    const user = await db.query("INSERT INTO Users (name,email,password) VALUES ($1,$2,$3) RETURNING *",[name,email,hash]);
                    console.log(user.rows);
                }
            })
        }
    }
    catch(err){
        console.log(err);  
    }
    res.json({message:"User Successfully Created"});
});

    
passport.use("local",
    new Strategy(
        {usernameField: "email", passwordField: "password"},
        async function verify(email ,password , cb){
        try{
            console.log("here");
            const result=await db.query("SELECT * FROM Users WHERE email=$1",[email]);
            if(result.rows.length>0){
                const user=result.rows[0];
                const hash=user.password;
                bcrypt.compare(password,hash,(err,valid) => {
                    if (err){
                        console.log(err);
                        return cb(err);
                    } else{
                        if(valid){
                            console.log("Verified");                            
                            return cb(null,user);
                    } else{
                        console.log("Not verified");
                        
                        return cb(null,false);
                    }
                }
            });
        }
                else{
                    return cb("User not Found");
                }
        } catch(err){
            console.log(err);
            return cb(err);
        }
    }
    )
)

passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: String(process.env.GOOGLE_CLIENT_ID),
        clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        callbackURL: "http://localhost:3000/auth/google/home",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          //console.log(profile)
          const result = await db.query("SELECT * FROM users WHERE email = $1", [
            profile.emails?.[0].value,
          ]);
          if (result.rows.length === 0) {
            const newUser = await db.query(
              "INSERT INTO users (name,email, password) VALUES ($1, $2,$3)",
              [profile.displayName,profile.emails?.[0].value, "google"]
            );
            return cb(null, newUser.rows[0]);
          } else {
            return cb(null, result.rows[0]);
          }
        } catch (err) {
          return cb(err);
        }
      }
    )
  );

passport.serializeUser((user, cb) => {
    cb(null,user);
});

passport.deserializeUser((user:Express.User, cb) =>{
    cb(null, user );
});

export default router;
import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import db from "../Database/database";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";


const router = express.Router();
const saltRounds =12;

router.get("/login",(req,res) => {
    res.send("Login");
})

/*router.get("/logout", (req, res) => {
    req.logout(function(err){
        if(err) {
            return (err);
        }
    res.redirect("/home")
    });
  });*/


router.get("/home",(req,res) => {
    res.send("Home");
})

router.get("/signup",(req,res) => {
    res.send("Signup Page");
})

router.post("/login",passport.authenticate("local",{ 
    successRedirect:"/home",
    failureRedirect:"/login",
}));

router.get("/auth/google",
    passport.authenticate("google", {
        scope:["email","profile"],
    })
)

router.get("/auth/google/home",
    passport.authenticate("google",{
        successRedirect:"/home",
        failureRedirect:"/login",
    })
);

router.post("/signup",async(req,res) => {
    const name:String = req.body.name;
    const email:String = req.body.email;
    const password = req.body.password;
    
    try{
         const check=await db.query("SELECT * FROM Users WHERE email=$1",[email]);

        if((check.rows.length)>0){
            console.log("User Already exists");
        } else{
            bcrypt.hash(password,saltRounds,async (err,hash) =>{
                if (err){
                    console.log(err);
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
    res.send("You are at the Signup page");
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
          console.log(profile)
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
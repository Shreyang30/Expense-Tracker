import express from "express";
import env from "dotenv";
import db from "./Database/database";
import userRoute from "./routes/UserAuth";
import transactionRoute from "./routes/Transactions";
import accountRoute from "./routes/Accounts";
import categoryRoute from "./routes/Category"
import session from "express-session";
import passport from "passport";
import cors from "cors";
import helmet from "helmet";

env.config();

const app=express();
const allowedOrigins = [
  "http://localhost:5173",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, 
  })
);


app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const port =Number(process.env.PORT);


app.use(
    session({
      secret: String(process.env.SESSION_SECRET),
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(passport.initialize());
app.use(passport.session());

db.connect();
app.use("/",userRoute);
app.use("/",transactionRoute);
app.use("/",accountRoute);
app.use("/",categoryRoute);


app.get("/",(req: any , res:any)=>{
    return res.send("Hello World")
})

app.get("/db",async(req:any,res:any) => {
    let data=await db.query("SELECT * FROM Users");
    console.log(data);
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    
})
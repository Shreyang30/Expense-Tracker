import InputBox from "../Components/InputBox";
import Button from "../Components/Button";
//import SocialLogin from "../Components/SocialLogin";
import axios from "axios";
import { ChangeEvent,useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../Components/Heading";
import SubHeading from "../Components/SubHeading";

var url="http://localhost:3000/login"

export default function (){
    const navigate= useNavigate();
    const [loginBody,setloginBody]= useState({
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setloginBody({...loginBody,[e.target.name]: e.target.value})
    };

    const handleSignin = async() => {
        console.log(loginBody);
        try {const res=await axios.post(url,loginBody,{ withCredentials: true });
        localStorage.setItem("user",res.data.user);
        navigate("/home");
        console.log(res.data);
        
        } catch (error: any) {
            console.log(error);
        }
    }
    return <div className="flex flex-col justify-center w-full h-screen">
        <div className="flex flex-col justify-center p-10">
        <Heading text="Sign In Page"/>
        <SubHeading text="Don't have an account?" link="/signup" to="signup"/>
        
        <InputBox 
        label= "Email"
        name="email"
        type="email"
        placeholder="type your email"
        onChange={(e) => handleChange(e)}
        />

        <InputBox 
        label="Password"
        name="password"
        type="password"
        placeholder="*********"
        onChange={(e) => handleChange(e)}
        />

        <Button text="SignIn" type="submit" onClick={() => handleSignin()}/>

        </div>
    </div>
};
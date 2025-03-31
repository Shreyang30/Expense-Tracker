import InputBox from "../Components/InputBox";
import Button from "../Components/Button";
import SocialLogin from "../Components/SocialLogin";
import axios from "axios";
import { ChangeEvent,useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Heading from "../Components/Heading";
import SubHeading from "../Components/SubHeading";
import {useAppDispatch,useAppSelector} from '../app/hooks/hooks'
import {setUser,clearUser} from '../app/slices/Userdetails/info'
import { RootState } from "../app/store";
import {jwtDecode,JwtPayload} from "jwt-decode";

var url="http://localhost:3000/login"
var socialurl="http://localhost:3000/auth/google"

interface ExpendedPayload extends JwtPayload{
  name:string;
  email:string;
}

export default function (){
    
    const dispatch= useAppDispatch();
    const user = useAppSelector((state:RootState) => state.user.user)
    const navigate= useNavigate();
    const [loginBody,setloginBody]= useState({
        email: "",
        password: "",
    });

    /*useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/home");
        }
      }, [navigate]);*/

      useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        
        if (token) {
          localStorage.setItem("token", token);
          const res=jwtDecode<ExpendedPayload>(token);
          dispatch(setUser({user: { name : res.name, email: res.email},token : "loggenIn"}))
          console.log(token);
          
          navigate("/home");
        }
      }, [navigate]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setloginBody({...loginBody,[e.target.name]: e.target.value})
    };

    const handleGoogleSignin = async() =>{
        window.location.href = socialurl;
    };

    const handleSignin = async() => {
        try {const res=await axios.post(url,loginBody,{ withCredentials: true });
        localStorage.setItem("token",res.data.user);
        dispatch(setUser({user: { name : res.data.user.name , email: res.data.user.email},token : "loggenIn"}))
        navigate("/home");
        console.log(res.data);
        
        } catch (error: any) {
            console.log(error);
        }
    }
    return <div className="bg-gradient-to-br from-black to-gray-700 flex flex-col justify-center w-full h-screen">
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


        <div className="flex flex-col pt-10 justify-center items-center"><SocialLogin
        className=""
        text="Sign in with Google"
        onClick={() => handleGoogleSignin()}
        /></div>
        </div>
    </div>
};
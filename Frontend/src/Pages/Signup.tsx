import Button from "../Components/Button"
import Heading from "../Components/Heading"
import SubHeading from "../Components/SubHeading"
import InputBox from "../Components/InputBox"
import SocialLogin from "../Components/SocialLogin"
import {ChangeEvent,useEffect,useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

var url="http://localhost:3000/signup"
const socialurl="http://localhost:3000/auth/google"

export default function (){
    const navigate = useNavigate();
    const [signupbody,Setsignupbody] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        Setsignupbody({...signupbody,[e.target.name]: e.target.value})
    };

    useEffect(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");
        
            if (token) {
              localStorage.setItem("token", token);
              navigate("/home");
            }
          }, [navigate]);
    
    const handleGoogleSignin = async() =>{
            window.location.href = socialurl;
        };

    const handleSignup = async() => {
            console.log(signupbody);
            try {const res=await axios.post(url,signupbody,{ withCredentials: true });
            localStorage.setItem("user",res.data.user);
            navigate("/home");
            console.log(res.data);
            
            } catch (error: any) {
                console.log(error);
            }
    }

    return <div className="flex flex-col justify-center w-full h-screen">
        <div>
            <Heading text="Sign Up" />
            <SubHeading text="Already have a Account?" link="/signin" to="Sign In" />
            <InputBox
            label= "Name"
            name="name"
            type="text"
            placeholder="John Doe"
            onChange={(e) => handleChange(e)}
            />

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

            <Button text="Sign Up" type="submit" onClick={() => handleSignup()}/>

            <div className="flex flex-row-reverse"><SocialLogin
            className=""
            text="Sign up with Google"
            onClick={() => handleGoogleSignin()}
            /></div>
        </div>
    </div>
};
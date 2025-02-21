import InputBox from "../Components/InputBox";
import Button from "../Components/Button";
import SocialLogin from "../Components/SocialLogin";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function (){
    const navigate= useNavigate();
    const [loginBody,setloginBody]= useState();
    return <div>
        <h1>Signin</h1>
    </div>
};
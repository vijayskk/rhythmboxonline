import React, { useState } from 'react'
import {useRouter} from 'next/router'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase'
import { CircularProgress } from '@mui/material';


function Login() {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [haserror, sethaserror] = useState(false);
    const [error, seterror] = useState("");
    const [isLoading, setisLoading] = useState(false);

    const router = useRouter();


    const signIn = () =>{
        if(email != "" && password != ""){
            setisLoading(true)
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Logged in successfully");
                router.push("/")
            })
            .catch((error) => {
                setisLoading(false)
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                if(errorCode = "auth/user-not-found"){
                    sethaserror(true)
                    seterror("Email or password incorrect")
                }else{
                    sethaserror(true)
                    seterror("Login error")
                }
                
            });
        }else{
            setisLoading(false)
            sethaserror(true)
            seterror("All Fields are requierd")
        }
        
    }

    return (
        <div className='flex flex-col items-center justify-start h-screen'>
                <h1 className='text-white text-4xl md:text-7xl font-bold text-center mt-20 md:mt-32'>Login to your Account</h1>
                <img src="black-concrete.jpg" alt="" className='fixed w-screen h-screen -z-40' />
            <div className='w-1/6 flex flex-col items-center'>
                <img className='w-52 mb-5 mt-20' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Rhythmbox_logo_3.4.4.svg/1200px-Rhythmbox_logo_3.4.4.svg.png" alt="" />
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="email" className='text-white'>Email</label>
                    <input placeholder='Enter your email' type="email" id="email" name="email" className='border border-gray-500 text-white bg-black rounded-md h-10 pl-2' onChange={(e)=>{
                    setemail(e.target.value)
                }} />
                </div>
                <div className='flex flex-col space-y-2 mt-4'>
                    <label htmlFor="email" className='text-white'>Password</label>
                    <input placeholder='Enter your password' type="password" id="email" name="email" className='border border-gray-500 text-white bg-black rounded-md h-10 pl-2' onChange={(e)=>{
                    setpassword(e.target.value)
                }}/>

                {haserror?<p className='text-center text-red-200 pt-4'>⚠️ {error}</p>:null}
                {isLoading?<CircularProgress className='w-full self-center' color="secondary" />:null}
                </div>
                <button className='text-white w-60 bg-orange-600 h-10 mt-4 rounded-md mx-10 cursor-pointer' type="submit" onClick={signIn}>Login</button>
                <a className='cursor-pointer text-white mt-4 ' onClick={()=>{
                    router.push('/register')
                }}>Create Account</a>
            </div>
        </div>
    )
}

export default Login

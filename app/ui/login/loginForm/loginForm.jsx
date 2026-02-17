"use client";
import { login } from "@/app/lib/actions";
import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

function LoginForm() {
    const [isLoginLoad, setIsLoginLoad] = useState(false);
    
    const sendFormData = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        setIsLoginLoad(true)
        const result = await login(data.userName, data.passKey)
        setIsLoginLoad(false)
        if(result!==undefined){
            toast(result.message, {position: "top-center", type:"error"});
        }
        else{
            toast("Login Successfully", {position: "top-center", type:"success"});
        }
        
        
    }
    const forgetPass = () => {
        toast("Please Contact Admin for New Password", {position: "top-center", type:"warning"});
        // alert(data.userName)
        
    }
    return (
        <form className="space-y-6" onSubmit={sendFormData} >
            <div>
                <label htmlFor="email"  className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="userName"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="text-sm">
                        <button type="button" onClick={forgetPass} href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </button>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                        id="password"
                        name="passKey"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <button type="submit" disabled={isLoginLoad} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    {isLoginLoad ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="22" /> : "Sign In"}
                </button>
            </div>
        </form>
    );
}

export default LoginForm;

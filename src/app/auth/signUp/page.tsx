"use client";

import AuthOptionBtn from "@/app/_components/AuthOptionBtn";
import { useState } from "react";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { jobHunterUrl } from "@/utils";



export default function SignUpPage(){
    const [activeRole, setActiveRole] = useState("candidate");

    const router = useRouter()

    function authSwitch(role: string) {
        setActiveRole(role);
    }

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget); 
        
        const input = {
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          role: activeRole
        };
        
        try {
          const response = await fetch(jobHunterUrl + "/api/registration", {
            method: "POST",
            body: JSON.stringify(input),
          });
          

      
        //   if (!response.ok) throw new Error("Error adding data");
        if(!response.ok || response.status === 403) {
            return Swal.fire({
                icon: "error",
                title: "Failed Registration",
                text: "User already exist",
                showCloseButton: true
            })
        }

        await Swal.fire({
            icon: "success",
            title: "Success Registration",
            showCloseButton: true
        })

        return router.push("/auth/signIn")
      
        //   revalidatePath("/");
        //   redirect("/");
        } catch (error) {
          console.error("Registration failed:", error);
          // Add user-facing error handling here
        }
    }
      
 
    return(
        <>
            <style jsx global>{`
            .navbarMain {
                display: none;
            }
            .footer{
                display: none;
            }
            `}</style>
            <div className="flex justify-center items-center w-full h-screen bg-white">
                <div className="p-5 flex flex-col gap-3 justify-center bg-white md:min-w-[405px]">
                    <div className="flex flex-row justify-center items-center gap-2">
                        <img 
                        src="/Vector.png" 
                        alt="icon" 
                        className="w-6 h-6"/>
                        <h1 className="text-steel-blue text-xl font-bold">JobHunter</h1>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <button className={`authOptions w-1/2 px-2 py-2 text-steel-blue text-base font-semibold hover:bg-slate-300 ${activeRole === 'candidate' ? 'bg-slate-300' : ''}`} onClick={(e) => authSwitch("candidate")}>Job Seeker</button>
                        <button className={`authOptions w-1/2 px-2 py-2 text-steel-blue text-base font-semibold hover:bg-slate-300 ${activeRole === 'company' ? 'bg-slate-300' : ''}`} onClick={(e) => authSwitch("company")}>Company</button>
                    </div>
                    <form onSubmit={handleRegister}>
                        <label className="form-control w-full">
                        <div className="label">
                            <span className="text-base font-semibold tracking-widest text-dark-grey-text">Full Name</span>
                        </div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="input text-black input-bordered w-full focus:border-steel-blue rounded-none bg-white"
                        />
                        </label>
                        <label className="form-control w-full">
                        <div className="label">
                            <span className="text-base font-semibold tracking-widest text-dark-grey-text">Email</span>
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input text-black input-bordered w-full focus:border-steel-blue rounded-none bg-white"
                        />
                        </label>
                        <label className="form-control w-full">
                        <div className="label">
                            <span className="text-base font-semibold tracking-widest text-dark-grey-text">Password</span>
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            className="input text-black input-bordered w-full focus:border-steel-blue rounded-none bg-white"
                        />
                        </label>
                        <button type="submit" className="w-full btn bg-steel-blue text-white font-semibold text-base border-0 rounded-none hover:bg-slate-400 mt-5">
                            Register
                        </button>
                    </form>
                    <div className="flex flex-row justify-center text-base text-dark-grey-text gap-1">
                        <h1>Already Have an Account?</h1>
                        <a href="signIn" className="text-steel-blue">Login</a>
                    </div>
                    <div className="w-80 text-xs text-dark-grey-text tracking-wide  m-auto">
                        By clicking `Register`, you acknowledge that you have read and accept the 
                        <a href="" className="text-blue-300 gap-1">Terms of Service</a> and <a href="" className="text-blue-300 gap-1">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </>
    )
}
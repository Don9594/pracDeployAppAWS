"use client"
import Link from "next/link";
import {signIn, signOut,useSession} from 'next-auth/react';

const AuthButton = ()=>{
    const {data:session} =useSession();
    
    if(session){
        return(
        <>
            {session?.user?.name}
            <br/>
            <button onClick={()=>signOut()}>Sign Out</button>
        </>)
    }
    else{
        return(
            <>
                Not signed in.
                <button onClick={()=>signIn()}>Sign In</button>
            </>
        )
    }
}

export default function NavMenu(){
    return(
        <div>
            <AuthButton/>
        </div>
    )
};
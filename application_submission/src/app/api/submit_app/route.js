import { isAlpha,isBetween } from '@/app/_services/services';
const fs = require('fs');


export async function GET(request){


    console.log("GET REQUEST")

    return Response.json("hello world");

}

export async function POST(request){

    console.log("POST Request");
    


    const req = await request.json();

    const {firstName,lastName,email,pdfFile} = req;

    //server-side validation
    let fNameValid = false, lNameValid =false;
    

    const id = 5;
    const goal = 21;
    return Response.json({
        id,
        goal
    });
}
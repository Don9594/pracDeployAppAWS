import { isAlpha,isBetween,isValidPdf } from '@/app/_services/services';
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
    let fNameValid = false, lNameValid =false, fileTypeValid = false;

    fNameValid = (isAlpha(firstName) && isBetween(firstName))?true:false;
    lNameValid = (isAlpha(lastName) && isBetween(lastName))?true:false;
    
  
    fileTypeValid = isValidPdf(pdfFile);

    const errMsg = "Incorrect input provided. Please try again.";
    const succMsg = "Your submission has been recorded.";

    if(fNameValid && lNameValid && fileTypeValid){
        return Response.json({
            succMsg,
            firstName,
            lastName,
            pdfFile,
            email
        });
    }
    else{
        return Response.json({
            errMsg,
            firstName,
            lastName,
            pdfFile
        });
    }
}
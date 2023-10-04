import { isAlpha,isBetween,isValidPdf } from '@/app/_services/services';
import {headers} from 'next/headers';
const fs = require('fs');


export async function GET(request){


    console.log("GET REQUEST")

    return Response.json("hello world");

}

/*POST REQUEST BODY:
    key: firstName, value: string
    key: lastName, value: string
    key: email, value:email(string)
    key: pdfFile, value: binary data(File)
*/
/*
    we need mime package to extract file extension (and npm install -D @types/mime)
    we need date-fns to format today's date
*/
export async function POST(request){

    console.log("POST Request");

    const headersInstance = headers();
    const contentType = headersInstance.get('Content-Type');
    if(contentType != "multipart/form-data"){
        return Response.json({
            error:"wrong request type"
        },
        {status:400}
        );
    }
    


    const req = await request.formData();
    const firstName = req.get('firstName');
    const lastName = req.get('lastName');
    const email = req.get('email');

    //blob to get file data
    const pdfFile = req.get('pdfFile');

    if(!pdfFile || !firstName || !lastName || !email){

        const res = new Response();
        res.status(400);
        return res.json({
            error:"Incorrect user request"
        },
        {status:400});
    }


    //server-side validation
    let fNameValid = false, lNameValid =false, fileTypeValid = false;

    fNameValid = (isAlpha(firstName) && isBetween(firstName))?true:false;
    lNameValid = (isAlpha(lastName) && isBetween(lastName))?true:false;
    
  
    fileTypeValid = isValidPdf(pdfFile);

    const errMsg = "Incorrect input provided. Please try again.";
    const succMsg = "Your submission has been recorded.";

    if(fNameValid && lNameValid && fileTypeValid){
        //enter into database
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
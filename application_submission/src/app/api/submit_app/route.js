import { isAlpha,isBetween,isValidPdf } from '@/app/_services/services';
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
    we need mime package to extract file extension
    we need date-fns to format today's date
*/
export async function POST(request){

    console.log("POST Request");
    


    const req = await request.formData();

    const firstName = req.get('firstName');
    const lastName = req.get('lastName');
    const email = req.get('email');

    //blob to get file data

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
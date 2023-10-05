import { isAlpha,isBetween,isValidPdf } from '@/app/_services/services';
import {headers} from 'next/headers';
import mime from 'mime';
import {join} from 'path';
import {stat,mkdir,writeFile} from "fs/promises";
import * as dateFn from 'date-fns';



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
    const contentType = headersInstance.get('Content-Type').split(';')[0];
    if(contentType != "multipart/form-data"){
        return Response.json({
            error:"wrong request type",
            ype:`${contentType}`
        },
        {status:400}
        );
    }
    


    const req = await request.formData();
    const firstName = req.get('firstName');
    const lastName = req.get('lastName');
    const email = req.get('email');

    //blob to get file data
    /*
        File {
        size: 188810,
        type: 'application/pdf',
        name: 'don.wijesinghe.pdf',
        lastModified: 1696507827933
    }*/

    //var blobUrl = URL.createObjectURL(myBlob);
    const pdfFile = req.get('pdfFile');
    const buffer = Buffer.from(await pdfFile.arrayBuffer());
    const relativeUploadDir = `/submissions/${dateFn.format(Date.now(), "dd-MM-Y")}`;
    const uploadDir = join(process.cwd(), "_public", relativeUploadDir);

    try {
        await stat(uploadDir);
        } 
    catch (e) {
        if (e.code === "ENOENT") {
            await mkdir(uploadDir, { recursive: true });
        } else {
            return Response.json(
            { error: "Internal server error." },
            { status: 500 }
            );
        }
    }

    try {
        
        const filename = pdfFile.name;
        await writeFile(`${uploadDir}/${filename}`, buffer);
      } catch (e) {
        console.error("Error while trying to upload a file\n", e);
        return Response.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
    }
    
    
    console.log(pdfFile);

    if(!pdfFile || !firstName || !lastName || !email){

        const res = new Response();
        res.status(400);
        return res.json({
            error:"Incorrect user request"
        },
        {status:400});
    }



    //server-side validation
    let fNameValid = false, lNameValid =false;

    fNameValid = (isAlpha(firstName) && isBetween(firstName))?true:false;
    lNameValid = (isAlpha(lastName) && isBetween(lastName))?true:false;
    
  


    const errMsg = "Incorrect input provided. Please try again.";
    const succMsg = "Your submission has been recorded.";

    if(fNameValid && lNameValid ){
        //enter into database
        return Response.json({
            succMsg,
            firstName,
            lastName,
            pdfFile,
            email
        },
        {
            status:200
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
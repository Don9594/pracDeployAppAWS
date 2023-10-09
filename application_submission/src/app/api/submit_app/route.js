import { isAlpha,isBetween,isValidPdf } from '@/app/_services/services';
import {headers} from 'next/headers';
import {join} from 'path';
import {stat,mkdir,writeFile} from "fs/promises";
import * as dateFn from 'date-fns';
import * as mysql from 'mysql2';





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
    let fNameValid = false, lNameValid =false, fileTypeValid=false;
    

    fNameValid = (isAlpha(firstName) && isBetween(firstName))?true:false;
    lNameValid = (isAlpha(lastName) && isBetween(lastName))?true:false;
    fileTypeValid = isValidPdf(pdfFile);

 
    //var blobUrl = URL.createObjectURL(myBlob);
    
    const errMsg = "Incorrect input provided. Please try again.";
    const succMsg = "Your submission has been recorded.";

    if(fNameValid && lNameValid && fileTypeValid ){

        const buffer = Buffer.from(await pdfFile.arrayBuffer());
        const date_today = dateFn.format(Date.now(),"MM-dd-Y");
        const relativeUploadDir = `/submissions/${date_today}`;
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
            //insert user information to database
            //firstname, lastname, email, filename,date
            try{
                //create DB if not exist
                const connection = mysql.createConnection({
                    host:process.env.DB_HOST,
                    user:process.env.DB_USER,
                    password:process.env.DB_PASSWORD
                })

                //create database if not exist - consider just removing it.
                //create table if not exist - consider just removing it. (speed up)
                //insert row
                
                //connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
                
                /*connection.query(`CREATE TABLE IF NOT EXISTS ${process.env.DB_TBL_USR}(
                    firstName VARCHAR(26),
                    lastName VARCHAR(26),
                    email VARCHAR(50),
                    filename VARCHAR(53),
                    date CHAR(10))`);*/

                connection.query(`USE ${process.env.DB_NAME}`);
                
                

        




            }
            catch(e){
                console.log(e);
                return Response.json(
                    {error:"database failure"},
                    {status:500}
                )
            }
        } catch (e) {
            console.error("Error while trying to upload a file\n", e);
            return Response.json(
            { error: "Something went wrong." },
            { status: 500 }
            );
        }
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
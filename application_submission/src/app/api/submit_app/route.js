const fs = require('fs');


export async function GET(request){


    console.log("GET REQUEST")

    return Response.json("hello world");

}

export async function POST(request){

    console.log("POST Request");
    

    //i can do some server side validation later
    const req = await request.json();

    const name = req.name;

    console.log(name);

    const id = 5;
    const goal = 21;
    return Response.json({
        id,
        goal
    });
}
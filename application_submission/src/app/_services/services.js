    import mime from "mime";
    //helper functions***********
    export const isBetween =(value,min=1,max=26)=>{
        return (value.length>=min && value.length <max? true:false);
    }
    
    export const isAlpha = (value)=>{
        const exp = /[^a-z]/i;
        return !(exp.test(value));
    }

    export const isValidPdf = (file)=>{
        if(mime.getExtension(file.type)=='pdf'){
            return true;
        }
        else{
            return false;
        }
    }
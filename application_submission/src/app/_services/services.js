    //helper functions***********
    export const isBetween =(length,min,max)=>{
        return (length>=min && length <max? true:false);
    }
    
    export const isAlpha = (value)=>{
        const exp = /[^a-z]/i;
        return !(exp.test(value));
    }

    export const isValidPdf = (value)=>{
        if(value.search(/.pdf/i)<0){
            return false;
        }
        else{
            return true;
        }
    }
"use client"

import {useState, useRef} from 'react';
import styles from './form.module.css';
import { isAlpha,isBetween,isValidPdf } from '../_services/services';



const Form=()=>{

    const validFName = useRef(false);
    const validLName = useRef(false);
    const validFType = useRef(false);   

    const [inputValues, setInputValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        pdfFile:''});

    const  handleChange = (event) => {
        const {name,value}= event.target;
        setInputValues((prev)=>{
            return {...prev,[name]:value}
        });

        //debounce((event)=>{
        if(name=="pdfFile"){
            checkFileType(event.target);
        }
        else if(name=="firstName" || name=="lastName"){
            checkUsername(event.target);
        }
        //})

        
    };

     
    



    //Error Display function
    const errDisplay = (element, message)=>{
        const formField = element.parentElement;

        element.classList.remove(`${styles.success}`);
        formField.classList.add(`${styles.error}`);

        formField.querySelector('small').textContent = message;
    }
    //Success Display Function
    const succDisplay=(element)=>{
        const formField = element.parentElement;
        formField.classList.remove('error');
        element.classList.add(`${styles.success}`);
        formField.querySelector('small').textContent='';
    }

    //**********/
    //check if input has only alpha characters and is of correct size
    function checkUsername(target){
        let validLengthInput = isBetween(target.value);
        let validAlphaInput = isAlpha(target.value);
        if(!validLengthInput){
            errDisplay(target,"Enter a value between 0 and 26 characters.");
            if(target.id=="firstName"){
                validFName.current=false;
            }
            else{
                validLName.current=false;
            }
            
            return;
        }
        if(!validAlphaInput){
            errDisplay(target,"Enter alphabet characters only.");
            if(target.id=="firstName"){
                validFName.current=false;
            }
            else{
                validLName.current=false;
            }
            return;
        }
        else{
            succDisplay(target);
            if(target.id=="firstName"){
                validFName.current=true;
            }
            else{
                validLName.current=true;
            }
            return;
        }
    } 
    //check if file type is pdf
    function checkFileType(target){
        let file = target;

        if(isValidPdf(file.value)==true){
            succDisplay(file);
            validFType.current=true;
            return;
        }
        else{
            errDisplay(file,"Incorrect File Type. Please select a pdf file.");
            validFType.current=false;
            return;
        }
    }

    
    //2. Submit Validation - Weak Validation
    const validateForm= async(event)=>{ 
        event.preventDefault();
        if(validFName.current &&validLName.current&&validFType.current){
            let fData = new FormData();
            fData.append('firstName',inputValues.firstName);
            fData.append('lastName', inputValues.lastName);
            fData.append('email',inputValues.email);
            const pFile = document.getElementById("pdfFile")
            fData.append('pdfFile', pFile.files[0], `${inputValues.firstName}.${inputValues.lastName}.pdf`)
            try{
                
                const response = await fetch('/api/submit_app/',{
                    method:"POST",
                    body:fData,
                })
                //console.log(response.json())
            }
            catch(e){
                console.log(e);
            }

            return;
        }
        else{
            if(!validFName.current){
                alert("Invalid First Name. Try Again.")
            }
            if(!validLName.current){
                alert("Invalid Last Name. Try Again.")
            }
            if(!validFType.current){
                alert("Invalid File Type. Try Again.")
            }
            return;
        }
    };


    return(

        <form id="pdf-form" className={styles.formWrapper}  onSubmit={validateForm}>

            <div className={styles.formField}>
                <label htmlFor="firstName">
                    First Name: 
                </label>
                <input required  type="text" id="firstName" name="firstName" value={inputValues.firstName}  
                    onChange={handleChange} />
                <br/>
                <i>
                    <small></small>
                </i>
                
            </div>

            <br/>

            <div className={styles.formField}>
                <label htmlFor='lastName'>
                    Last Name: 
                </label>
                <input  required type="text" id="lastName" name="lastName"   value={inputValues.lastName} 
                    onChange={handleChange} />
                <br/>
                <i>
                    <small></small>
                </i>
                
            </div>

            <br/>

            <div className={styles.formField}>
                <label>
                    Email: <input required type="email" name="email" value={inputValues.email}    
                    onChange={handleChange} />
                </label>
                <br/>
                <i>
                    <small></small>
                </i>
            </div>

            <br/>

            <div className={styles.formField}>
                <label htmlFor='pdfFile'> Select a File: </label>
                <input required name="pdfFile" value={inputValues.file} id="pdfFile" type="file" accept='application/pdf' onChange={handleChange}/>
                <br/>
                <i>
                    <small></small>
                </i>
            </div>
            
            <br/>

            <div className={styles.formField}>
                <label htmlFor="permission">
                    Permission to store information: 
                </label>
                <input required value="permission" id="permission" type='checkbox' />
                <br/>
                <i>
                    <small></small>
                </i>
            </div>
            
    
            <br/>
            <div className={styles.formDivButton}>
                <button type='submit'> Submit Application</button>
            </div>
            

        </form>
    )
};


export default Form;
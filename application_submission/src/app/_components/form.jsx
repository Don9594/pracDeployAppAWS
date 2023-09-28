"use client"

import {useState,useLayoutEffect, useRef} from 'react';
import styles from './form.module.css';



const Form=(actionRoute)=>{

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
    };

    const validFName = useRef(false);
    const validLName = useRef(false);
    const validFType = useRef(false);    
    

    //helper functions***********

    //check input size
    const isBetween =(length,min,max)=>{
        return (length>=min && length <max? true:false);
    }

    const isAlpha = (value)=>{
        const exp = /[^a-z]/i;
        return !(exp.test(value));
    }

    //Error Display function
    const errDisplay = (element, message)=>{
        const formField = element.parentElement;

        formField.classList.remove('success');
        formField.classList.add('error');

        formField.querySelector('small').textContent = message;
    }
    //Success Display Function
    const succDisplay=(element)=>{
        const formField = element.parentElement;
        formField.classList.remove('error');
        formField.classList.add('success');
        formField.querySelector('small').textContent='';
    }

    //**********/

    //check if input has only alpha characters and is of correct size
    function checkUsername(target){
        let validLengthInput = isBetween(target.value.length,0,26);
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
    function checkFileType(){
        let file = document.querySelector('#pdfFile');
        if(file.value.search(/.pdf/i)<0){
            errDisplay(file,"Incorrect File Type. Please select a pdf file.");
            validFType.current=false;
            return;
        }
        else{
            succDisplay(file);
            validFType.current=true;
            return;
        }
    }


    //Form Field Validation******************
    //delay response
    const debounce = (fn, delay = 500) => {
        let timeoutId;
        return (...args) => {
            // cancel the previous timer
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            // setup a new timer
            timeoutId = setTimeout(() => {
                fn.apply(null, args)
            }, delay);
        };
    };
    //1. Input Change Validation
    useLayoutEffect(()=>{
        const form = document.querySelector('#pdf-form');
        form.addEventListener('input',debounce((event)=>{
            switch(event.target.id){
                case 'firstName':
                    checkUsername(document.querySelector('#firstName'));
                    break;
                
                case 'lastName':
                    checkUsername(document.querySelector('#lastName'));
                    break;
    
                case 'pdfFile':
                    checkFileType();
                    break;
            }

            
        }));
    })
    
    //2. Submit Validation
    const validateForm=(event)=>{ 
        event.preventDefault();
        if(validFName.current &&validLName.current&&validFType.current){
            console.log(inputValues);
            console.log("validFName is :" + validFName.current);
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

        <form id="pdf-form" className={styles.formwrapper} onSubmit={validateForm} action={actionRoute} method="post">

            <div className='form-field'>
                <label htmlFor="firstName">
                    First Name: 
                    <input required  type="text" id="firstName" name="firstName" value={inputValues.firstName}  
                    onChange={handleChange} />
                    <small></small>
                </label>
            </div>

            <br/>

            <div className='form-field'>
                <label htmlFor='lastName'>
                    Last Name: 
                </label>
                <input  required type="text" id="lastName" name="lastName"   value={inputValues.lastName} 
                    onChange={handleChange} />
                <small></small>
            </div>

            <br/>

            <div className='form-field'>
                <label>
                    Email: <input required type="email" name="email" value={inputValues.email}    
                    onChange={handleChange} />
                </label>
                <small></small>
            </div>

            <br/>

            <div className='form-field'>
                <label htmlFor='pdfFile'> select a File: </label>
                <input required name="pdfFile" value={inputValues.file} id="pdfFile" type="file" onChange={handleChange}/>
                <small></small>
            </div>
            
            <br/>

            <div className='form-field'>
                <label htmlFor="permission">
                    Permission to store information: 
                </label>
                <input required value="permission" id="permission" type='checkbox' />
                <small></small>
            </div>
            
    
            <br/>
            <button type='submit'> Submit Application</button>

        </form>
    )
};


export default Form;
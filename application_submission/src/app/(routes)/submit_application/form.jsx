"use client"

import {useId, useState} from 'react';

const Form=()=>{

    const actionRoute ="";
    const actionType ="";

    const firstNameId = useId();

    const [inputValues, setInputValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        file:''});

	const  handleChange = (event) => {
        const {name,value}= event.target;


		setInputValues((prev)=>{
            return {...prev,[name]:value}
        });
	};

    const validateForm=async(event)=>{
        event.preventDefault();

        const submission =inputValues;

        if(document.getElementById('permission').checked){
            console.log(submission);
        }
        

    };

    return(

        <form className='form-wrapper' onSubmit={validateForm} action={actionRoute} method={actionType}>
            <label htmlFor={firstNameId}>
                First Name: <input required id={firstNameId} type="text" name="firstName" value={inputValues.firstName}  
                onChange={handleChange} />
            </label>
            <br/>
            <label>
                Last Name: <input  required type="text" name="lastName"   value={inputValues.lastName} 
                onChange={handleChange} />
            </label>
            <br/>
            <label>
                Email: <input required type="email" name="email" value={inputValues.email}    
                onChange={handleChange} />
            </label>
            <br/>

            <fieldset>
                <label htmlFor='pdf'> select a File: </label>
                <input name="file" value={inputValues.file} id="pdf" type="file" onChange={handleChange}></input>
            </fieldset>
            
            <fieldset>
                <legend>required to submit form</legend>
                <label htmlFor="permission">
                    Permission to store information: 
                </label>
                <input name="form-checkbox" value="permission" id="permission" type='checkbox' />
            </fieldset>
            
            <br/>
            <button type='submit'> Submit Application</button>
           
            
        </form>
    )
};

//<input type="submit" value="hello"/>
export default Form;
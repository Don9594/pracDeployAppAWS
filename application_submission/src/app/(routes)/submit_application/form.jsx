"use client"

import {useId, useState} from 'react';

const Form=()=>{
    const firstNameId = useId();

    const [inputValues, setInputValues] = useState({
        firstName: '',
        lastName: '',
        email: ''});

	const  handleChange = (event) => {
        const {name,value}= event.target;


		setInputValues((prev)=>{
            return {...prev,[name]:value}
        });
	};

    const handleSubmit=(event)=>{
        event.preventDefault();

        const submission =inputValues;

        if(document.getElementById('permission').checked){
            console.log(submission);
        }
        

    };

    return(

        <form className='form-wrapper' onSubmit={handleSubmit}>
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
                <legend>required to submit form</legend>
                <label htmlFor="permission">
                    Permission to store information: 
                </label>
                <input name="form-checkbox" value="permission" id="permission" type='checkbox' ></input>
            </fieldset>
            
            <br/>
            <button type='submit'> Submit Application</button>
            <button type='button'> Clear Application</button>
        </form>
    )
};


export default Form;
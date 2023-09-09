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

        console.log(submission);

    };

    return(

        <form className='form-wrapper' onSubmit={handleSubmit}>
            <label htmlFor={firstNameId}>
                First Name: <input id={firstNameId} type="text" name="firstName" value={inputValues.firstName}  
                onChange={handleChange} />
            </label>
            <br/>
            <label>
                Last Name: <input  type="text" name="lastName"   value={inputValues.lastName} 
                onChange={handleChange} />
            </label>
            <br/>
            <label>
                Email: <input  type="email" name="email" value={inputValues.email}    
                onChange={handleChange} />
            </label>
            <br/>
            <label>
                Permission to store information: <input name="form-checkbox" value="permission" id="persmision" type='checkbox' defaultChecked='true'></input>
            </label>
            <br/>
            <button type='submit'> Submit Application</button>
            <button type='button'> Clear Application</button>
        </form>
    )
};


export default Form;
'use client'
import {useId, useState} from 'react';

export default function  Submit_application()  {

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

return  (
    //<form></form>
<>
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
        Permission to store information: <input type='checkbox' defaultChecked='true'></input>
    </label>
    <br/>
    <button type='submit'> Submit Application</button>
    <button type='button'> Clear Application</button>
</form>
<hr/>
<p>Input first Name: {inputValues.firstName}</p>
<p>Input last Name: {inputValues.lastName}</p>
<p>Input email: {inputValues.email}</p>
</>
)};


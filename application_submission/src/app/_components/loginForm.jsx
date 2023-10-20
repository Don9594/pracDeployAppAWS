"use client"

//provide user the option to login or to create a new account
const LoginForm = ()=>{

    return(
        <>
            <form>
                <label htmlFor="username">Enter Username:</label>
                <input id="username" name="username" type='text'></input>
                <label htmlFor="password">Enter Password:</label>
                <input id="password" name="password" type='password'></input>  
            </form>
            <div>
                <label>New User? Create Account mijo</label>
                <button>Create New Account</button>
            </div>
        </>
    )
}

export default LoginForm;
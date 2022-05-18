import { useState } from "react"


const LogInPage = () =>{


    const [emailValue,setEmailValue] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [passwordValue,setPasswordValue] = useState('')


    return(
        <div className="SignUp-Form-Container">
            <h1>Log In</h1>
            <input
                type='text'
                value={firstName}
                onChange={(event) => null }
                placeholder='firstname'/>
            <input
                type='text'
                value={lastName}
                onChange={(event) => null }
                placeholder='lastname'/>

            <input
                type='text'
                value={emailValue}
                onChange={(event) => null }
                placeholder='someone@mail.com'/>
            
            <input
                type='password'
                value={passwordValue}
                onChange={(event) => null }
                placeholder='password'/>
            <hr/>
            <button 
                disabled= {!emailValue && !passwordValue}
                onClick={(event)=> onLogInCLicked}>
                    Log In
                </button>
            <button></button>
            <button></button>

        </div>

    )
}
export default LogInPage;
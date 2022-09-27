import React, {useState} from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import {auth} from '../../config/firebase'
import { Link } from 'react-router-dom';

function ForgotPass(){
    const [login,setLoginEmail] = useState('')
    const [msg, setMsg] = useState ('')

    var actionCodeSettings = {
        url: 'http://localhost:3000/?email=user@example.com',
        iOS:{
            bundleId:'com.example.ios'
        },
        android: {
            packageName: 'com.example.android',
            installApp: true,
            minimumVersion: '12'
        },
        handleCodeInApp:true
    }

    const forgotpass = async()=>{
        try{
            const user = await sendPasswordResetEmail(
                auth, login, actionCodeSettings
            )
            console.log(user)
        } catch(err){
            console.log(err.message)
            if(err. message){
                setMsg('email tidak terdaftar')
            }
            
            alert('Fitur belum diaktifkan')
        }
    }

    return(
        <section className="hero is-light is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="column is-4 is-offset-4">
                        <h3 className="title has-text-black">Lupa Password</h3>
                            <p>Silahkan masukan email dan password Anda</p>
                            <br />

                            <div className="box">
                                {
                                    (()=>{
                                        if(msg){
                                            return(
                                                <div className="notification is-danger">
                                                    <Link to='/'>
                                                        <button className="delete"/>
                                                    </Link>

                                                    &nbsp; {msg}
                                                </div>
                                            )
                                        }
                                        return null
                                    })()
                                }

                                <div className="field">
                                    <div className="control">
                                        <input type="email" className="input" placeholder='Email'
                                            onChange={(event)=> {setLoginEmail(event.target.value)}}
                                        />
                                    </div>
                                </div>

                                <button className="button is-block is-info is-fullwidth" onClick={forgotpass}>
                                    Reset Password <i className="fa fa-sign-in" aria-hidden='true'></i>
                                </button>
                            </div>

                            <Link to='/login'>Log In</Link> &nbsp;.&nbsp;
                            <Link to='/register'>Sign Up</Link> &nbsp;.&nbsp;
                            <Link to='/'>Need Help?</Link> &nbsp;.&nbsp;

                    </div>
                </div>
            </div>
        </section>
    )
}

export default ForgotPass
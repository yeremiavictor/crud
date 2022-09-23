import React,{useState} from 'react';
import  {createUserWithEmailAndPassword, sendEmailVerification, signOut} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import {auth} from '../../config/firebase';

function Register(){
    const navigate = useNavigate()
    const [regEmail, setRegEmail] = useState('')
    const [regPass, setRegPass] = useState('')
    const [msg, setMsg] = useState('')
    const [confPass, setConfPass] = useState ('')

    //cek kesamaan password
    const validatePassword = () =>{
        let isValid = true
        if(regPass !=='' && confPass !==''){
            if(regPass !== confPass){
                isValid = false
                console.log('Password tidak sama')
                setMsg('Password tidak sama')
            }
        }

        return isValid
    }

    const register = async () => {
        try{
            if(validatePassword()){
                //kalau password sama
                    const signup = await createUserWithEmailAndPassword(
                        auth, regEmail, regPass
                    )
                    console.log(signup)

                // setelah login berhasil melakukan proses logout
                await signOut(auth)
                navigate('/')
            }
        }catch(err){
            setMsg('Anda tidak dapat melakukan pendaftaran')
        }
    }

    return(
        <section className="hero is-light is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="column is-4 is-offset-4">
                        <h3 className='title has-text-black'> Register</h3>
                        <p>Silahkan melakukan pendaftaran</p>
                        <br/>

                        <div className="box">
                            {(() => {
                                if(msg){
                                    return(
                                        <div className="notification is-danger">
                                            <Link to='/'>
                                                <button className="delete" />
                                            </Link>
                                            &nbsp; {msg}
                                        </div>
                                    )
                                }
                                return null
                            })()}

                            <div className="field">
                                <div className="control">
                                    <input 
                                        required
                                        type="email"
                                        className='input'
                                        placeholder='Email'
                                        onChange={(event) => {setRegEmail(event.target.value)
                                        }}
                                    />
                                </div>
                            </div>

                            
                            <div className="field">
                                <div className="control">
                                    <input 
                                        required
                                        type="password"
                                        className='input'
                                        placeholder='Password'
                                        onChange={(event) => {setRegPass(event.target.value)
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <input 
                                        required
                                        type="password"
                                        className='input'
                                        placeholder='Repeat Password'
                                        onChange={(event) => {setConfPass(event.target.value)
                                        }}
                                    />
                                </div>
                            </div>

                            <button className="button is-block is-info is-fullwidth" onClick={register}>
                                Register <i className="fa fa-sign-in" aria-hidden="true"></i>
                            </button>
                        </div>

                        <Link to='/'>Login</Link>&nbsp;·&nbsp;
                        <Link to='/forgot-password'>Forgot Password</Link>&nbsp;·&nbsp;
                        <Link to='/'>Need Help?</Link>&nbsp;·&nbsp;
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Register
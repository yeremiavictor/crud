import React,{ useState } from "react";
import {onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../config/firebase'
import {Link, useNavigate} from 'react-router-dom'

function Login(){
    const navigate = useNavigate()
    const [LoginEmail, setLoginEmail] = useState('')
    const [loginPass, setLoginPass] = useState('')
    const [msg, setMsg] = useState('')

    // cek login
    // const[user,setUser] = useState({})
    // onAuthStateChanged(auth, (currentUser) =>{
    //     setUser(currentUser)
    // })

    // if(!user.email){
    //     navigate('/')
    // }

    const login = async() => {
        try{
            const user = await signInWithEmailAndPassword(
                auth, LoginEmail, loginPass
            )
            console.log(user)
            navigate('/')

        } catch(err){
            console.log(err.message)
            if(err.message){
                setMsg('email / password salah silahkan coba lagi')
            }
        }
    }

    return(
        <section className="hero is-light is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="column is-4 is-offset-4">
                        <h3 className="title has-text-black">Login / Masuk</h3>
                        <p>Masukan email & password</p>
                        <br/>
                        
                        <div className="box">
                            {(() => {
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
                            })()}


                        <div className="field">
                            <div className="control">
                                <input
                                    required
                                    type="email" 
                                    className="input"
                                    placeholder="Email"
                                    onChange={(event) => {setLoginEmail(event.target.value)}}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <input
                                    required
                                    type="password" 
                                    className="input"
                                    placeholder="Password"
                                    onChange={(event) => {setLoginPass(event.target.value)}}
                                />
                            </div>
                        </div>

                        <button className="button is-block is-info is-fullwidth" onClick={login}>
                            Login <i className="fa fa-sign-in" aria-hidden='true'></i>
                        </button>

                        </div>

                    </div>
                        <Link to="/register">Sign Up</Link> &nbsp; . &nbsp;
                        <Link to="../forgot-password">Forgot Password</Link> &nbsp; . &nbsp;
                        <Link to="../">Need Help?</Link>

                </div>
            </div>

        </section>
    )
}

export default Login
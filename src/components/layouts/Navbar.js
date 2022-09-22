import React, {useState} from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {auth} from '../../config/firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [isActive, setIsActive] = React.useState(false)

    const logout = async() => {
        await signOut(auth)
        navigate('/login')
    }

    return (
        <nav className="navbar" role='navigation' aria-label='main navigation'>
            <div className="navbar-brand">
                <a href="/" className="navbar-item">Victor React</a>
                <Link to='/camaba' className='navbar-item'>Camaba</Link>

                    {(() =>{
                        if(user){
                            return(
                                <a onClick={logout} className='navbar-item'>
                                    logout
                                </a>
                            )
                        }
                        return null
                    })()}

            </div>
        </nav>
  );
}

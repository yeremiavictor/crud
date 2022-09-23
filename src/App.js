import React, {useState} from "react";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Routes,  Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Navbar from "./components/layouts/Navbar";


function App() {
    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser)=> {
        setUser(currentUser)
    })

    try{
        if(user.email){
            return(
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Navbar/>}/>
                        <Route path='*' element={<Navbar/>}/>
                    </Routes>
                </BrowserRouter>
            )
        }
    }catch(err){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='*' element={<Login/>}/>
                    
                </Routes>
            </BrowserRouter>
        )

    }
}

export default App;

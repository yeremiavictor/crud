import React, {useState} from "react";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Routes,  Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPass from "./components/auth/ForgotPass";
import Add from "./components/camaba/Add";
import Detail from "./components/camaba/Detail";
import List from "./components/camaba/List";
import Edit from "./components/camaba/Edit";


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
                        <Route path='/' element={<List/>}/>
                        <Route path='/add' element={<Add/>}/>
                        <Route path='/detail/:id' element={<Detail/>}/>
                        <Route path='/edit/:id' element={<Edit/>}/>
                        <Route path='*' element={<List/>}/>
                    </Routes>
                </BrowserRouter>
            )
        }
    }catch(err){
        return(
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/Register' element={<Register/>}/>
                    <Route path='/forgot-password' element={<ForgotPass/>}/>
                    <Route path='*' element={<Login/>}/>
                    
                </Routes>
            </BrowserRouter>
        )

    }
}

export default App;

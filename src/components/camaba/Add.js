import React, {useState} from 'react'
import {collection, addDoc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
import {db} from '../../config/firebase'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'

export default function Add(){
    //create const
    const navigate = useNavigate()
    const[idMaba,setIdMaba] = useState('')
    const[nama, setNama] = useState('')
    const[prodi, setProdi] = useState('')

    const add = async() => {
        try{
            const docRef = await addDoc(collection(db, 'spmb'),{
                idMaba, nama, prodi
            })
            console.log('Dokumen berhasl dibuat dengan ID: ', docRef.idMaba)
            navigate('/')
        }catch(err){
            console.log("gagal mendambahkan dokumen ", err)
        }
    }

    return(
        <div className="body">
            <div className="hero is-fullheight is-default is-bold">
                <div className="hero-head">
                    <Navbar/>
                    <section className="hero is-primary is-small">
                        <div className="hero-body">
                            <p className="title">
                                Menambahkan data user
                            </p>
                        </div>
                    </section>

                    <div className="block"></div>

                    <div className="container is-fluid">
                        <div className="column is-4">

                            <div className="field">
                                <label htmlFor="" className="label">
                                    Id 
                                </label>

                                <div className="control">
                                    <input 
                                        type="text" 
                                        required
                                        className="input" 
                                        placeholder='ID'
                                        onChange = {(event)=> {setIdMaba(event.target.value)}}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="" className="label">
                                    Nama 
                                </label>

                                <div className="control">
                                    <input 
                                        type="text" 
                                        required
                                        className="input" 
                                        placeholder='Nama'
                                        onChange = {(event)=> {setNama(event.target.value)}}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="" className="label">
                                    Prodi 
                                </label>

                                <div className="control">
                                    <input 
                                        type="text" 
                                        required
                                        className="input" 
                                        placeholder='Prodi'
                                        onChange = {(event)=> {setProdi(event.target.value)}}
                                    />
                                </div>
                            </div>

                            <div className="column is-centered">
                                <div className="column is-auto">
                                    <button className="button is-block is-inf is-fullwidth" onClick={add}>
                                        Tambah data
                                    </button>
                                </div>

                            </div>


                        </div>
                    </div>

                </div>
            </div>

            <footer hero-footer className="hero has-text-centered is-flex-allign-items-flex-end mt-auto">
                <Footer/>
            </footer>

        </div>
    )

}
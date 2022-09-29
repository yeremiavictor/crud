import React, {useState, useEffect} from 'react'
import { db } from '../../config/firebase'
import {doc, getDoc, updateDoc} from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../layouts/Footer'
import Navbar from '../layouts/Navbar'

export default function Edit(){
    const navigate = useNavigate()
    const {id} = useParams ()
    const [idMaba, setIdMaba] = useState('')
    const [nama, setNama] = useState('')
    const [prodi, setProdi] = useState('')

    const docRef = doc(db, 'spmb', `${id}`)

    const Edit = async (id) => {
        try{
            await updateDoc(docRef, {
                idMaba, nama, prodi
            })
            console.log('berhasil edit')
            navigate('/')
        } catch(err) {
            console.error('gagal memperbarui dokumen: ', err)
        }
    }

    //ambil data
    useEffect (() => {
        getDataById()
    },[])

    const getDataById = async() => {
        const response = await getDoc(docRef)
        const resData = response.data()

        setIdMaba(resData.idMaba)
        setNama(resData.nama)
        setProdi(resData.prodi)
    }

    return(
        <div className="body">
            <div className="hero is-fullheight is-default is-bold">
                <div className="hero-head">
                    <Navbar/>
                </div>
                <section className="hero is-primary is-small"> 
                    <div className="hero-body">
                        <p className="title">
                            Mengubah data
                        </p>
                    </div>
                </section>

                <div className="block"></div>
                <div className="container is-fluid">
                    <div className="column is-4">

                        <div className="field">
                            <label htmlFor="" className="label">
                                ID
                            </label>
                            <div className="control">
                                <input 
                                    required
                                    type="text"
                                    className="input"
                                    value={idMaba}
                                    onChange={(event) => {setIdMaba(event.target.value)}}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="" className="label">
                                Nama
                            </label>
                            <div className="control">
                                <input 
                                    required
                                    type="text"
                                    className="input"
                                    value={nama}
                                    onChange={(event) => {setNama(event.target.value)}}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="" className="label">
                                ID
                            </label>
                            <div className="control">
                                <input 
                                    required
                                    type="text"
                                    className="input"
                                    value={prodi}
                                    onChange={(event) => {setProdi(event.target.value)}}
                                />
                            </div>
                        </div>

                        <div className="column is-centered">
                            <div className="column is-auto">
                                <button className="button is-block is-info is-fullwidth" onClick={Edit}>
                                    Ubah Data
                                </button>
                            </div>
                        </div>


                    </div>
                </div>
                

            </div>
            <footer className="hero has-text-centered is-flex-align-items-flex-end mt-auto"></footer>
            <Footer/>
        </div>
    )
}
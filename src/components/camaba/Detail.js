import React, {useState,useEffect} from 'react'
import { db } from '../../config/firebase'
import {doc, getDoc} from 'firebase/firestore'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'

export default function Detail(){
    const navigate = useNavigate()
    const {id} = useParams()

    const [idMaba, setIdMaba] = useState()
    const [nama, setNama] = useState()
    const [prodi, setProdi] = useState()

    const docRef = doc(db, 'spmb', `${id}`)

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
                    <section className="hero is-primary is-small">
                        <div className="hero-body">
                            <p className="title">
                                Menambahkan data
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
                                    <p>{idMaba}</p> 
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="" className="label">
                                    Nama
                                </label>
                                <div className="control">
                                    <p>{nama}</p>
                                </div>
                            </div>

                            <div className="field">
                                <label htmlFor="" className="label">
                                    Prodi
                                </label>
                                <div className="control">
                                    <p>{prodi}</p>
                                </div>
                            </div>

                            <div className="columns is-centered">
                                <div className="columns is-auto">
                                    <Link to='/'>
                                        <button className="button is-block is-info is-fullwidth">
                                            Kembali
                                        </button>
                                    </Link>

                                </div>

                            </div>

                        </div>
                    </div>




                </div>
            </div>
            <footer className='hero has text-centered is-flex-isalign-items-flex-end mt-auto'>
                <Footer/>
            </footer>
        </div>
    )
}
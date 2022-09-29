import React, {useState, useEffect} from 'react'
import { db } from '../../config/firebase'
import { collection, doc, getDocs, deleteDoc, query } from 'firebase/firestore'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faEye, faTrash } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import { async } from '@firebase/util'

//getAlldata
function List(){
    const navigate = useNavigate
    const [data, setData] = useState([])
    const dataCollectionRef = query(collection(db, 'spmb'))

    useEffect(() => {
        getData()
    },[])

    const getData = async() => {
        const DocumentSnapshot = await getDocs((dataCollectionRef))
        setData(DocumentSnapshot.docs.map((doc) => ({...doc.data(), id:doc.id})))
    }

    //removeselected data
    const del = async(id) => {
        await deleteDoc(doc(db,'spmb', id))
        getData()
    }

    return(
        <div className="body">
            <div className="hero is-fullheight is-default is-bold">
                <div className="hero-head">
                    <Navbar/>
                    <section className="hero is-primary is-small">
                        <div className="hero-body">
                            <p className="title">
                                Data SPMB
                            </p>
                        </div>
                    </section>

                    <div className="container is-fluid">
                        <div className="block"></div>
                        <div className="block"></div>
                        <Link to='/add'><button className="button is-success">Tambah Data</button></Link>

                        <div className="block">
                            <table className="table is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Prodi</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((spmb, index) =>{
                                        return(
                                            <tr key={spmb.id}>
                                                <td>{index+1}</td>
                                                <td>{spmb.nama}</td>
                                                <td>{spmb.prodi}</td>
                                                <td className="column-gap">

                                                    <Link to={`/edit/${spmb.id}`}>
                                                        <button className="button is-small is-warning">
                                                            <FontAwesomeIcon icon={faGear}/>
                                                        </button>
                                                    </Link>

                                                    <Link to={`/detail/${spmb.id}`}>
                                                        <button className="button is-small is-info">
                                                            <FontAwesomeIcon icon={faEye}/>
                                                        </button>
                                                    </Link>

                                                    <button className="button is-small is-danger" onClick={()=>del(spmb.id)}>
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                <footer className="hero-footer has-text-centered is-flex-align-items-flex-end mt-auto">
                    <Footer/>
                </footer>

            </div>
        </div>
        
    )

}

export default List
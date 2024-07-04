import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/spinner'

import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDeleteOutline } from 'react-icons/md'
import Navigation from '../components/navbar'



const Home = () => {
    const [loading, setLoading] = useState(false)
    const [racks, setRacks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10
    const [searched, setSearched] = useState([])
    useEffect(() => {
        setLoading(true)
        axios
            .get('http://localhost:3000/pallets')
            .then((res) => {
                setRacks(res.data.data)
                setSearched(res.data.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [])
    const handleSearch = () => {
        const search = document.querySelector('input').value
        if (search === '') {
            return
        }
        const result = racks.filter((rack) => {
            return rack.Zone.toLowerCase().includes(search.toLowerCase())
        })
        
        setSearched(result)
        setCurrentPage(1)
    }

    const indexOfLastRow = currentPage * rowsPerPage
    const indexOfFirstRow = indexOfLastRow - rowsPerPage
    const currentRows = searched.slice(indexOfFirstRow, indexOfLastRow)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <>
            <Navigation />
            <div className='d-flex center m-1 justify-evenly'>
                <a href='/add-rack' className='btn btn-primary mx-2'>
                    <MdOutlineAddBox /> Add New
                </a>
                <input type='text' placeholder='Search...' className='form-control mx-2 m-1' />
                <button className='btn btn-primary' onClick={handleSearch}>Search</button>
            </div>
            <div className='px-4 py-2 justify-items-center content-center'>
                {loading ? (
                    <Spinner />
                ) : (
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Zone</th>
                                <th>Aisle</th>
                                <th>Rack</th>
                                <th>Level</th>
                                <th>Filled</th>
                                <th>Item</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((rack) => (
                                <tr key={rack._id}>
                                    <td>{rack.Zone.toString()}</td>
                                    <td>{rack.Aisle}</td>
                                    <td>{rack.Rack}</td>
                                    <td>{rack.Level}</td>
                                    <td>{rack.Filled.toString()}</td>
                                    <td>{rack.Item}</td>
                                    <td>
                                        <a href={`/dash/${rack._id}`} className='btn btn-primary m-1' title='View Details'>
                                            <BsInfoCircle />
                                        </a>
                                        <a href={`/edit-racks/${rack._id}`} className='btn btn-warning m-1' title='Edit Rack'>
                                            <AiOutlineEdit />
                                        </a>
                                        <a href={`/delete-racks/${rack._id}`} className='btn btn-danger m-1' title='Delete Rack'>
                                            <MdOutlineDeleteOutline />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className='pagination justify-center'>
                    {Array.from({ length: Math.ceil(searched.length / rowsPerPage) }).map((_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)} className='m-1 px-2 bg-slate-100 rounded-md hover:bg-slate-200' title={`Go to Page ${index + 1}`}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
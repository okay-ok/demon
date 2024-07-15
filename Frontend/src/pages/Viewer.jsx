import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/spinner'
import { Button } from '@mui/material';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDeleteOutline } from 'react-icons/md'
import Navigation from '../components/navbar'
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import "@chakra-ui/react";
import "@chakra-ui/css-reset";

import { DataGrid } from '@mui/x-data-grid';
// import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
// import { BsInfoCircle } from 'react-icons/bs'
// import { MdOutlineAddBox, MdOutlineDeleteOutline } from 'react-icons/md'
// import Navigation from '../components/navbar'

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#f92672',
        },
        secondary: {
            main: '#a6e22e',
        },
    },
});


const Home1 = () => {
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



    /**
     * kuch toh krta h yar yeh,khud hi dekhlo m bhul gya
     * @param {*} pageNumber 
     * @returns goodvalue
     * Tstt!!
     */
    const paginate = (pageNumber) => setCurrentPage(pageNumber)




    return (
        <>
            <Navigation />


            <div className='d-flex justify-content-center'>
                <Button variant="contained" color="primary" href="/add-rack" className='mx-2'>
                    <MdOutlineAddBox /> Add New Pallet Position
                </Button>
            </div>
            {/* // <div ><Button variant="contained" color="primary" href="/add-rack" className='mx-2'>
        //         <MdOutlineAddBox /> Add New
        //     </Button></div>
             */}
            {/* <div className='d-flex center m-1 justify-evenly'>
                <a href='/add-rack' className='btn btn-primary mx-2'>
                    <MdOutlineAddBox /> Add New
                </a>
                 */}

            {/* </div> */}
            <div className='px-4 py-2 justify-items-center content-center'>
                {loading ? (
                    <Spinner />
                ) : (



                    <DataGrid
                        stickyHeader
                        getRowId={(row) => row._id}
                        rows={racks.map((rack) => ({ ...rack, id: rack._id }))}
                        columns={[
                            { field: 'Zone', headerName: 'Zone' },
                            { field: 'Aisle', headerName: 'Aisle' },
                            { field: 'Rack', headerName: 'Rack' },
                            { field: 'Level', headerName: 'Level' },
                            { field: 'Filled', headerName: 'Filled' },
                            { field: 'Item', headerName: 'Item Sr. No' },
                            {
                                field: 'Actions',
                                headerName: 'Actions',
                                headerAlign: 'center',
                                width: 240,
                                renderCell: (params) => (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
                                        <a href={`/clear-rack/${params.row._id}`} className='btn btn-primary m-1' title='Clear Inventory'>
                                            <BsInfoCircle />
                                        </a>
                                        <a href={`/edit-racks/${params.row._id}`} className='btn btn-warning m-1' title='Edit Rack'>
                                            <AiOutlineEdit />
                                        </a>
                                        <a href={`/delete-racks/${params.row._id}`} className='btn btn-danger m-1' title='Delete Rack'>
                                            <MdOutlineDeleteOutline />
                                        </a>
                                    </div>
                                ),
                            },
                        ]}
                        autoHeight
                        pageSize={rowsPerPage}
                        pagination
                        onPageChange={(params) => paginate(params.page)}

                    //checkboxSelection
                    />

                    // className='monokai'

                    // </ThemeProvider>
                )}
            </div>
        </>
    );
}

export default Home1
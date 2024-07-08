import React from 'react'
import Navigation from '../components/navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/spinner'

import { useSnackbar } from 'notistack'


import { TextField, Button } from '@mui/material';

// ...


const Add = () => {
  const [Zone, setZone] = React.useState('');
  const [Aisle, setAisle] = React.useState('');
  const [Rack, setRack] = React.useState('');
  const [Level, setLevel] = React.useState('');
  const [Capacity, setCapacity] = React.useState('');
  const [Filled, setFilled] = React.useState('');
  const [Item, setItem] = React.useState('');
  const [OccupiedWeight, setOccupiedWeight] = React.useState('');
  const [MaxWeight, setMaxWeight] = React.useState('');
  const [Units, setUnits] = React.useState('');
  const [Value, setValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const Navigate = useNavigate();

  const handleSubmit = () => {
    const data = {
      Zone,
      Aisle,
      Rack,
      Level,
      Capacity,
      Filled,
      Item,
      OccupiedWeight,
      MaxWeight,
      Units,
      Value
    };
    setLoading(true);
    if (
      Zone === '' ||
      Aisle === '' ||
      Rack === '' ||
      Level === '' ||
      Capacity === '' ||
      Filled === '' ||
      Item === '' ||
      OccupiedWeight === '' ||
      MaxWeight === '' ||
      Units === '' ||
      Value === ''
    ) {
      setLoading(false);
      enqueueSnackbar('Please Fill All Fields', { variant: 'error' });
      return;
    }
    axios
      .post('http://localhost:3000/pallets', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('pallet Added Successfully', { variant: 'success' });
        Navigate('/');
        return;
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        enqueueSnackbar('Failed to Add Pallet', { variant: 'error' });
        return;
      });
  };

  return (
    <>
      <Navigation />
      <div className='p-4 dark:bg-gray-800'>
      <h1 className='text-3xl my-4 dark:text-white'>Edit</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto dark:border-gray-600'>
        <div className='my-4'>
        <select
          value={Zone}
          onChange={(e) => setZone(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white'
        >
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
        </select>
        </div>
        <div className='my-4'>
        <input
          type='text'
          placeholder='Aisle'
          value={Aisle}
          onChange={(e) => setAisle(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white'
        />
        </div>
        <div className='my-4'>
        <input
          type='text'
          placeholder='Rack'
          value={Rack}
          onChange={(e) => setRack(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white'
        />
        </div>
        <div className='my-4'>
        <input
          type='text'
          placeholder='Level'
          value={Level}
          onChange={(e) => setLevel(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white'
        />
        </div>
        <div className='my-4'>
        <input
          type='text'
          placeholder='Capacity'
          value={Capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white'
        />
        </div>
        <div className='my-4'>
        <select
          value={Filled}
          onChange={(e) => setFilled(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white'
        >
          <option value='-NA-'>-NA-</option>
          <option value='true'>True</option>
          <option value='false'>False</option>
        </select>
        </div>
        <div className='my-4'>
        <input
          type='text'
          placeholder='Item Sr. No.'
          value={Item}
          onChange={(e) => setItem(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white'
        />
        </div>
        <div className='my-4'>
        <input
          type='text'
          placeholder='OccupiedWeight'
          value={OccupiedWeight}
          onChange={(e) => setOccupiedWeight(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white'
        />
        </div>
        <div className='my-4'>
        <input
          type='text'
          placeholder='MaxWeight'
          value={MaxWeight}
          onChange={(e) => setMaxWeight(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white'
        />
        </div>
        <div className='my-4'>
        <input
          type='text'
          placeholder='Units'
          value={Units}
          onChange={(e) => setUnits(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white'
        />
        </div>
        <div className='my-4'>
        <input
          type='text'
          placeholder='Value'
          value={Value}
          onChange={(e) => setValue(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-full dark:bg-gray-700 dark:text-white'
        />
        </div>
        <button
        className='bg-blue-500 text-white rounded-md p-2 w-full'
        onClick={handleSubmit}
        >
        Confirm Addition
        </button>
      </div>
      </div>
    </>
    );
};






export default Add
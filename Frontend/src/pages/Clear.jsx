import React, { useEffect } from 'react'
import Navigation from '../components/navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/spinner'
//importing bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'

import { useSnackbar } from 'notistack'


const Clear = () => {
  //EXTRACTING THE ID FROM THE URL
  const Navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
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


  const handleSubmit = () => {
    var data = {
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
    data.Filled = 'false'
    if (data.Filled === 'false') {
      data.Item = '0'
      data.OccupiedWeight = '0'
      data.Units = '0'
      data.Value = '0'
    }

    axios
      .put(`http://localhost:3000/pallets/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('pallet Edited Successfully', { variant: 'success' });
        Navigate('/dashboard');
        return;
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        enqueueSnackbar('Failed to Edit Pallet', { variant: 'error' });
        return;
      });
  };

  const path = window.location.pathname
  const id = path.split('/')[2]
  useEffect(() => {
    axios.get(`http://localhost:3000/pallets/${id}`)
      .then((res) => {
        console.log(res.data)
        setZone(res.data.Zone)
        setAisle(res.data.Aisle)
        setRack(res.data.Rack)
        setLevel(res.data.Level)
        setCapacity(res.data.Capacity)
        setFilled(res.data.Filled)
        setItem(res.data.Item)
        setOccupiedWeight(res.data.OccupiedWeight)
        setMaxWeight(res.data.MaxWeight)
        setUnits(res.data.Units)
        setValue(res.data.Value)

      }
      )
      .catch((err) => {
        console.log(err)
      }
      )
  }, [id])
  return (
    <>
      <Navigation />
      <div className='p-4 dark:bg-gray-800'>
        <h1 className='text-3xl my-4 text-white'>Edit</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto dark:border-gray-500'>
          <div className='my-4'></div>
          <label className='text-xl mr-4 text-gray-500 dark:text-gray-400'>Zone</label>
          <input
            type='text'
            value={Zone}
            onChange={(e) => setZone(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full dark:bg-gray-700 dark:text-white'
            disabled
          />
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500 dark:text-gray-400'>Aisle</label>
            <input
              type='text'
              value={Aisle}
              onChange={(e) => setAisle(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full dark:bg-gray-700 dark:text-white'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500 dark:text-gray-400'>Rack</label>
            <input
              type='text'
              value={Rack}
              onChange={(e) => setRack(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full dark:bg-gray-700 dark:text-white'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500 dark:text-gray-400'>Level</label>
            <input
              type='text'
              value={Level}
              onChange={(e) => setLevel(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full dark:bg-gray-700 dark:text-white'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500 dark:text-gray-400'>Capacity</label>
            <input
              type='text'
              value={Capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full dark:bg-gray-700 dark:text-white'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500 dark:text-gray-400'>Filled</label>
            <select
              value={Filled}
              onChange={(e) => {
                setFilled(e.target.value);
                if (e.target.value === 'false') {
                  setValue(0);
                  setItem('0');
                  setOccupiedWeight(0);
                  setUnits('0');
                } else {
                }
              }}
              className='border-2 border-gray-500 px-4 py-2 w-full dark:bg-gray-700 dark:text-white'
              disabled
            >
              <option value='true'>True</option>
              <option value='false'>False</option>
            </select>
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500 dark:text-gray-400'>Item Sr.No.</label>
            <input
              type='text'
              value={Item}
              onChange={(e) => setItem(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full dark:bg-gray-700 dark:text-white'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500 dark:text-gray-400'>OccupiedWeight</label>
            <input
              type='text'
              value={OccupiedWeight}
              onChange={(e) => setOccupiedWeight(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full dark:bg-gray-700 dark:text-white'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500 dark:text-gray-400'>MaxWeight</label>
            <input
              type='text'
              value={MaxWeight}
              onChange={(e) => setMaxWeight(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full dark:bg-gray-700 dark:text-white'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500 dark:text-gray-400'>Units</label>
            <input
              type='text'
              value={Units}
              onChange={(e) => setUnits(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full dark:bg-gray-700 dark:text-white'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500 dark:text-gray-400'>Value</label>
            <input
              type='text'
              value={Value}
              onChange={(e) => setValue(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full dark:bg-gray-700 dark:text-white'
              disabled
            />
          </div>
          <div className='my-4'>
            <button className='p-2 bg-sky-300 m-8 dark:bg-gray-600 dark:text-white' onClick={handleSubmit}>
              Confirm Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Clear
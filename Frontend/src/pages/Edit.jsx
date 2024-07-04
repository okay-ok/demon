import React, { useEffect } from 'react'
import Navigation from '../components/navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/spinner'

import { useSnackbar } from 'notistack'


const Edit = () => {
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
      .put(`http://localhost:3000/pallets/${id}`, data)
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
  }, [])


  return (
    <>
      <Navigation />
      <div className='p-4'>
        <h1 className='text-3xl my-4'>Edit</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>

          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Zone</label>
            <input
              type='text'
              value={Zone}
              onChange={(e) => setZone(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full'
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Aisle</label>
            <input
              type='text'
              value={Aisle}
              onChange={(e) => setAisle(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2  w-full '
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Rack</label>
            <input
              type='text'
              value={Rack}
              onChange={(e) => setRack(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2  w-full '
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Level</label>
            <input
              type='text'
              value={Level}
              onChange={(e) => setLevel(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2  w-full '
              disabled
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Capacity</label>
            <input
              type='text'
              value={Capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2  w-full '
              disabled
            />
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Filled</label>
              <select
                value={Filled}
                onChange={(e) => setFilled(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2 w-full'
              >
                <option value='true'>True</option>
                <option value='false'>False</option>
              </select>
            </div>

            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Item</label>
              <input
                type='text'
                value={Item}
                onChange={(e) => setItem(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>OccupiedWeight</label>
              <input
                type='text'
                value={OccupiedWeight}
                onChange={(e) => setOccupiedWeight(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>MaxWeight</label>
              <input
                type='text'
                value={MaxWeight}
                onChange={(e) => setMaxWeight(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2  w-full '
                disabled
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Units</label>
              <input
                type='text'
                value={Units}
                onChange={(e) => setUnits(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
            </div>
            <div className='my-4'>
              <label className='text-xl mr-4 text-gray-500'>Value</label>
              <input
                type='text'
                value={Value}
                onChange={(e) => setValue(e.target.value)}
                className='border-2 border-gray-500 px-4 py-2  w-full '
              />
            </div>
            <button className='p-2 bg-sky-300 m-8' onClick={handleSubmit}>
              Confirm Edit
            </button>
          </div>


       
       </div>
        
      </div>
      </>
        );
}

        export default Edit
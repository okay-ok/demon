import React, { useEffect } from 'react'
import Navigation from '../components/navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/spinner'
//importing bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'

import { useSnackbar } from 'notistack'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
        Navigate('/');
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
  // return (
  //<>
  // <Navigation />


  // ...

  return (
    <>
      <Navigation />
      <div className='p-4 dark:bg-gray-800'>
        <h1 className='text-3xl my-4 text-white'>Edit</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto dark:border-gray-500'>
          <div className='my-4'></div>
          <Form>

            <Form.Group className='mb-3' controlId='zone'>
              <Form.Label>Zone</Form.Label>
              <Form.Control
                type='text'
                value={Zone}
                onChange={(e) => setZone(e.target.value)}
                disabled
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='aisle'>
              <Form.Label>Aisle</Form.Label>
              <Form.Control
                type='text'
                value={Aisle}
                onChange={(e) => setAisle(e.target.value)}
                disabled
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='rack'>
              <Form.Label>Rack</Form.Label>
              <Form.Control
                type='text'
                value={Rack}
                onChange={(e) => setRack(e.target.value)}
                disabled
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='level'>
              <Form.Label>Level</Form.Label>
              <Form.Control
                type='text'
                value={Level}
                onChange={(e) => setLevel(e.target.value)}
                disabled
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='capacity'>
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type='text'
                value={Capacity}
                onChange={(e) => setCapacity(e.target.value)}
                disabled
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='filled'>
              <Form.Label>Filled</Form.Label>
              <Form.Select
                value={Filled}
                onChange={(e) => {
                  setFilled(e.target.value);
                  if (e.target.value === 'false') {
                    setValue(0);
                    setItem('0');
                    setOccupiedWeight(0);
                    setUnits('0');
                  }
                }}
                disabled={loading}
              >
                <option value='true'>True</option>
                <option value='false'>False</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3' controlId='item'>
              <Form.Label>Item Sr.No.</Form.Label>
              <Form.Control
                type='text'
                value={Item}
                onChange={(e) => setItem(e.target.value)}
                disabled={Filled === 'false'}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='occupiedWeight'>
              <Form.Label>OccupiedWeight</Form.Label>
              <Form.Control
                type='text'
                value={OccupiedWeight}
                onChange={(e) => setOccupiedWeight(e.target.value)}
                disabled={Filled === 'false'}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='maxWeight'>
              <Form.Label>MaxWeight</Form.Label>
              <Form.Control
                type='text'
                value={MaxWeight}
                onChange={(e) => setMaxWeight(e.target.value)}
                disabled
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='units'>
              <Form.Label>Units</Form.Label>
              <Form.Control
                type='text'
                value={Units}
                onChange={(e) => setUnits(e.target.value)}
                disabled={Filled === 'false'}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='value'>
              <Form.Label>Value</Form.Label>
              <Form.Control
                type='text'
                value={Value}
                onChange={(e) => setValue(e.target.value)}
                disabled={Filled === 'false'}
              />
            </Form.Group>
            <Button variant='primary' onClick={handleSubmit}>
              Confirm Edit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
  {/* <div className='p-4 dark:bg-gray-800'>
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
          disabled={Filled === 'false'}
        />
        </div>
        <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500 dark:text-gray-400'>OccupiedWeight</label>
        <input
          type='text'
          value={OccupiedWeight}
          onChange={(e) => setOccupiedWeight(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full dark:bg-gray-700 dark:text-white'
          disabled={Filled === 'false'}
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
          disabled={Filled === 'false'}
        />
        </div>
        <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500 dark:text-gray-400'>Value</label>
        <input
          type='text'
          value={Value}
          onChange={(e) => setValue(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full dark:bg-gray-700 dark:text-white'
          disabled={Filled === 'false'}
        />
        </div>
        <div className='my-4'>
        <button className='p-2 bg-sky-300 m-8 dark:bg-gray-600 dark:text-white' onClick={handleSubmit}>
          Confirm Edit
        </button>
        </div>
      </div>
      </div> */}
  //</>
  //);
}

export default Edit
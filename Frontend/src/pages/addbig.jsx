import React, { useState } from 'react';
import Navigation from '../components/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/spinner';
import { useSnackbar } from 'notistack';
import { TextField, Button, Select, MenuItem, Grid } from '@mui/material';

const AddBig = () => {
  const initialPallet = {
    Zone: '1',
    Rack: '1',
    Level: '1',
    Capacity: '1',
    Filled: 'false',
    Item: '1',
    OccupiedWeight: '1',
    MaxWeight: '1',
    Units: '1',
    Value: '1',
  };

  const [pallets, setPallets] = useState(Array(8).fill(initialPallet));
  const [aisle, setAisle] = useState('1');
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const Navigate = useNavigate();

  const handleChange = (index, field, value) => {
    const newPallets = [...pallets];
    newPallets[index] = { ...newPallets[index], [field]: value };
    setPallets(newPallets);
  };

  const handleSubmit = () => {
    setLoading(true);
    const isValid = pallets.every(pallet => 
      Object.values(pallet).every(value => value !== '')
    );

    if (!isValid) {
      setLoading(false);
      enqueueSnackbar('Please Fill All Fields for All Pallets', { variant: 'error' });
      return;
    }

    const requests = pallets.map(pallet => 
      axios.post('http://localhost:3000/pallets', { ...pallet, Aisle: aisle })
    );

    Promise.all(requests)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('8 Pallets Added Successfully', { variant: 'success' });
        Navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        enqueueSnackbar('Failed to Add Pallets', { variant: 'error' });
      });
  };

  return (
    <>
      <Navigation />
      <div className='p-4 dark:bg-gray-800'>
        <h1 className='text-3xl my-4 dark:text-white d-flex justify-content-center'>Add 8 New Pallets</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[90%] p-4 mx-auto dark:border-gray-600'>
          <Grid container spacing={2} className='mb-4'>
            <Grid item xs={3}>
              <Select
                fullWidth
                value={aisle}
                onChange={(e) => setAisle(e.target.value)}
                className='dark:bg-gray-700 dark:text-white'
                label="Aisle (for all pallets)"
              >
                {[1, 2, 3].map((a) => (
                  <MenuItem key={a} value={a.toString()}>{a}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          {pallets.map((pallet, index) => (
            <Grid container spacing={2} key={index} className='mb-4'>
              <Grid item xs={12}>
                <h2 className='text-xl dark:text-white'>Pallet {index + 1}</h2>
              </Grid>
              <Grid item xs={3}>
                <Select
                  fullWidth
                  value={pallet.Zone}
                  onChange={(e) => handleChange(index, 'Zone', e.target.value)}
                  className='dark:bg-gray-700 dark:text-white'
                  label="Zone"
                >
                  {[1, 2, 3, 4, 5, 6].map((zone) => (
                    <MenuItem key={zone} value={zone.toString()}>{zone}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={3}>
                <Select
                  fullWidth
                  value={pallet.Rack}
                  onChange={(e) => handleChange(index, 'Rack', e.target.value)}
                  className='dark:bg-gray-700 dark:text-white'
                  label="Rack"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((rack) => (
                    <MenuItem key={rack} value={rack.toString()}>{rack}</MenuItem>
                  ))}
                </Select>
              </Grid>
              {['Level', 'Capacity', 'Item', 'OccupiedWeight', 'MaxWeight', 'Units', 'Value'].map((field) => (
                <Grid item xs={3} key={field}>
                  <TextField
                    fullWidth
                    type="number"
                    label={field}
                    value={pallet[field]}
                    onChange={(e) => handleChange(index, field, e.target.value)}
                    className='dark:bg-gray-700 dark:text-white'
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                </Grid>
              ))}
              <Grid item xs={3}>
                <Select
                  fullWidth
                  value={pallet.Filled}
                  onChange={(e) => handleChange(index, 'Filled', e.target.value)}
                  className='dark:bg-gray-700 dark:text-white'
                  label="Filled"
                >
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
                </Select>
              </Grid>
            </Grid>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className='mt-4'
          >
            Confirm Addition of 8 Pallets
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddBig;
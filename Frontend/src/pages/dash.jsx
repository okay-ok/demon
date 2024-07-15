import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, FormControl, InputLabel, Select, MenuItem, Chip } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Upload } from 'lucide-react';
import Navigation from '@/components/navbar';

// Generate sample data (unchanged)
const generateSampleData = (days, sites) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(2024, 0, i + 1);
    const entry = { date: date.toISOString().split('T')[0] };
    for (let j = 1; j <= sites; j++) {
      entry[`Site_${j}`] = Math.floor(Math.random() * 200) + 50; // Random value between 50 and 250
    }
    data.push(entry);
  }
  return data;
};

const sampleData = generateSampleData(30, 10); // 30 days of data for 10 sites

const Dashboard = () => {
  const [data, setData] = useState(sampleData);
  const [predictions, setPredictions] = useState({});
  const [selectedSites, setSelectedSites] = useState(['Site_1', 'Site_2', 'Site_3']); // Default selected sites

  useEffect(() => {
    const newPredictions = performPrediction(data);
    setPredictions(newPredictions);
  }, [data]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('File uploaded:', file.name);
  };

  const performPrediction = (data) => {
    const sites = Object.keys(data[0]).filter(key => key.startsWith('Site_'));
    const predictions = {};
    
    sites.forEach(site => {
      const values = data.map(entry => entry[site]);
      const average = values.reduce((a, b) => a + b, 0) / values.length;
      predictions[site] = Math.round(average * 1.1);
    });

    return predictions;
  };

  const handleSiteSelection = (event) => {
    setSelectedSites(event.target.value);
  };

  return (
    <>
    <Navigation />
    <div style={{ padding: '20px', backgroundColor: '#2C3E50', color: '#ECF0F1' }}>
      <Typography variant="h4" style={{ color: '#FF8C00', marginBottom: '20px' }}>
        Warehouse Goods Movement Dashboard
      </Typography>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<Upload />}
          style={{ backgroundColor: '#FF4500', color: 'white' }}
        >
          Upload Data
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>

        <FormControl style={{ minWidth: 200 }}>
          <InputLabel id="site-select-label" style={{ color: '#ECF0F1' }}>Select Sites</InputLabel>
          <Select
            labelId="site-select-label"
            multiple
            value={selectedSites}
            onChange={handleSiteSelection}
            style={{ color: '#ECF0F1', backgroundColor: '#34495E' }}
            renderValue={(selected) => (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} style={{ backgroundColor: '#FF8C00', color: 'white' }} />
                ))}
              </div>
            )}
          >
            {Object.keys(data[0]).filter(key => key.startsWith('Site_')).map((site) => (
              <MenuItem key={site} value={site}>
                {site}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {Object.entries(predictions)
          .filter(([site]) => selectedSites.includes(site))
          .map(([site, prediction]) => (
          <Card key={site} style={{ padding: '20px', backgroundColor: '#34495E', color: '#ECF0F1', flexBasis: 'calc(20% - 20px)' }}>
            <Typography variant="h6" style={{ color: '#FF8C00' }}>{site}</Typography>
            <Typography variant="body1">Predicted: {prediction}</Typography>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: '40px' }}>
        <Typography variant="h5" style={{ color: '#FF8C00', marginBottom: '20px' }}>
          Movement Trends
        </Typography>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ECF0F1" />
            <XAxis dataKey="date" stroke="#ECF0F1" />
            <YAxis stroke="#ECF0F1" />
            <Tooltip contentStyle={{ backgroundColor: '#34495E', color: '#ECF0F1' }} />
            <Legend />
            {selectedSites.map((site, index) => (
              <Line 
                key={site} 
                type="monotone" 
                dataKey={site} 
                stroke={`hsl(${index * 36}, 100%, 50%)`} 
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
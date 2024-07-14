import React, { useState, useEffect } from 'react';
import { Button, Card, Typography } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Upload } from 'lucide-react';
import Navigation from '@/components/navbar';
// Generate sample data
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

  return (
    <>
    <Navigation />
    <div style={{ padding: '20px', backgroundColor: '#FFF5EE' }}>
      <Typography variant="h4" style={{ color: '#FF4500', marginBottom: '20px' }}>
        Warehouse Goods Movement Dashboard
      </Typography>
      
      <Button
        variant="contained"
        component="label"
        startIcon={<Upload />}
        style={{ backgroundColor: '#FF8C00', color: 'white', marginBottom: '20px' }}
      >
        Upload Data
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {Object.entries(predictions).map(([site, prediction]) => (
          <Card key={site} style={{ padding: '20px', backgroundColor: '#FFDAB9', flexBasis: 'calc(20% - 20px)' }}>
            <Typography variant="h6" style={{ color: '#FF4500' }}>{site}</Typography>
            <Typography variant="body1">Predicted: {prediction}</Typography>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: '40px' }}>
        <Typography variant="h5" style={{ color: '#FF4500', marginBottom: '20px' }}>
          Movement Trends
        </Typography>
        <LineChart width={1000} height={500} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(data[0]).filter(key => key.startsWith('Site_')).map((site, index) => (
            <Line 
              key={site} 
              type="monotone" 
              dataKey={site} 
              stroke={`hsl(${index * 36}, 100%, 50%)`} 
            />
          ))}
        </LineChart>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
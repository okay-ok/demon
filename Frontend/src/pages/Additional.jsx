import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Typography, Paper, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, CardHeader } from "../components/card";
import { Alert, AlertDescription, AlertTitle } from "../components/alert";
import { Badge } from "../components/badge";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Navigation from '@/components/navbar';
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff4400',
    },
    secondary: {
      main: '#ff8c00',
    },
    background: {
      default: '#2a2a2a',
      paper: '#333333',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
});

const PredictiveRestockingPage = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [predicting, setPredicting] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/pallets')
      .then((res) => {
        const inventoryData = res.data.data.map(pallet => ({
          ...pallet,
          currentStock: Math.floor(Math.random() * 100), // Simulated current stock
          averageDailyUsage: Math.floor(Math.random() * 10), // Simulated average daily usage
        }));
        setInventory(inventoryData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const predictRestocking = () => {
    setPredicting(true);
    // Simulating AI prediction (replace with actual AI model in production)
    setTimeout(() => {
      const predictedInventory = inventory.map(item => ({
        ...item,
        predictedDaysUntilRestock: Math.floor(item.currentStock / (item.averageDailyUsage || 1)),
        restockUrgency: Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low',
      }));
      setInventory(predictedInventory);
      setPredicting(false);
    }, 2000);
  };

  const columns = [
    { field: 'Zone', headerName: 'Zone', width: 100 },
    { field: 'Aisle', headerName: 'Aisle', width: 100 },
    { field: 'Rack', headerName: 'Rack', width: 100 },
    { field: 'Level', headerName: 'Level', width: 100 },
    { field: 'Item', headerName: 'Item Sr. No', width: 150 },
    { field: 'currentStock', headerName: 'Current Stock', width: 150 },
    { field: 'averageDailyUsage', headerName: 'Avg. Daily Usage', width: 150 },
    { 
      field: 'predictedDaysUntilRestock', 
      headerName: 'Days Until Restock', 
      width: 180,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {params.value} 
          {params.value < 7 ? <TrendingDownIcon style={{ color: '#f44336', marginLeft: 5 }} /> : 
           params.value > 30 ? <TrendingUpIcon style={{ color: '#4caf50', marginLeft: 5 }} /> : null}
        </div>
      ),
    },
    {
      field: 'restockUrgency',
      headerName: 'Restock Urgency',
      width: 180,
      renderCell: (params) => (
        <Badge variant="default" style={{ 
          backgroundColor: 
            params.value === 'High' ? '#f44336' : 
            params.value === 'Medium' ? '#ff9800' : '#4caf50',
          color: '#ffffff'
        }}>
          {params.value}
        </Badge>
      ),
    },
  ];

  return (
    <>
    <Navigation />
    <ThemeProvider theme={theme}>
      <div style={{ padding: '20px', backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom style={{ color: theme.palette.text.primary }}>Predictive Restocking</Typography>
        
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={predictRestocking} 
          style={{ marginBottom: '20px' }}
          disabled={predicting}
        >
          {predicting ? <CircularProgress size={24} /> : 'Predict Restocking Needs'}
        </Button>

        <Card style={{ backgroundColor: theme.palette.background.paper, marginBottom: '20px' }}>
          <CardHeader>
            <h3 className="text-2xl font-bold" style={{ color: theme.palette.text.primary }}>Inventory Prediction</h3>
          </CardHeader>
          <CardContent>
            <Alert variant="default" style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, marginBottom: '20px' }}>
              <AlertTitle>AI-Powered Insights</AlertTitle>
              <AlertDescription>
                Our AI model analyzes historical data and current stock levels to predict restocking needs.
              </AlertDescription>
            </Alert>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={inventory}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row._id}
                loading={loading}
                style={{ color: theme.palette.text.primary }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
    </>
  );
};

export default PredictiveRestockingPage;
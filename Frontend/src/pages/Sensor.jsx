import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { Button, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, CardHeader } from "../components/card";
import { Alert, AlertDescription, AlertTitle } from "../components/alert";
import { Badge } from "../components/badge";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Navigation from '@/components/navbar';
import { Button, Paper, Typography, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

const SensorPage = () => {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reconcileResult, setReconcileResult] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/pallets')
      .then((res) => {
        const sensorData = res.data.data.map(pallet => ({
          ...pallet,
          sensorWorking: Math.random() > 0.1, // 90% chance of working
          sensorReading: Math.random() > 0.2 ? pallet.Filled : !pallet.Filled, // 80% chance of correct reading
        }));
        setSensors(sensorData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: 'Zone', headerName: 'Zone', width: 100 },
    { field: 'Aisle', headerName: 'Aisle', width: 100 },
    { field: 'Rack', headerName: 'Rack', width: 100 },
    { field: 'Level', headerName: 'Level', width: 100 },
    { 
      field: 'sensorReading', 
      headerName: 'Sensor Reading', 
      width: 150,
      renderCell: (params) => (
        <Badge variant={params.value ? "default" : "secondary"} style={{ backgroundColor: params.value ? '#ff4400' : '#ff8c00', color: '#ffffff' }}>
          {params.value ? "Filled" : "Not Filled"}
        </Badge>
      ),
    },
    { field: 'Item', headerName: 'Item Sr. No', width: 150 },
    {
      field: 'sensorWorking',
      headerName: 'Sensor Status',
      width: 150,
      renderCell: (params) => (
        <div style={{ 
          width: 20, 
          height: 20, 
          borderRadius: '50%', 
          backgroundColor: params.value ? '#4caf50' : '#f44336' 
        }} />
      ),
    },
  ];

  const handleReconcile = () => {
    const discrepancies = sensors.filter(sensor => 
      sensor.Filled !== sensor.sensorReading && sensor.sensorWorking
    );
    setReconcileResult(discrepancies);
    setDrawerOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <div style={{ padding: '10px', backgroundColor: theme.palette.background.default, maxHeight: '100vh' }}>
      
        <Typography variant="h4" gutterBottom style={{ color: theme.palette.text.primary }}>Warehouse Sensor Status</Typography>
        
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleReconcile} 
          style={{ marginBottom: '20px' }}
        >
          Reconcile Data
        </Button>

        {reconcileResult && (
          <Alert variant="destructive" style={{ marginBottom: '20px', backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary }}>
            <AlertTitle>Discrepancies Found</AlertTitle>
            <AlertDescription>
              {reconcileResult.length} pallet positions have discrepancies between sensor readings and inventory data.
            </AlertDescription>
          </Alert>
        )}

        <Card style={{ backgroundColor: theme.palette.background.paper }}>
          <CardHeader>
            <h3 className="text-2xl font-bold" style={{ color: theme.palette.text.primary }}>Sensor Readings</h3>
          </CardHeader>
          <CardContent>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={sensors}
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

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            style: {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              width: 300,
            },
          }}
        >
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Typography variant="h6">Discrepancies</Typography>
              <IconButton onClick={() => setDrawerOpen(false)} style={{ color: theme.palette.text.primary }}>
                <CloseIcon />
              </IconButton>
            </div>
            <List>
              {reconcileResult && reconcileResult.map((item, index) => (
                <ListItem key={index} style={{ backgroundColor: index % 2 === 0 ? theme.palette.primary.main : theme.palette.secondary.main, marginBottom: '10px', borderRadius: '4px' }}>
                  <ListItemText
                    primary={`Zone: ${item.Zone}, Aisle: ${item.Aisle}, Rack: ${item.Rack}, Level: ${item.Level}`}
                    secondary={`Inventory: ${item.Filled ? 'Filled' : 'Not Filled'}, Sensor: ${item.sensorReading ? 'Filled' : 'Not Filled'}`}
                    primaryTypographyProps={{ style: { color: theme.palette.text.primary } }}
                    secondaryTypographyProps={{ style: { color: theme.palette.text.secondary } }}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </div>
    </ThemeProvider>
  );
};

export default SensorPage;
import React, { useState,useEffect} from 'react';
import { Button } from "../components/button"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Card, CardContent, CardHeader, CardTitle } from "../components/card"
import { Alert, AlertDescription, AlertTitle } from "../components/alert"
import { Slider, Typography, Box, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import Navigation from '@/components/navbar';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/drawer"

import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom MUI theme for red and orange scheme







const theme = createTheme({
  palette: {
    primary: { main: '#D32F2F' },
    secondary: { main: '#F57C00' },
  },
});

const zones = [1, 2, 3, 4, 5, 6];
const levels = [1, 2, 3];
const MAX_RACK_WEIGHT = 1000; // kg








 import { useNavigate } from 'react-router-dom';
 function SuggestPalletZone() {
  const [leadTime, setLeadTime] = useState(30);
  const [weightPercentage, setWeightPercentage] = useState(5);
  const [suggestedZone, setSuggestedZone] = useState(null);
  const [suggestedLevel, setSuggestedLevel] = useState(null);
  const [fragility, setFragility] = useState(50);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pallets, setPallets] = useState([]);
  const [suitableRacks, setSuitableRacks] = useState([]);

  useEffect(() => {
    fetchPallets();
  }, []);

  const fetchPallets = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pallets');
      setPallets(response.data.data);
    } catch (error) {
      console.error('Error fetching pallets:', error);
    }
  };

  const suggestZone = () => {
    const zoneIndex = Math.min(Math.floor(leadTime / 10), 5);
    const zone = zones[zoneIndex];
    let levelIndex = 2 - Math.min(Math.floor(weightPercentage / 25), 3);
    levelIndex = Math.max(0, Math.min(2, levelIndex - Math.floor(fragility / 33)));
    const level = levels[levelIndex];
    setSuggestedZone(zone);
    setSuggestedLevel(level);

    updateSuitableRacks(zone, level);
  };

  const updateSuitableRacks = (zone, level) => {
    const suitable = pallets.filter(pallet => 
      (pallet.Zone.toString()) === zone.toString() && 
      pallet.Level.toString() === level.toString() && 
      !pallet.Filled
    );
    //setting suitable racks to the first 5 racks
    setSuitableRacks(suitable.slice(0, 5));
    //setSuitableRacks(suitable);
  };

  const handleFragilityChange = (newValue) => {
    setFragility(newValue);
    suggestZone();
  };

  return (
    <ThemeProvider theme={theme}>
        <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-[400px] shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">Suggest Pallet Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <Box sx={{ width: '100%' }}>
              <Typography id="lead-time-slider" gutterBottom className="text-gray-700">
                Lead Time (days): {leadTime} days
              </Typography>
              <Slider
                value={leadTime}
                onChange={(_, newValue) => setLeadTime(newValue)}
                aria-labelledby="lead-time-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={60}
                sx={{
                  color: '#D32F2F',
                  '& .MuiSlider-thumb': { backgroundColor: '#D32F2F' },
                  '& .MuiSlider-track': { backgroundColor: '#D32F2F' },
                  '& .MuiSlider-rail': { backgroundColor: '#FFCDD2' },
                }}
              />
            </Box>
            <Box sx={{ width: '100%', mt: 4 }}>
              <Typography id="weight-slider" gutterBottom className="text-gray-700">
                Weight: {weightPercentage}% of max rack weight ({(weightPercentage * MAX_RACK_WEIGHT / 100).toFixed(0)} kg)
              </Typography>
              <Slider
                value={weightPercentage}
                onChange={(_, newValue) => setWeightPercentage(newValue)}
                aria-labelledby="weight-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={100}
                sx={{
                  color: '#D32F2F',
                  '& .MuiSlider-thumb': { backgroundColor: '#D32F2F' },
                  '& .MuiSlider-track': { backgroundColor: '#D32F2F' },
                  '& .MuiSlider-rail': { backgroundColor: '#FFCDD2' },
                }}
              />
            </Box>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button onClick={suggestZone} className="mt-4 bg-red-700 hover:bg-red-800 w-full">Suggest Zone</Button>
              </DrawerTrigger>
              <DrawerContent className="bg-white">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8 cursor-grab" />
                <DrawerHeader className="text-center">
                  <DrawerTitle className="text-gray-800">Suggested Placement</DrawerTitle>
                  <DrawerDescription className="text-gray-600">
                    Based on the provided information, we suggest:
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0 flex flex-col items-center">
                  <Alert className="bg-red-50 border-red-200 text-center w-fit mb-4">
                    <AlertTitle className="text-red-800 text-2xl">Zone: {suggestedZone}</AlertTitle>
                    <AlertDescription className="text-red-700 text-xl">Level: {suggestedLevel}</AlertDescription>
                  </Alert>
                  {suitableRacks.length > 0 ? (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2"> First 5 Available Racks:</h3>
                      <ul className="list-disc pl-5">
                        {suitableRacks.map((rack, index) => (
                          <li key={index} className="text-gray-700">
                            Rack {rack.ID} - Zone {rack.Zone}, Level {rack.Level}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-red-600 mt-4">Sorry! No racks available! Please consider changing the Fragility/Importance Slider!</p>
                  )}
                  <Box sx={{ width: '100%', mt: 4, maxWidth: '300px' }}>
                    <Typography id="fragility-slider" gutterBottom className="text-gray-700 text-center">
                      Fragility/Importance: {fragility}
                    </Typography>
                    <Slider
                      value={fragility}
                      onChange={(_, newValue) => handleFragilityChange(newValue)}
                      aria-labelledby="fragility-slider"
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={0}
                      max={100}
                      sx={{
                        color: '#D32F2F',
                        '& .MuiSlider-thumb': { backgroundColor: '#D32F2F' },
                        '& .MuiSlider-track': { backgroundColor: '#D32F2F' },
                        '& .MuiSlider-rail': { backgroundColor: '#FFCDD2' },
                      }}
                    />
                  </Box>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline" className="border-red-700 text-red-700 hover:bg-red-50">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default SuggestPalletZone;



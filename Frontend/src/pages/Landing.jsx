import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Box 
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const AnimatedIcon = styled(Box)(({ theme }) => ({
  animation: `${pulse} 2s infinite ease-in-out`,
}));

const LandingPage = () => {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#FFF5EE' }}>
      <AppBar position="static" sx={{ backgroundColor: '#FF4500' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dynamic Warehouse Management
          </Typography>
          
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ color: '#FF4500' }}>
              Revolutionize Your Warehouse Operations
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, color: '#FF8C00' }}>
              Efficient. Intelligent. Dynamic.
            </Typography>
            <Button variant="contained" size="large" sx={{ backgroundColor: '#FF4500', '&:hover': { backgroundColor: '#FF8C00' } }} >
              <a href="/">  Get Started With VI-Demo !</a>
            
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <AnimatedIcon>
              <InventoryIcon sx={{ fontSize: 300, color: '#FF8C00' }} />
            </AnimatedIcon>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 8 }}>
          {[
            { icon: <LocalShippingIcon sx={{ fontSize: 60, color: '#FF4500' }} />, title: 'Optimized Logistics' },
            { icon: <AssessmentIcon sx={{ fontSize: 60, color: '#FF4500' }} />, title: 'Real-time Analytics' },
            { icon: <SecurityIcon sx={{ fontSize: 60, color: '#FF4500' }} />, title: 'Enhanced Security' },
            { icon: <InventoryIcon sx={{ fontSize: 60, color: '#FF4500' }} />, title: 'Inventory Tracking' },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFDAB9' }}>
                <CardContent>
                  <AnimatedIcon>
                    {feature.icon}
                  </AnimatedIcon>
                  <Typography variant="h6" component="div" sx={{ mt: 2, textAlign: 'center', color: '#FF4500' }}>
                    {feature.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#FF4500' }}>
            Ready to Transform Your Warehouse?
          </Typography>
          <Button variant="contained" size="large" sx={{ mt: 2, backgroundColor: '#FF4500', '&:hover': { backgroundColor: '#FF8C00' } }}>
            Request a Demo
          </Button>
        </Box>
      </Container>

      <Box component="footer" sx={{ bgcolor: '#FF4500', p: 6 }} >
        <Typography variant="body2" align="center" sx={{ color: 'white' }}>
          © 2024 Dynamic Warehouse Management. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
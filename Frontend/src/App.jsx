import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Edit from './pages/Edit'
import Visual from './pages/3d'
import Delete from './pages/Delete'
import Add from './pages/Add'
import Home1 from './pages/Viewer'
import Clear from './pages/Clear'
import Warehouse from './pages/Landing'
import SuggestPalletZone from './pages/Suggest1'
import SensorPage from './pages/Sensor'
import './index.css'
import AddBig from './pages/addbig'
import Dashboard from './pages/dash'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home1 />} />
      <Route path="/edit-racks/:number" element={<Edit />} />
      <Route path="/edit-racks/" element={<Edit />} />
      <Route path="/dashboard" element={<Visual />} />
      <Route path="/dash" element={<Dashboard/>} />
      <Route path="/add-rack" element={<Add />} />
      <Route path="/delete-racks/:number" element={< Delete/>} />
      <Route path="/delete-rack" element={< SensorPage/>} />
      <Route path="/clear-rack/:number" element={<Clear />} />
      <Route path="/landing" element={<SuggestPalletZone />} />
      <Route path="/addbig" element={<AddBig />} />
    </Routes>
  )
}

export default App
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Edit from './pages/Edit'
import Visual from './pages/3d'
import Delete from './pages/Delete'
import Add from './pages/Add'
import Home1 from './pages/Viewer'
import Clear from './pages/Clear'
import Landing from './pages/Landing'
import './index.css'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home1 />} />
      <Route path="/edit-racks/:number" element={<Edit />} />
      <Route path="/edit-racks/" element={<Edit />} />
      <Route path="/dashboard" element={<Visual />} />
      <Route path="/dash/:number" element={<Edit />} />
      <Route path="/add-rack" element={<Add />} />
      <Route path="/delete-racks/:number" element={< Delete/>} />
      <Route path="/delete-racks" element={< Delete/>} />
      <Route path="/clear-rack/:number" element={<Clear />} />
      <Route path="/landing" element={<Landing />} />
    </Routes>
  )
}

export default App
import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Edit from './pages/Edit'
import Visual from './pages/3d'
import Delete from './pages/Delete'
import Add from './pages/Add'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit-racks/:number" element={<Edit />} />
      <Route path="/edit-racks/" element={<Edit />} />
      <Route path="/dashboard" element={<Visual />} />
      <Route path="/dash/:number" element={<Edit />} />
      <Route path="/add-rack" element={<Add />} />
      <Route path="/delete-racks/:number" element={< Delete/>} />
      <Route path="/delete-racks" element={< Delete/>} />
    </Routes>
  )
}

export default App
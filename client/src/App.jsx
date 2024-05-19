import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Student from './Student';
import Home from './Home';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/student' element={<Student />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
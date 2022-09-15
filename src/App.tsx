
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Header } from './components/Header';
import { AllPosts } from './pages/AllPosts';
import { EachPosts } from './pages/EachPost';


function App() {


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<AllPosts />} />
        <Route path='/posts/:id' element={< EachPosts />} />
      </Routes>
    </div >
  )
}

export default App

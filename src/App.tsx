
import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header';
import { AllPosts } from './pages/AllPosts';


function App() {


  return (
    <div className="App">
      <Header />
      <AllPosts />
    </div>
  )
}

export default App

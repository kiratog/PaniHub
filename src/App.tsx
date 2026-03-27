
import { useState } from 'react'
import './App.css'
import Feed from './components/feed/Feed'
import Navbar from './components/navbar/navbar'

function App() {
  const [category, setCategory] = useState("Phisics explained")
  return (
    <>
    <Navbar category = {category} setCategory = {setCategory} />
    <Feed category = {category}/>
    </>
  )
}

export default App

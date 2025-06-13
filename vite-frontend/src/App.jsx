import { useState } from 'react'
import './App.css'
import Appbar from '../layouts/navBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Appbar/>
    </>
  )
}

export default App

import { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Maxport from './components/Maxport/Maxport'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar/>
      <Maxport/>
    </>
  )
}

export default App

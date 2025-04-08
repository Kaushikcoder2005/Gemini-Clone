import { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Maxport from './components/Maxport/Maxport'


function App() {
  const [count, setCount] = useState(0)

  return (
  
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <Maxport />
      </div>
  
  )
}

export default App

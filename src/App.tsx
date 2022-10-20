import { useState } from 'react'
import { AutoComplete } from './components/Autocomplete'
import './index.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AutoComplete />
    </div>
  )
}

export default App

import { useState } from 'react'
import reactLogo from '@assets/react.svg';
import viteLogo from '@assets/vite.svg'; 
import '@styles/global.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">
        Tailwind 已成功配置！
      </h1>
    </>
  )
}

export default App

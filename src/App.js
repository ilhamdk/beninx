import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header , MainContainer , CreateContainer} from './components'

const App = () => {
  return (
    <div className="flex flex-col w-screen h-auto bg-primary">
      <Header />
      <main className='w-full p-8 mt-24'>
        <Routes>
          <Route path="/*" element={<MainContainer />} />
          <Route path="/createItem" element={<CreateContainer />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
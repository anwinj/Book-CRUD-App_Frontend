import './App.css'
import Content from './Components/Content'
import Sidebar from './Components/Sidebar'

function App() {
 
  return (
    <div className='w-full h-fit lg:min-h-screen bg-offWhite flex flex-col lg:flex-row'>
      <Sidebar/>
      <Content/>
    </div>
  )
}

export default App

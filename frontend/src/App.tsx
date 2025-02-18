import './App.css'
import AllTasks from './components/AllTasks'
import { TaskProvider } from './components/TaskProvide'

function App() {

  return (
    <>
      <div className='grid gap-10 justify-center'>
        <TaskProvider>
          <AllTasks />
        </TaskProvider>
      </div>
    </>
  )
}

export default App

import React, {useEffect} from 'react'
import TaskForm from './components/TaskForm.jsx'
import Home from '../src/pages/Home'
import TaskDetail from './pages/TaskDetail.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const App = () => {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/:id",
      element:<TaskDetail/>
    }
  ])

  return (
  <RouterProvider router={router}/>
  )
}

export default App
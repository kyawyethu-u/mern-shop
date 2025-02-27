
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import Index from './pages/Index.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'

const App = () => {
  const router = createBrowserRouter([
      {
        path: "/",
        element: <Index/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/login",
        element: <Login/>
      }
  ])
  return <RouterProvider router={router}/>
}

export default App
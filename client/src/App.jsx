
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import Index from './pages/Index.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Main from './layouts/Main.jsx'
import Profile from './pages/profile/Index.jsx'
import AuthProvider from './providers/AuthProvider.jsx'



const App = () => {
  const router = createBrowserRouter([
      {
        path: "/",
        element: <Main/>,
        children: [
          {
            index: true,
            element: <Index/>
          },
          {
            path: "/register",
            element: <Register/>
          },
          {
            path: "/login",
            element: <Login/>
          },
          {
            path: "/profile",
            element: (
            <AuthProvider>
            <Profile/>
            </AuthProvider>)
          }
        ]
      },
  ])
  return <RouterProvider router={router}/>
}

export default App
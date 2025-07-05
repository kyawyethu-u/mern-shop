
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import Index from './pages/Homepage/Index.jsx'
import Register from './pages/Auth/Register.jsx'
import Login from './pages/Auth/Login.jsx'
import Main from './layouts/Main.jsx'
import Profile from './pages/profile/Index.jsx'
import Admin from './pages/admin/Index.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import Details from './pages/Homepage/Details.jsx'
import SavedProducts from './pages/SavedProducts/Index.jsx'


const App = () => {
  
  const router = createBrowserRouter([
      {
        path: "/",
        element: <Main/>,
        children: [
          {
            index: true,
            element: (<AuthProvider>
               <Index/>
            </AuthProvider>) 
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
          },
          {
            path: "/admin",
            element: (
              <AuthProvider>
               <Admin/>
              </AuthProvider>
            )
          },
          {
            path: "/products/:id",
            element: <Details/>
          },
          {
            path: "/saved-products",
            element: (<AuthProvider>
                 <SavedProducts/>
                 </AuthProvider>)
          }
        ]
      },
  ])
  return <RouterProvider router={router}/>
}

export default App
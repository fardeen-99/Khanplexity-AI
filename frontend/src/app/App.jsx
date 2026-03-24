// import { useState } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Applayout from '../features/home/pages/Applayout'
import Home from '../features/home/pages/Home'
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
import Protected from '../features/auth/pages/protected'
import Chat from '@/features/chats/pages/Chat'
import AuthInit from '../features/auth/components/AuthInit'



function App() {

const router=createBrowserRouter([
  {
    path:"/",
    element:<Applayout/>
    ,children:[
      {
        path:"/",
        element:<Home/>
      }
    ]
    
  }
  ,{
    path:"/login",
    element:<Login/>
  }
  ,{
    path:"/signup",
    element:<Register/>
  },
  {
    path:"/chat",
    element:<Protected>
      <Chat/>
    </Protected>
  }
])


  return (
    <AuthInit>
      <RouterProvider router={router}/>
    </AuthInit>
  )
}

export default App

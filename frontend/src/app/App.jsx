// import { useState } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Applayout from '../features/home/pages/Applayout'
import Home from '../features/home/pages/Home'
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
import Resend from '../features/auth/pages/Resend'
import Protected from '../features/auth/pages/protected'
import Chat from '@/features/chats/pages/Chat'
import AuthInit from '../features/auth/components/AuthInit'
import Search from '@/features/chats/pages/Search'
import Chatlayout from '@/features/chats/pages/Chatlayout'



import { ToastProvider } from '../contexts/ToastContext'
import Cafe from './Cafe'
import AiPage from './Ai'

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
    path:"/resend",
    element:<Resend/>
  },

  {
    element: <Chatlayout />,
    children: [
      {
        path: "/chat",
        element: <Protected>
          <Chat />
        </Protected>
      },
      {
        path: "/search",
        element: <Protected>
          <Search />
        </Protected>
      }
    ]
  },
  {
    path:"/cafe",
    element:<Cafe/>
  },
  {
    path:"/ai",
    element:<AiPage/>
  }

  // {
  //   path:"/chat",
  //   element:<Protected>
  //     <Chat/>
  //   </Protected>
  //  , children:[
     
  //   ]
  // }
])


  return (
    <ToastProvider>
      <AuthInit>
        <RouterProvider router={router}/>
      </AuthInit>
    </ToastProvider>
  )
}

export default App

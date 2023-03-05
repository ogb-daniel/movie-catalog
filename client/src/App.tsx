import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AddMovie } from './pages/AddMovie'
import { Movie } from './pages/Movie'
import { Movies } from './pages/Movies'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Movies />,
    },
    {
      path: '/addMovie',
      element: <AddMovie />
    },
    {
      path: '/:id',
      element: <Movie />
    }

  ])
  return (
    <>
      <div className="p-8 app h-full min-h-screen text-white">
        <RouterProvider router={router} />
      </div>
    </>

  )
}

export default App

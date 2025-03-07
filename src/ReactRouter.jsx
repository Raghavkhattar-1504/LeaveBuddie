import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import EmployeePage from './components/Employee/EmployeePage'
import EmployerPage from './components/Employer/EmployerPage'

function ReactRouter() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <EmployeePage />
            },
            {
                path: '/employer',
                element: <EmployerPage />
            }
    ]

    )

  return (
      <RouterProvider router = {router} />
  )
}

export default ReactRouter

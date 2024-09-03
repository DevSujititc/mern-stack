import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import AddItem from './pages/addItem/AddItem.jsx'
import ListItems from './pages/listItems/ListItems.jsx'
import Orders from './pages/orders/Orders.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children : [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/add',
        element: <AddItem />
      },
      {
        path: '/list',
        element: <ListItems />
      },
      {
        path: '/orders',
        element: <Orders />
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

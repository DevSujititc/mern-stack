import {createBrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/home/Home.jsx'
import Order from './pages/order/Order.jsx'
import Cart from './pages/cart/Cart.jsx'
import Error from './pages/error/Error.jsx'
import Verify from './pages/verify/Verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/order',
        element: <Order />
      },
      {
        path: '/verify',
        element: <Verify />
      },
      {
        path: '/myorders',
        element: <MyOrders />
      }

    ]
  }
])

export default router;